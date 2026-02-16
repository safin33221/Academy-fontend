"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { motion } from "framer-motion";
import Link from "next/link";
import { useActionState, useState } from "react";
import { createBatch } from "@/services/Batch/createBatch";


interface Props {
    courses: { id: string; title: string }[];
}

export default function BatchCreateForm({ courses }: Props) {
    const [status, setStatus] = useState("UPCOMING");
    const [isActive, setIsActive] = useState(true);
    const [courseId, setCourseId] = useState("");

    const [_state, formAction, isPending] = useActionState(
        createBatch,
        null
    );

    return (
        <div className=" bg-muted/40 p-6">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create Batch
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create and manage course batch enrollment
                        </p>
                    </div>

                    <Link href="/admin/dashboard/batch">
                        <Button variant="outline" size="sm">
                            <ArrowLeft size={16} className="mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>

                <motion.form
                    action={formAction}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* BASIC INFO */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">
                                Batch Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Batch Name</FieldLabel>
                                    <Input name="name" placeholder="January 2025 Batch" />
                                </Field>

                                <Field>
                                    <FieldLabel>Slug</FieldLabel>
                                    <Input name="slug" placeholder="jan-2025-batch" />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel>Select Course</FieldLabel>
                                <Select onValueChange={setCourseId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map(course => (
                                            <SelectItem
                                                key={course.id}
                                                value={course.id}
                                            >
                                                {course.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="courseId" value={courseId} />
                            </Field>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Start Date</FieldLabel>
                                    <Input name="startDate" type="date" />
                                </Field>

                                <Field>
                                    <FieldLabel>End Date</FieldLabel>
                                    <Input name="endDate" type="date" />
                                </Field>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-6">
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6 sticky top-6">
                            <h2 className="text-lg font-semibold">
                                Capacity & Status
                            </h2>

                            <Field>
                                <FieldLabel>Maximum Students</FieldLabel>
                                <Input
                                    name="maxStudents"
                                    type="number"
                                    placeholder="50"
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Batch Price (Optional)</FieldLabel>
                                <Input
                                    name="price"
                                    type="number"
                                    placeholder="5000"
                                />
                            </Field>

                            {/* Status Select */}
                            <Field>
                                <FieldLabel>Status</FieldLabel>
                                <Select
                                    onValueChange={setStatus}
                                    defaultValue="UPCOMING"
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UPCOMING">
                                            Upcoming
                                        </SelectItem>
                                        <SelectItem value="ONGOING">
                                            Ongoing
                                        </SelectItem>
                                        <SelectItem value="COMPLETED">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="CANCELLED">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="status" value={status} />
                            </Field>

                            {/* Active Switch */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Active Batch</span>
                                <Switch
                                    checked={isActive}
                                    onCheckedChange={setIsActive}
                                />
                                <input
                                    type="hidden"
                                    name="isActive"
                                    value={isActive ? "true" : "false"}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending ? "Creating..." : "Create Batch"}
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}