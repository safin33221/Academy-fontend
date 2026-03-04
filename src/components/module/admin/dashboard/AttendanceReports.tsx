import type { ReactNode } from "react";
import {
    Activity,
    CalendarCheck2,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Presentation,
    UserCheck,
    UserX,
    UsersRound,
    Video,
    type LucideIcon,
} from "lucide-react";
import {
    EMPTY_ATTENDANCE_REPORTS_DATA,
    IAttendanceReportsClassAttendanceItem,
    IAttendanceReportsData,
    IAttendanceReportsDailyTrendItem,
    IAttendanceReportsRecentClassAttendanceItem,
} from "@/types/dashboard/attendanceReports.interface";

interface AttendanceReportsProps {
    attendanceReports?: IAttendanceReportsData | null;
}

const numberFormatter = new Intl.NumberFormat("en-US");
const percentageFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

const formatNumber = (value: number) => numberFormatter.format(value ?? 0);

const formatPercentage = (value: number) => {
    const normalized = Number.isFinite(value) ? value : 0;
    return `${percentageFormatter.format(normalized)}%`;
};

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value || 0));

const formatShortDate = (dateValue: string) => {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(date);
};

const formatDateTime = (dateValue: string) => {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

const getStatusClass = (status: string) => {
    const normalized = status.toUpperCase();

    if (normalized === "ONGOING") {
        return "bg-emerald-100 text-emerald-700";
    }

    if (normalized === "ENDED") {
        return "bg-slate-100 text-slate-700";
    }

    if (normalized === "UPCOMING") {
        return "bg-amber-100 text-amber-700";
    }

    if (normalized === "STARTED") {
        return "bg-blue-100 text-blue-700";
    }

    return "bg-indigo-100 text-indigo-700";
};

const getTrendColorClass = (attendanceRate: number) => {
    if (attendanceRate >= 80) {
        return "bg-emerald-500";
    }

    if (attendanceRate >= 60) {
        return "bg-blue-500";
    }

    if (attendanceRate >= 40) {
        return "bg-amber-500";
    }

    return "bg-rose-500";
};

export default function AttendanceReports({ attendanceReports }: AttendanceReportsProps) {
    const data = attendanceReports ?? EMPTY_ATTENDANCE_REPORTS_DATA;
    const {
        pageHeader,
        classSummary,
        attendanceSummary,
        dailyTrendLast7Days,
        recentClassAttendance,
        todayAttendance,
    } = data;

    const presentProgress = attendanceSummary.expectedStudents > 0
        ? (attendanceSummary.presentStudents / Math.max(attendanceSummary.expectedStudents, 1)) * 100
        : 0;
    const absentProgress = attendanceSummary.expectedStudents > 0
        ? (attendanceSummary.absentStudents / Math.max(attendanceSummary.expectedStudents, 1)) * 100
        : 0;

    return (
        <div className="space-y-8 p-6 md:p-8 min-h-screen">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold">{pageHeader.title}</h1>
                <p className="text-slate-500">{pageHeader.subtitle}</p>
                <p className="text-xs text-slate-400">
                    Generated at: {formatDateTime(pageHeader.generatedAt)}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    icon={Presentation}
                    title="Total Classes"
                    value={formatNumber(classSummary.totalClasses)}
                    hint={`${formatNumber(classSummary.conductedClasses)} conducted`}
                />
                <StatCard
                    icon={CalendarDays}
                    title="Today Classes"
                    value={formatNumber(classSummary.todayClasses)}
                    hint={`${formatNumber(classSummary.startedTodayClasses)} started today`}
                />
                <StatCard
                    icon={UserCheck}
                    title="Present Students"
                    value={formatNumber(attendanceSummary.presentStudents)}
                    hint={`Out of ${formatNumber(attendanceSummary.expectedStudents)} expected`}
                    valueClassName="text-emerald-600"
                />
                <StatCard
                    icon={Activity}
                    title="Attendance Rate"
                    value={formatPercentage(attendanceSummary.attendanceRate)}
                    hint={`${formatPercentage(attendanceSummary.averageClassAttendanceRate)} average`}
                    valueClassName="text-indigo-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Class Execution Summary">
                    <MetricRow label="Ongoing Classes" value={formatNumber(classSummary.ongoingClasses)} />
                    <MetricRow label="Ended Classes" value={formatNumber(classSummary.endedClasses)} />
                    <MetricRow label="Upcoming Classes" value={formatNumber(classSummary.upcomingClasses)} />
                    <MetricRow
                        label="Upcoming Today"
                        value={formatNumber(classSummary.upcomingTodayClasses)}
                        isLast
                    />
                </Card>

                <Card title="Attendance Snapshot">
                    <MetricRow
                        label="Classes With Records"
                        value={formatNumber(attendanceSummary.classesWithAttendanceRecords)}
                    />
                    <MetricRow
                        label="Classes Without Records"
                        value={formatNumber(attendanceSummary.classesWithoutAttendanceRecords)}
                    />
                    <div className="space-y-3 mt-4">
                        <ProgressRow
                            title="Present"
                            value={attendanceSummary.presentStudents}
                            width={clampPercentage(presentProgress)}
                            trackClassName="bg-emerald-500"
                        />
                        <ProgressRow
                            title="Absent"
                            value={attendanceSummary.absentStudents}
                            width={clampPercentage(absentProgress)}
                            trackClassName="bg-rose-500"
                        />
                    </div>
                </Card>
            </div>

            <Section title="Last 7 Days Attendance Trend">
                {dailyTrendLast7Days.length > 0 ? (
                    <div className="space-y-3">
                        {dailyTrendLast7Days.map((item) => (
                            <DailyTrendRow key={item.date} item={item} />
                        ))}
                    </div>
                ) : (
                    <EmptyMessage text="No daily trend data found." />
                )}
            </Section>

            <Section title="Today Attendance Details">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <MiniMetric
                        icon={CalendarCheck2}
                        label="Total Today Classes"
                        value={formatNumber(todayAttendance.totalTodayClasses)}
                    />
                    <MiniMetric
                        icon={CheckCircle2}
                        label="Started Today"
                        value={formatNumber(todayAttendance.startedTodayClasses)}
                    />
                    <MiniMetric
                        icon={UsersRound}
                        label="Expected Students"
                        value={formatNumber(todayAttendance.expectedStudents)}
                    />
                    <MiniMetric
                        icon={UserX}
                        label="Absent Students"
                        value={formatNumber(todayAttendance.absentStudents)}
                    />
                </div>

                <div className="mb-4 rounded-xl border bg-slate-50 px-4 py-3">
                    <p className="text-sm text-slate-600">
                        Overall today attendance:{" "}
                        <span className="font-semibold text-slate-900">
                            {formatPercentage(todayAttendance.attendanceRate)}
                        </span>{" "}
                        ({formatNumber(todayAttendance.presentStudents)} present /{" "}
                        {formatNumber(todayAttendance.expectedStudents)} expected)
                    </p>
                </div>

                {todayAttendance.classes.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b">
                                <tr>
                                    <th className="py-3 pr-4">Class</th>
                                    <th className="py-3 pr-4">Instructor</th>
                                    <th className="py-3 pr-4">Status</th>
                                    <th className="py-3 pr-4">Start Time</th>
                                    <th className="py-3 pr-4">Attendance</th>
                                    <th className="py-3 pr-4">Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {todayAttendance.classes.map((item) => (
                                    <TodayClassRow
                                        key={`${item.classId}-${item.startTime}`}
                                        item={item}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyMessage text="No class attendance data available for today." />
                )}
            </Section>

            <Section title="Recent Class Attendance Records">
                {recentClassAttendance.length > 0 ? (
                    <div className="space-y-4">
                        {recentClassAttendance.map((item) => (
                            <RecentClassAttendanceCard
                                key={`${item.classId}-${item.startTime}`}
                                item={item}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyMessage text="No recent class attendance records found." />
                )}
            </Section>
        </div>
    );
}

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
    hint: string;
    valueClassName?: string;
}

function StatCard({
    icon: Icon,
    title,
    value,
    hint,
    valueClassName = "",
}: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                    <p className="text-sm text-slate-500">{title}</p>
                    <h3 className={`text-2xl font-bold ${valueClassName}`}>{value}</h3>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={22} />
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">{hint}</p>
        </div>
    );
}

interface CardProps {
    title: string;
    children: ReactNode;
}

function Card({ title, children }: CardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-4">{title}</h3>
            <div>{children}</div>
        </div>
    );
}

interface SectionProps {
    title: string;
    children: ReactNode;
}

function Section({ title, children }: SectionProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}

function MetricRow({
    label,
    value,
    isLast = false,
}: {
    label: string;
    value: string;
    isLast?: boolean;
}) {
    return (
        <div className={`flex items-center justify-between py-2 ${isLast ? "" : "border-b"}`}>
            <p className="text-sm text-slate-600">{label}</p>
            <p className="font-semibold text-slate-900">{value}</p>
        </div>
    );
}

function ProgressRow({
    title,
    value,
    width,
    trackClassName,
}: {
    title: string;
    value: number;
    width: number;
    trackClassName: string;
}) {
    return (
        <div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>{title}</span>
                <span>{formatNumber(value)}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                    className={`h-2 rounded-full ${trackClassName}`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}

function DailyTrendRow({ item }: { item: IAttendanceReportsDailyTrendItem }) {
    const rate = clampPercentage(item.attendanceRate);

    return (
        <div className="border rounded-xl px-4 py-3 grid items-center gap-3 md:grid-cols-[100px_1fr_auto]">
            <p className="text-sm font-medium text-slate-700">{formatShortDate(item.date)}</p>
            <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                    className={`h-2 rounded-full ${getTrendColorClass(rate)}`}
                    style={{ width: `${rate}%` }}
                />
            </div>
            <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">
                    {formatPercentage(item.attendanceRate)}
                </p>
                <p className="text-xs text-slate-500">
                    {formatNumber(item.presentStudents)}/{formatNumber(item.expectedStudents)} present
                </p>
                <p className="text-xs text-slate-400">
                    {formatNumber(item.totalClasses)} class(es)
                </p>
            </div>
        </div>
    );
}

function MiniMetric({
    icon: Icon,
    label,
    value,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border p-3 bg-slate-50">
            <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{label}</p>
                <Icon size={16} className="text-slate-500" />
            </div>
            <p className="text-xl font-semibold mt-2">{value}</p>
        </div>
    );
}

function TodayClassRow({ item }: { item: IAttendanceReportsClassAttendanceItem }) {
    return (
        <tr>
            <td className="py-3 pr-4">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-slate-500">
                    {item.course} | {item.batchName}
                </p>
            </td>
            <td className="py-3 pr-4 text-sm text-slate-600">{item.instructor}</td>
            <td className="py-3 pr-4">
                <span className={`px-2.5 py-1 rounded-full text-xs ${getStatusClass(item.status)}`}>
                    {item.status}
                </span>
            </td>
            <td className="py-3 pr-4 text-sm text-slate-600">{formatDateTime(item.startTime)}</td>
            <td className="py-3 pr-4 text-sm">
                {formatNumber(item.presentStudents)} / {formatNumber(item.expectedStudents)}
                <p className="text-xs text-slate-500">
                    {formatNumber(item.absentStudents)} absent
                </p>
            </td>
            <td className="py-3 pr-4 font-medium">{formatPercentage(item.attendanceRate)}</td>
        </tr>
    );
}

function RecentClassAttendanceCard({
    item,
}: {
    item: IAttendanceReportsRecentClassAttendanceItem;
}) {
    const rate = clampPercentage(item.attendanceRate);

    return (
        <div className="border rounded-2xl p-4 space-y-3">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-slate-500">
                        {item.course} | {item.batchName}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs ${getStatusClass(item.status)}`}>
                        {item.status}
                    </span>
                    <span className="text-sm font-semibold text-indigo-600">
                        {formatPercentage(item.attendanceRate)}
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                    <Clock3 size={14} />
                    {formatDateTime(item.startTime)}
                </span>
                <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} />
                    Session {formatNumber(item.sessionCount)}
                </span>
                <span className="inline-flex items-center gap-1">
                    <Video size={14} />
                    Meeting ID: {item.zoomMeetingId || "-"}
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <MiniStat title="Expected" value={formatNumber(item.expectedStudents)} />
                <MiniStat title="Present" value={formatNumber(item.presentStudents)} />
                <MiniStat title="Absent" value={formatNumber(item.absentStudents)} />
                <MiniStat title="Unknown" value={formatNumber(item.unknownParticipants)} />
                <MiniStat
                    title="Duration"
                    value={`${formatNumber(item.totalDurationMinutes)}m`}
                />
            </div>

            <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                    className={`h-2 rounded-full ${getTrendColorClass(rate)}`}
                    style={{ width: `${rate}%` }}
                />
            </div>

            <p className="text-xs text-slate-500">
                Planned duration: {formatNumber(item.durationMinutes)} min | Joined duration:{" "}
                {formatNumber(item.totalDurationMinutes)} min
            </p>
        </div>
    );
}

function MiniStat({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-lg border bg-slate-50 px-3 py-2">
            <p className="text-[11px] text-slate-500">{title}</p>
            <p className="text-sm font-semibold text-slate-800">{value}</p>
        </div>
    );
}

function EmptyMessage({ text }: { text: string }) {
    return <p className="text-sm text-slate-500">{text}</p>;
}
