import Link from "next/link";
import { getInstructorBatch } from "@/services/instructor/instructorBatch";
import { IBatch } from "@/types/batch/batch.interface";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap, Users } from "lucide-react";

const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

export default async function Page() {
    const res = await getInstructorBatch();
    const batches: IBatch[] = res?.data ?? [];

    const ongoingBatches = batches.filter((batch) => batch.status === "ONGOING");
    const upcomingBatches = batches.filter((batch) => batch.status === "UPCOMING");
    const completedBatches = batches.filter((batch) => batch.status === "COMPLETED");
    const totalStudents = batches.reduce(
        (sum, batch) => sum + (batch.enrolledCount || 0),
        0
    );
    const recentBatches = [...batches]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border bg-card px-6 py-5">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Instructor Dashboard</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Track your running batches and student engagement.
                    </p>
                </div>
                <Link
                    href="/instructor/dashboard/my-batches"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                    Manage Batches
                    <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border bg-card px-5 py-4">
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen size={16} />
                        Total Batches
                    </p>
                    <p className="mt-2 text-3xl font-bold">{batches.length}</p>
                </div>

                <div className="rounded-xl border bg-card px-5 py-4">
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays size={16} />
                        Ongoing
                    </p>
                    <p className="mt-2 text-3xl font-bold">{ongoingBatches.length}</p>
                </div>

                <div className="rounded-xl border bg-card px-5 py-4">
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap size={16} />
                        Upcoming
                    </p>
                    <p className="mt-2 text-3xl font-bold">{upcomingBatches.length}</p>
                </div>

                <div className="rounded-xl border bg-card px-5 py-4">
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Users size={16} />
                        Total Students
                    </p>
                    <p className="mt-2 text-3xl font-bold">{totalStudents}</p>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-xl border bg-card px-5 py-4">
                    <h2 className="text-lg font-semibold">Upcoming Batches</h2>
                    <p className="text-sm text-muted-foreground">Your next scheduled batches.</p>

                    <div className="mt-4 space-y-3">
                        {upcomingBatches.slice(0, 3).map((batch) => (
                            <div
                                key={batch.id}
                                className="rounded-lg border bg-background px-3 py-2 text-sm"
                            >
                                <p className="font-medium">{batch.name}</p>
                                <p className="text-muted-foreground">{batch.course?.title || "N/A"}</p>
                                <p className="text-xs text-muted-foreground">
                                    Starts: {formatDate(batch.startDate)}
                                </p>
                            </div>
                        ))}
                        {upcomingBatches.length === 0 && (
                            <p className="text-sm text-muted-foreground">No upcoming batch found.</p>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border bg-card px-5 py-4">
                    <h2 className="text-lg font-semibold">Recently Assigned</h2>
                    <p className="text-sm text-muted-foreground">Latest batches in your list.</p>

                    <div className="mt-4 space-y-3">
                        {recentBatches.map((batch) => (
                            <div
                                key={batch.id}
                                className="rounded-lg border bg-background px-3 py-2 text-sm"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="font-medium line-clamp-1">{batch.name}</p>
                                    <span className="text-xs text-muted-foreground">{batch.status}</span>
                                </div>
                                <p className="text-muted-foreground line-clamp-1">
                                    {batch.course?.title || "N/A"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Created: {formatDate(String(batch.createdAt))}
                                </p>
                            </div>
                        ))}
                        {recentBatches.length === 0 && (
                            <p className="text-sm text-muted-foreground">No batches assigned yet.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card px-6 py-5">
                <h2 className="text-lg font-semibold">Completion Snapshot</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Completed batches: {completedBatches.length}
                </p>
            </div>
        </div>
    );
}
