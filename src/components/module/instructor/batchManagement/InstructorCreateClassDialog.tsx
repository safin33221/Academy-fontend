"use client";

import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

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

import { IBatch } from "@/types/batch/batch.interface";
import { createBatchClass } from "@/services/batchClass/createBatchClass";

interface InstructorCreateClassDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    batch: IBatch;
    onSuccess?: () => void;
}

export default function InstructorCreateClassDialog({
    open,
    onOpenChange,
    batch,
    onSuccess,
}: InstructorCreateClassDialogProps) {
    const [state, formAction, isPending] = useActionState(
        createBatchClass,
        null
    );

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
            onOpenChange(false);
            onSuccess?.();
        } else {
            toast.error(state.message);
        }
    }, [state, onOpenChange, onSuccess]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create Batch Class</DialogTitle>
                    <DialogDescription>
                        Add a new class for {batch.name}
                    </DialogDescription>
                </DialogHeader>

                <form action={formAction} className="space-y-4">
                    {/* Hidden batchId */}
                    <input
                        type="hidden"
                        name="batchId"
                        value={batch.id}
                    />

                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Class Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Enter class title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Optional description"
                        />
                    </div>

                    {/* Start Time + Duration */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="startTime">
                                Start Time
                            </Label>
                            <Input
                                id="startTime"
                                name="startTime"
                                type="datetime-local"
                            />
                        </div>

                        <div>
                            <Label htmlFor="duration">
                                Duration (minutes)
                            </Label>
                            <Input
                                id="duration"
                                name="duration"
                                type="number"
                                defaultValue={60}
                            />
                        </div>
                    </div>

                    {/* Class Type */}
                    <div>
                        <Label htmlFor="classStatus">
                            Class Type
                        </Label>
                        <select
                            id="classStatus"
                            name="classStatus"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            defaultValue="LIVE"
                        >
                            <option value="LIVE">Live</option>
                            <option value="RECORDED">
                                Recorded
                            </option>
                        </select>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending
                                ? "Creating..."
                                : "Create Class"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
