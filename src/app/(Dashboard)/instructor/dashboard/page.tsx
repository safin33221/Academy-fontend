import Link from "next/link";
import { getInstructorBatch } from "@/services/instructor/instructorBatch";
import { IBatch } from "@/types/batch/batch.interface";
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    GraduationCap,
    Users,
} from "lucide-react";

const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

const StatusBadge = ({ status }: { status: string }) => {
    const base =
        "text-xs font-medium px-3 py-1 rounded-full";

    const map: Record<string, string> = {
        ONGOING: "bg-green-100 text-green-700",
        UPCOMING: "bg-yellow-100 text-yellow-700",
        COMPLETED: "bg-gray-200 text-gray-700",
    };

    return (
        <span className={`${base} ${map[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
};

export default async function Page() {
    const res = await getInstructorBatch();
    const batches: IBatch[] = res?.data ?? [];

    const ongoingBatches = batches.filter((b) => b.status === "ONGOING");
    const upcomingBatches = batches.filter((b) => b.status === "UPCOMING");
    const completedBatches = batches.filter((b) => b.status === "COMPLETED");

    const totalStudents = batches.reduce(
        (sum, batch) => sum + (batch.enrolledCount || 0),
        0
    );

    const recentBatches = [...batches]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(0, 4);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 p-8  shadow-lg">
                <h1 className="text-3xl font-bold">
                    Instructor Dashboard
                </h1>
                <p className="mt-2 text-sm opacity-90">
                    Monitor your batches, track student growth, and manage classes efficiently.
                </p>

                <Link
                    href="/instructor/dashboard/my-batches"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/20 backdrop-blur px-4 py-2 text-sm font-medium hover:bg-white/30 transition"
                >
                    Manage Batches
                    <ArrowRight size={16} />
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    {
                        label: "Total Batches",
                        value: batches.length,
                        icon: <BookOpen size={18} />,
                    },
                    {
                        label: "Ongoing",
                        value: ongoingBatches.length,
                        icon: <CalendarDays size={18} />,
                    },
                    {
                        label: "Upcoming",
                        value: upcomingBatches.length,
                        icon: <GraduationCap size={18} />,
                    },
                    {
                        label: "Total Students",
                        value: totalStudents,
                        icon: <Users size={18} />,
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="rounded-2xl bg-card p-6 shadow-sm hover:shadow-md transition border"
                    >
                        <div className="flex items-center justify-between text-muted-foreground text-sm">
                            <span className="flex items-center gap-2">
                                {item.icon}
                                {item.label}
                            </span>
                        </div>
                        <p className="mt-4 text-3xl font-bold">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Upcoming */}
                <div className="rounded-2xl bg-card p-6 shadow-sm border">
                    <h2 className="text-lg font-semibold">
                        Upcoming Batches
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Your next scheduled sessions.
                    </p>

                    <div className="mt-5 space-y-4">
                        {upcomingBatches.slice(0, 3).map((batch) => (
                            <div
                                key={batch.id}
                                className="rounded-xl border p-4 hover:bg-muted/40 transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">
                                            {batch.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {batch.course?.title || "N/A"}
                                        </p>
                                    </div>
                                    <StatusBadge status={batch.status} />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Starts: {formatDate(batch.startDate)}
                                </p>
                            </div>
                        ))}

                        {upcomingBatches.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No upcoming batch found.
                            </p>
                        )}
                    </div>
                </div>

                {/* Recent */}
                <div className="rounded-2xl bg-card p-6 shadow-sm border">
                    <h2 className="text-lg font-semibold">
                        Recently Assigned
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Latest batches added to your account.
                    </p>

                    <div className="mt-5 space-y-4">
                        {recentBatches.map((batch) => (
                            <div
                                key={batch.id}
                                className="rounded-xl border p-4 hover:bg-muted/40 transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium line-clamp-1">
                                            {batch.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {batch.course?.title || "N/A"}
                                        </p>
                                    </div>
                                    <StatusBadge status={batch.status} />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Created: {formatDate(String(batch.createdAt))}
                                </p>
                            </div>
                        ))}

                        {recentBatches.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No batches assigned yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Completion Snapshot */}
            <div className="rounded-2xl bg-card p-6 shadow-sm border">
                <h2 className="text-lg font-semibold">
                    Completion Snapshot
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Completed Batches:
                </p>
                <p className="mt-3 text-3xl font-bold">
                    {completedBatches.length}
                </p>
            </div>
        </div>
    );
}