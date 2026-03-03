import type { ReactNode } from "react";
import {
    Users,
    BookOpen,
    DollarSign,
    GraduationCap,
    Activity,
    CalendarCheck,
    Clock,
    UserCheck,
    type LucideIcon,
} from "lucide-react";
import type {
    IAdminDashboardData,
    IOngoingCourse,
    ITodaysClass,
    ITopPerformingCourse,
    IRecentEnrollment,
} from "@/types/dashboard/adminDashboard.interface";

interface AdminDashboardProps {
    data: IAdminDashboardData;
}

const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US").format(value);

const formatAttendancePercentage = (value: number) => {
    if (Number.isInteger(value)) {
        return `${value}%`;
    }

    return `${value.toFixed(1)}%`;
};

const getEnrollmentStatusClass = (status: string) => {
    const normalized = status.toLowerCase();

    if (normalized === "active") {
        return "bg-green-100 text-green-700";
    }

    if (normalized === "completed") {
        return "bg-blue-100 text-blue-700";
    }

    if (normalized === "upcoming") {
        return "bg-yellow-100 text-yellow-700";
    }

    if (normalized === "cancelled") {
        return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-700";
};

export default function AdminDashboard({ data }: AdminDashboardProps) {
    const {
        pageHeader,
        coreStats,
        attendanceAndEnrollment,
        ongoingCourses,
        todaysClasses,
        topPerformingCourses,
        recentEnrollments,
    } = data;

    const attendance = attendanceAndEnrollment.todayAttendance;

    return (
        <div className="space-y-8 bg-slate-100 p-6 md:p-8 min-h-screen">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">{pageHeader.title}</h1>
                <p className="text-slate-500 mt-1">{pageHeader.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    icon={Users}
                    title="Total Students"
                    value={formatNumber(coreStats.totalStudents)}
                />
                <StatCard
                    icon={GraduationCap}
                    title="Total Instructors"
                    value={formatNumber(coreStats.totalInstructors)}
                />
                <StatCard
                    icon={BookOpen}
                    title="Total Courses"
                    value={formatNumber(coreStats.totalCourses)}
                />
                <StatCard
                    icon={DollarSign}
                    title="Total Revenue"
                    value={coreStats.totalRevenueDisplay}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Today Attendance">
                    <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-indigo-500">
                            {formatAttendancePercentage(attendance.percentage)}
                        </div>
                        <CalendarCheck size={28} />
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        {formatNumber(attendance.presentStudents)} students present today
                    </p>
                    {attendance.isEstimated && (
                        <p className="text-xs text-slate-400 mt-1">{attendance.note}</p>
                    )}
                </Card>

                <Card title="Active Enrollments">
                    <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-blue-500">
                            {formatNumber(attendanceAndEnrollment.activeEnrollments)}
                        </div>
                        <UserCheck size={28} />
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        Currently running enrollments
                    </p>
                </Card>

                <Card title="System Health">
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <Activity size={20} />
                        {attendanceAndEnrollment.systemHealth.status}
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        {attendanceAndEnrollment.systemHealth.note}
                    </p>
                </Card>
            </div>

            <Section title="Ongoing Courses">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {ongoingCourses.length > 0 ? (
                        ongoingCourses.map((course) => (
                            <OngoingCourseCard key={course.batchId} course={course} />
                        ))
                    ) : (
                        <EmptyMessage text="No ongoing courses found." />
                    )}
                </div>
            </Section>

            <Section title="Today&apos;s Classes">
                <div className="space-y-4">
                    {todaysClasses.length > 0 ? (
                        todaysClasses.map((classItem) => (
                            <ClassRow key={classItem.id} classItem={classItem} />
                        ))
                    ) : (
                        <EmptyMessage text="No classes scheduled for today." />
                    )}
                </div>
            </Section>

            <Section title="Top Performing Courses">
                <div className="space-y-4">
                    {topPerformingCourses.length > 0 ? (
                        topPerformingCourses.map((course) => (
                            <CourseRow key={course.courseId} course={course} />
                        ))
                    ) : (
                        <EmptyMessage text="No course performance data found." />
                    )}
                </div>
            </Section>

            <Section title="Recent Enrollments">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="py-3">Student</th>
                                <th className="py-3">Course</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {recentEnrollments.length > 0 ? (
                                recentEnrollments.map((item) => (
                                    <EnrollmentRow
                                        key={`${item.student}-${item.enrolledAt}`}
                                        enrollment={item}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td className="py-6 text-sm text-slate-500" colSpan={4}>
                                        No recent enrollments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
}

function StatCard({ icon: Icon, title, value }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                </div>
                <div className="p-3 bg-slate-100 rounded-xl">
                    <Icon size={22} />
                </div>
            </div>
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
            <h3 className="font-semibold mb-3">{title}</h3>
            {children}
        </div>
    );
}

interface SectionProps {
    title: string;
    children: ReactNode;
}

function Section({ title, children }: SectionProps) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}

function OngoingCourseCard({ course }: { course: IOngoingCourse }) {
    const progressWidth = `${Math.min(100, Math.max(0, course.progressPercentage))}%`;

    return (
        <div className="border p-4 rounded-xl space-y-3">
            <h4 className="font-semibold">{course.title}</h4>
            <p className="text-sm text-slate-500">Instructor: {course.instructor}</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: progressWidth }} />
            </div>
            <p className="text-sm font-medium">{course.progress} Completed</p>
        </div>
    );
}

function ClassRow({ classItem }: { classItem: ITodaysClass }) {
    return (
        <div className="border p-4 rounded-xl">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h4 className="font-semibold">{classItem.course}</h4>
                    <p className="text-sm text-slate-500">{classItem.room}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Clock size={18} />
                    {classItem.time}
                </div>
            </div>
            <div className="mt-2 text-xs text-slate-500">
                Batch: {classItem.batchName} | Instructor: {classItem.instructor}
            </div>
        </div>
    );
}

function CourseRow({ course }: { course: ITopPerformingCourse }) {
    return (
        <div className="flex items-center justify-between border p-4 rounded-xl">
            <div>
                <h4 className="font-semibold">{course.name}</h4>
                <p className="text-sm text-slate-500">
                    {formatNumber(course.students)} Students
                </p>
            </div>
            <div className="font-bold text-emerald-500">{course.revenueDisplay}</div>
        </div>
    );
}

function EnrollmentRow({ enrollment }: { enrollment: IRecentEnrollment }) {
    return (
        <tr>
            <td className="py-3">{enrollment.student}</td>
            <td className="py-3">{enrollment.course}</td>
            <td className="py-3">
                <span
                    className={`px-3 py-1 rounded-full text-sm ${getEnrollmentStatusClass(
                        enrollment.status
                    )}`}
                >
                    {enrollment.status}
                </span>
            </td>
            <td className="py-3">{enrollment.date}</td>
        </tr>
    );
}

function EmptyMessage({ text }: { text: string }) {
    return <p className="text-sm text-slate-500">{text}</p>;
}
