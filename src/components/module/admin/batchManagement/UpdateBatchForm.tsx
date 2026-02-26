/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import SingleImageUploader from "@/components/shared/SingleImageUploader";
import { BatchStatus, IBatch } from "@/types/batch/batch.interface";
import { updateBatch } from "@/services/Batch/UpdateBatch";

interface Props {
    batch: IBatch;
    courses: { id: string; title: string }[];
    instructors: { id: string; name: string }[];
}

interface FormState {
    success: boolean;
    message: string;
    formData?: any;
}

const getInstructorId = (item: any): string | null => {
    if (!item) return null;
    if (typeof item === "string") return item;

    const value = item.id ?? item._id ?? item.userId ?? item.user?.id;
    return value ? String(value) : null;
};

const initialState: FormState = {
    success: false,
    message: "",
    formData: null,
};

export default function UpdateBatchForm({
    batch,
    courses,
    instructors,
}: Props) {


    const [_state, formAction, isPending] = useActionState(
        updateBatch,
        initialState
    );

    const [status, setStatus] = useState<BatchStatus>(
        batch?.status || "UPCOMING"
    );
    const [isActive, setIsActive] = useState<boolean>(batch?.isActive ?? true);
    const [courseId, setCourseId] = useState<string>(batch?.courseId || "");
    const [image, setImage] = useState<File | null>(null);
    const [selectedInstructors, setSelectedInstructors] = useState<string[]>(
        Array.isArray(batch?.instructors)
            ? batch.instructors
                .map((instructor: any) => getInstructorId(instructor))
                .filter((id): id is string => Boolean(id))
            : []
    );

    useEffect(() => {
        if (!_state?.message) return;

        if (_state.success) {
            toast.success(_state.message);
            redirect("/admin/dashboard/batch");
        } else {
            toast.error(_state.message);
        }
    }, [_state]);
    if (!batch) return null
    return (
        <div className="bg-muted/40 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Update Batch
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Edit and manage batch details
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
                    action={async (formData: FormData) => {
                        formData.append("id", batch.id);

                        if (image) {
                            formData.append("image", image);
                        }

                        return formAction(formData);
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">
                                Batch Information
                            </h2>

                            <SingleImageUploader
                                defaultImageUrl={batch?.thumbnail}
                                onChange={setImage}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Batch Name</FieldLabel>
                                    <Input
                                        name="name"
                                        defaultValue={batch?.name}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Select Course</FieldLabel>
                                    <Select
                                        value={courseId}
                                        onValueChange={setCourseId}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {courses.map((course) => (
                                                <SelectItem
                                                    key={course.id}
                                                    value={course.id}
                                                >
                                                    {course.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input
                                        type="hidden"
                                        name="courseId"
                                        value={courseId}
                                    />
                                </Field>
                            </div>

                            {/* Dates */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Enrollment Start</FieldLabel>
                                    <Input
                                        name="enrollmentStart"
                                        type="date"
                                        defaultValue={batch.enrollmentStart?.slice(0, 10)}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Enrollment End</FieldLabel>
                                    <Input
                                        name="enrollmentEnd"
                                        type="date"
                                        defaultValue={batch.enrollmentEnd?.slice(0, 10)}
                                    />
                                </Field>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Start Date</FieldLabel>
                                    <Input
                                        name="startDate"
                                        type="date"
                                        defaultValue={batch.startDate?.slice(0, 10)}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>End Date</FieldLabel>
                                    <Input
                                        name="endDate"
                                        type="date"
                                        defaultValue={batch.endDate?.slice(0, 10)}
                                    />
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
                                    defaultValue={batch.maxStudents}
                                />
                            </Field>

                            {/* ✅ Instructor Update Section */}
                            <Field>
                                <FieldLabel>Assign Instructors</FieldLabel>

                                <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                                    {instructors
                                        .map((instructor: any) => ({
                                            id: getInstructorId(instructor),
                                            name: instructor?.name ?? "Unnamed instructor",
                                        }))
                                        .filter((instructor) => Boolean(instructor.id))
                                        .map((instructor) => (
                                            <label
                                                key={instructor.id as string}
                                                className="flex items-center gap-2 text-sm cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedInstructors.includes(instructor.id as string)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedInstructors((prev) => [
                                                                ...prev,
                                                                instructor.id as string,
                                                            ]);
                                                        } else {
                                                            setSelectedInstructors((prev) =>
                                                                prev.filter(
                                                                    (id) => id !== (instructor.id as string)
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                                {instructor.name}
                                            </label>
                                        ))}
                                </div>

                                {/* Hidden inputs */}
                                {selectedInstructors.map((id) => (
                                    <input
                                        key={id}
                                        type="hidden"
                                        name="instructorIds"
                                        value={id}
                                    />
                                ))}
                            </Field>

                            <Field>
                                <FieldLabel>Status</FieldLabel>
                                <Select
                                    value={status}
                                    onValueChange={(value: string) =>
                                        setStatus(value as BatchStatus)
                                    }
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
                                <input
                                    type="hidden"
                                    name="status"
                                    value={status}
                                />
                            </Field>

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
                                {isPending
                                    ? "Updating..."
                                    : "Update Batch"}
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}

