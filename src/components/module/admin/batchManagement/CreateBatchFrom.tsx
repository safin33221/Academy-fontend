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
import { createBatch } from "@/services/Batch/createBatch";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import SingleImageUploader from "@/components/shared/SingleImageUploader";

interface Props {
    courses: { id: string; title: string }[];
}

interface FormState {
    success: boolean;
    message: string;
    formData?: any;
}

const initialState: FormState = {
    success: false,
    message: "",
    formData: null,
};

export default function BatchCreateForm({ courses }: Props) {
    const [_state, formAction, isPending] = useActionState(
        createBatch,
        initialState
    );

    const [status, setStatus] = useState("UPCOMING");
    const [isActive, setIsActive] = useState(true);
    const [courseId, setCourseId] = useState("");
    const [image, setImage] = useState<File | null>(null);
    // Toast + Reset Logic
    useEffect(() => {
        if (!_state?.message) return;

        if (_state.success) {
            toast.success(_state.message);

            // Reset local states on success
            queueMicrotask(() => {
                setStatus("UPCOMING");
                setIsActive(true);
                setCourseId("");
            });
            redirect("/admin/dashboard/batch")
        } else {
            toast.error(_state.message);
        }
    }, [_state]);

    return (
        <div className="bg-muted/40 p-6">
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
                    action={async (formData: FormData) => {
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
                            <SingleImageUploader onChange={setImage} />

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Batch Name</FieldLabel>
                                    <Input
                                        name="name"
                                        defaultValue={_state?.formData?.name ?? ""}
                                    />
                                </Field>


                                <Field>
                                    <FieldLabel>Select Course</FieldLabel>
                                    <Select
                                        value={
                                            _state?.formData?.courseId ??
                                            courseId
                                        }
                                        onValueChange={setCourseId}
                                    >
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
                                    <input
                                        type="hidden"
                                        name="courseId"
                                        value={
                                            _state?.formData?.courseId ??
                                            courseId
                                        }
                                    />
                                </Field>
                            </div>


                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Enrollment Start</FieldLabel>
                                    <Input
                                        name="enrollmentStart"
                                        type="date"
                                        defaultValue={
                                            _state?.formData?.enrollmentStart ??
                                            ""
                                        }
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Enrollment End</FieldLabel>
                                    <Input
                                        name="enrollmentEnd"
                                        type="date"
                                        defaultValue={
                                            _state?.formData?.enrollmentEnd ??
                                            ""
                                        }
                                    />
                                </Field>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Start Date</FieldLabel>
                                    <Input
                                        name="startDate"
                                        type="date"
                                        defaultValue={
                                            _state?.formData?.startDate ?? ""
                                        }
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>End Date</FieldLabel>
                                    <Input
                                        name="endDate"
                                        type="date"
                                        defaultValue={
                                            _state?.formData?.endDate ?? ""
                                        }
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
                                    defaultValue={
                                        _state?.formData?.maxStudents ?? ""
                                    }
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Batch Price</FieldLabel>
                                <Input
                                    name="price"
                                    type="number"
                                    defaultValue={
                                        _state?.formData?.price ?? ""
                                    }
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Status</FieldLabel>
                                <Select
                                    value={
                                        _state?.formData?.status ??
                                        status
                                    }
                                    onValueChange={setStatus}
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
                                    value={
                                        _state?.formData?.status ??
                                        status
                                    }
                                />
                            </Field>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">
                                    Active Batch
                                </span>
                                <Switch
                                    checked={
                                        _state?.formData?.isActive ??
                                        isActive
                                    }
                                    onCheckedChange={setIsActive}
                                />
                                <input
                                    type="hidden"
                                    name="isActive"
                                    value={
                                        (_state?.formData?.isActive ??
                                            isActive)
                                            ? "true"
                                            : "false"
                                    }
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending
                                    ? "Creating..."
                                    : "Create Batch"}
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </div >
        </div >
    );
}
