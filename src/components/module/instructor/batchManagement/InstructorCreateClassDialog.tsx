"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";

export type ClassType = "LIVE" | "RECORDED";

export interface CreateClassPayload {
    title: string;
    description: string;
    startTime: string;
    duration: number;
    classType: ClassType;
}

interface InstructorCreateClassDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    batchName: string;
    onSubmit: (payload: CreateClassPayload) => void;
}

const initialForm: CreateClassPayload = {
    title: "",
    description: "",
    startTime: "",
    duration: 60,
    classType: "LIVE",
};

export default function InstructorCreateClassDialog({
    open,
    onOpenChange,
    batchName,
    onSubmit,
}: InstructorCreateClassDialogProps) {
    const [form, setForm] = useState<CreateClassPayload>(initialForm);

    const resetForm = () => {
        setForm(initialForm);
    };

    const handleClose = (nextOpen: boolean) => {
        if (!nextOpen) {
            resetForm();
        }
        onOpenChange(nextOpen);
    };

    const handleCreate = () => {
        if (!form.title.trim()) {
            toast.error("Class title is required.");
            return;
        }

        if (!form.startTime) {
            toast.error("Start time is required.");
            return;
        }

        if (form.duration <= 0) {
            toast.error("Duration must be greater than 0.");
            return;
        }

        onSubmit({
            ...form,
            title: form.title.trim(),
            description: form.description.trim(),
        });

        resetForm();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create Batch Class</DialogTitle>
                    <DialogDescription>
                        Add a new class for {batchName}.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="class-title">Class Title</Label>
                        <Input
                            id="class-title"
                            value={form.title}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, title: e.target.value }))
                            }
                            placeholder="Enter class title"
                        />
                    </div>

                    <div>
                        <Label htmlFor="class-description">Description</Label>
                        <Textarea
                            id="class-description"
                            value={form.description}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, description: e.target.value }))
                            }
                            placeholder="Optional description"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="class-start-time">Start Time</Label>
                            <Input
                                id="class-start-time"
                                type="datetime-local"
                                value={form.startTime}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, startTime: e.target.value }))
                                }
                            />
                        </div>

                        <div>
                            <Label htmlFor="class-duration">Duration (minutes)</Label>
                            <Input
                                id="class-duration"
                                type="number"
                                value={form.duration}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        duration: Number(e.target.value),
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="class-type">Class Type</Label>
                        <select
                            id="class-type"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={form.classType}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    classType: e.target.value as ClassType,
                                }))
                            }
                        >
                            <option value="LIVE">Live</option>
                            <option value="RECORDED">Recorded</option>
                        </select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => handleClose(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate}>Create Class</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
