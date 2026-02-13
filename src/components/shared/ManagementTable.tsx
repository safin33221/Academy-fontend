import { Edit, Eye, Loader2, MoreHorizontal, Trash } from "lucide-react";
import {
    Table,
    TableBody, TableCell, TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
export interface columns<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
    sortKey?: string
}
interface ManagementTableProps<T> {
    data: T[]
    columns: columns<T>[];
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    getRowKey: (row: T) => string
    EmptyMessage?: string;
    isRefreshing?: boolean;
}





export default function ManagementTable<T>(
    { data = [],
        columns = [],
        onView,
        onEdit,
        onDelete,
        EmptyMessage = "No Records Founds",
        getRowKey,
        isRefreshing = false
    }: ManagementTableProps<T>

) {

    const hasAction = onEdit || onView || onDelete

    return (


        <div className="relative">
            {/* Refresh Overlay */}
            {isRefreshing && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Refreshing...</p>
                    </div>
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col, idx) => (
                            <TableHead key={idx} className={col.className}>
                                {col.header}
                            </TableHead>
                        ))}
                        {hasAction && <TableHead>Action</TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (

                        <TableRow>
                            <TableCell
                                colSpan={columns.length + (hasAction ? 1 : 0)}
                                className="text-center py-8 text-muted-foreground"
                            >
                                {EmptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (


                            <TableRow key={getRowKey(item)}>
                                {columns.map((col, idx) => (
                                    <TableCell key={idx} className={col.className}>
                                        {typeof col.accessor === "function"
                                            ? col.accessor(item)
                                            : String(item[col.accessor])}
                                    </TableCell>
                                ))}

                                {hasAction && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {onView && (
                                                <DropdownMenuItem onClick={() => onView(item)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </DropdownMenuItem>
                                            )}
                                            {onEdit && (
                                                <DropdownMenuItem onClick={() => onEdit(item)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                            )}
                                            {onDelete && (
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(item)}
                                                    className="text-destructive flex items-center cursor-pointer"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );

}
