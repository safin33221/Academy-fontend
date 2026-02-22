/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Users,
    BookOpen,
    DollarSign,
    GraduationCap,
    Activity,
    CalendarCheck,
    Clock,
    UserCheck,
} from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="p-6 md:p-8 space-y-8 bg-slate-100 dark:bg-slate-950 min-h-screen">

            {/* ================= Page Header ================= */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">LMS System Overview</h1>
                <p className="text-slate-500 mt-1">
                    Complete analytics, attendance & course tracking
                </p>
            </div>

            {/* ================= Core Statistics ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard icon={Users} title="Total Students" value="2,845" />
                <StatCard icon={GraduationCap} title="Total Instructors" value="48" />
                <StatCard icon={BookOpen} title="Total Courses" value="126" />
                <StatCard icon={DollarSign} title="Total Revenue" value="$54,320" />
            </div>

            {/* ================= Attendance & Enrollment Stats ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <Card title="Today Attendance">
                    <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-indigo-500">92%</div>
                        <CalendarCheck size={28} />
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        1,120 students present today
                    </p>
                </Card>

                <Card title="Active Enrollments">
                    <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-blue-500">1,240</div>
                        <UserCheck size={28} />
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        Currently running enrollments
                    </p>
                </Card>

                <Card title="System Health">
                    <div className="flex items-center gap-2 text-green-500 font-semibold">
                        <Activity size={20} />
                        Operational
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        No issues detected
                    </p>
                </Card>

            </div>

            {/* ================= Ongoing Courses ================= */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Ongoing Courses</h2>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <OngoingCourse
                        title="Full Stack Web Development"
                        instructor="John Doe"
                        progress="65%"
                    />
                    <OngoingCourse
                        title="UI/UX Masterclass"
                        instructor="Sara Khan"
                        progress="40%"
                    />
                    <OngoingCourse
                        title="Digital Marketing Pro"
                        instructor="Michael Lee"
                        progress="80%"
                    />
                </div>
            </div>

            {/* ================= Today’s Classes ================= */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Today&apos;s Classes</h2>

                <div className="space-y-4">
                    <ClassRow
                        course="Full Stack Web Development"
                        time="10:00 AM - 12:00 PM"
                        room="Room 201"
                    />
                    <ClassRow
                        course="UI/UX Masterclass"
                        time="2:00 PM - 4:00 PM"
                        room="Room 105"
                    />
                </div>
            </div>

            {/* ================= Top Performing Courses ================= */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Top Performing Courses</h2>

                <div className="space-y-4">
                    <CourseRow name="Full Stack Web Development" students="540" revenue="$12,400" />
                    <CourseRow name="UI/UX Masterclass" students="320" revenue="$7,800" />
                    <CourseRow name="Digital Marketing Pro" students="290" revenue="$6,150" />
                </div>
            </div>

            {/* ================= Recent Enrollments ================= */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Enrollments</h2>

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
                            <EnrollmentRow name="Rahim Ahmed" course="Full Stack Web Development" status="Active" date="23 Feb 2026" />
                            <EnrollmentRow name="Sara Khan" course="UI/UX Masterclass" status="Completed" date="22 Feb 2026" />
                            <EnrollmentRow name="Imran Hossain" course="Digital Marketing Pro" status="Active" date="21 Feb 2026" />
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

/* ================= Reusable Components ================= */

function StatCard({ icon: Icon, title, value }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <Icon size={22} />
                </div>
            </div>
        </div>
    );
}

function Card({ title, children }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-3">{title}</h3>
            {children}
        </div>
    );
}

function OngoingCourse({ title, instructor, progress }: any) {
    return (
        <div className="border p-4 rounded-xl space-y-3">
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-slate-500">Instructor: {instructor}</p>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: progress }}
                />
            </div>
            <p className="text-sm font-medium">{progress} Completed</p>
        </div>
    );
}

function ClassRow({ course, time, room }: any) {
    return (
        <div className="flex items-center justify-between border p-4 rounded-xl">
            <div>
                <h4 className="font-semibold">{course}</h4>
                <p className="text-sm text-slate-500">{room}</p>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
                <Clock size={18} />
                {time}
            </div>
        </div>
    );
}

function CourseRow({ name, students, revenue }: any) {
    return (
        <div className="flex items-center justify-between border p-4 rounded-xl">
            <div>
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-slate-500">{students} Students</p>
            </div>
            <div className="font-bold text-emerald-500">{revenue}</div>
        </div>
    );
}

function EnrollmentRow({ name, course, status, date }: any) {
    return (
        <tr>
            <td className="py-3">{name}</td>
            <td className="py-3">{course}</td>
            <td className="py-3">
                <span
                    className={`px-3 py-1 rounded-full text-sm ${status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                        }`}
                >
                    {status}
                </span>
            </td>
            <td className="py-3">{date}</td>
        </tr>
    );
}