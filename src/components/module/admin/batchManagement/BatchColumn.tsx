import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { CalendarDays, Users, Layers } from "lucide-react";
import { IBatch } from "@/types/batch/batch.interface";

export const BatchColumn: columns<IBatch>[] = [
    {
        header: "Batch",
        accessor: (batch) => (
            <div className= "flex flex-col" >
            <span className="text-sm font-medium text-foreground">
                { batch.name }
                </span>
                < span className="text-xs text-muted-foreground" >
                { batch.slug }
                </span>
                </div>
        ),
    },

{
    header: "Course",
        accessor: (batch) => (
            <span className= "inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700" >
            <Layers size={ 12 } />
    { batch.course?.title }
    </span>
        ),
},

{
    header: "Start Date",
        accessor: (batch) => (
            <span className= "inline-flex items-center gap-1 text-sm text-muted-foreground" >
            <CalendarDays size={ 14 } />
                < DateCell date = { batch.startDate } />
                    </span>
        ),
    className: "text-center",
    },

{
    header: "Seats",
        accessor: (batch) => {
            const remaining = batch.maxStudents - batch.enrolledCount;

            return (
                <div className= "flex flex-col text-sm text-center" >
                <span className="inline-flex items-center justify-center gap-1 text-muted-foreground" >
                    <Users size={ 14 } />
            { batch.enrolledCount }/{batch.maxStudents}
                </span>
                < span
            className = {`text-xs font-medium ${remaining > 0
                    ? "text-emerald-600"
                    : "text-red-500"
                }`
        }
                    >
        { remaining > 0
        ? `${remaining} seats left`
        : "Full"
}
</span>
    </div>
            );
        },
className: "text-center",
    },

{
    header: "Price",
        accessor: (batch) => {
            if (!batch.price || batch.price === 0) {
                return (
                    <span className= "font-medium text-emerald-600" >
                    Free
                    </span>
                );
            }

            return (
                <span className= "font-medium text-foreground" >
                    ৳ { batch.price }
            </span>
            );
        },
            className: "text-center",
    },

{
    header: "Status",
        accessor: (batch) => (
            <span
                className= {`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium uppercase
                ${batch.status === "UPCOMING"
                    ? "bg-blue-100 text-blue-700"
                    : batch.status === "ONGOING"
                        ? "bg-emerald-100 text-emerald-700"
                        : batch.status === "COMPLETED"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-red-100 text-red-700"
                }`
}
            >
    { batch.status }
    </span>
        ),
className: "text-center",
    },

{
    header: "Active",
        accessor: (batch) => (
            <span
                className= {`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
                ${batch.isActive
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-200 text-gray-700"
                }`
}
            >
    { batch.isActive ? "Active" : "Inactive" }
    </span>
        ),
className: "text-center",
    },

{
    header: "Created At",
        accessor: (batch) => (
            <span className= "text-sm text-muted-foreground" >
            <DateCell date={ batch.createdAt } />
                </span>
        ),
},
];