"use server";

import { getInstructorBatch } from "@/services/instructor/instructorBatch";
import { IBatch } from "@/types/batch/batch.interface";

const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

const statusClassMap: Record<IBatch["status"], string> = {
    UPCOMING: "bg-blue-100 text-blue-700",
    ONGOING: "bg-green-100 text-green-700",
    COMPLETED: "bg-gray-200 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
};

export default async function Page() {
    const res = await getInstructorBatch();
    const instructorBatches: IBatch[] = res?.data ?? [];

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Batches</h1>
                <span className="text-sm text-gray-500">{instructorBatches.length} total</span>
            </div>

            {instructorBatches.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                    No batches assigned yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {instructorBatches.map((batch) => (
                        <div
                            key={batch.id}
                            className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                    {batch.name}
                                </h2>
                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClassMap[batch.status]}`}
                                >
                                    {batch.status}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-gray-600 line-clamp-1">
                                Course: {batch?.course?.title || "N/A"}
                            </p>

                            <div className="mt-4 space-y-1.5 text-sm text-gray-500">
                                <p>Start: {formatDate(batch.startDate)}</p>
                                <p>End: {formatDate(batch.endDate)}</p>
                                <p>
                                    Students: {batch.enrolledCount}/{batch.maxStudents}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
