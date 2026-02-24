/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { createCourse } from "@/services/course/createCourse";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import SingleImageUploader from "@/components/shared/SingleImageUploader";

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

export default function CourseCreateForm() {
    const [_state, formAction, isPending] = useActionState(
        createCourse,
        initialState
    );

    const [level, setLevel] = useState("BEGINNER");
    const [isPremium, setIsPremium] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    const [curriculums, setCurriculums] = useState([
        { title: "", content: "" },
    ]);

    const [learnings, setLearnings] = useState([""]);

    const [faqs, setFaqs] = useState([
        { question: "", answer: "" },
    ]);

    // Toast + Reset
    useEffect(() => {
        if (!_state?.message) return;

        if (_state.success) {
            toast.success(_state.message);

            queueMicrotask(() => {
                setLevel("BEGINNER");
                setIsPremium(false);
                setIsFeatured(false);
                setCurriculums([{ title: "", content: "" }]);
                setLearnings([""]);
                setFaqs([{ question: "", answer: "" }]);
            });

            redirect("/admin/dashboard/courses");
        } else {
            toast.error(_state.message);
        }
    }, [_state]);

    return (
        <div className="bg-muted/40 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create Course
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage course information and curriculum
                        </p>
                    </div>

                    <Link href="/admin/dashboard/courses">
                        <Button variant="outline" size="sm">
                            <ArrowLeft size={16} className="mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>

                <motion.form
                    action={async (formData: FormData) => {
                        if (image) formData.append("image", image);
                        return formAction(formData);
                    }}
                    encType="multipart/form-data"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* BASIC INFO */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">
                                Basic Information
                            </h2>

                            <SingleImageUploader onChange={setImage} />

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input
                                        name="title"
                                        defaultValue={_state?.formData?.title ?? ""}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Slug</FieldLabel>
                                    <Input
                                        name="slug"
                                        defaultValue={_state?.formData?.slug ?? ""}
                                    />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel>Short Description</FieldLabel>
                                <Textarea
                                    name="shortDescription"
                                    rows={2}
                                    defaultValue={
                                        _state?.formData?.shortDescription ?? ""
                                    }
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Full Description</FieldLabel>
                                <Textarea
                                    name="fullDescription"
                                    rows={5}
                                    defaultValue={
                                        _state?.formData?.fullDescription ?? ""
                                    }
                                />
                            </Field>
                        </div>

                        {/* CURRICULUM */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                    Curriculum
                                </h2>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                        setCurriculums([
                                            ...curriculums,
                                            { title: "", content: "" },
                                        ])
                                    }
                                >
                                    <Plus size={14} className="mr-2" />
                                    Add Module
                                </Button>
                            </div>

                            {curriculums.map((_, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 space-y-3 bg-muted/30"
                                >
                                    <Input
                                        name={`curriculum[${index}][title]`}
                                        defaultValue={
                                            _state?.formData?.curriculum?.[index]
                                                ?.title ?? ""
                                        }
                                        placeholder="Module title"
                                    />

                                    <Textarea
                                        name={`curriculum[${index}][content]`}
                                        defaultValue={
                                            _state?.formData?.curriculum?.[index]
                                                ?.content ?? ""
                                        }
                                        placeholder="Module content"
                                    />

                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive"
                                            onClick={() =>
                                                setCurriculums(
                                                    curriculums.filter((_, i) => i !== index)
                                                )
                                            }
                                        >
                                            <Trash2 size={14} className="mr-2" />
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* LEARNINGS */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">
                                What You Will Learn
                            </h2>

                            {learnings.map((_, index) => (
                                <Input
                                    key={index}
                                    name={`learnings[${index}]`}
                                    defaultValue={
                                        _state?.formData?.learnings?.[index]
                                            ?.content ?? ""
                                    }
                                />
                            ))}

                            <Button
                                type="button"
                                size="sm"
                                onClick={() =>
                                    setLearnings([...learnings, ""])
                                }
                            >
                                <Plus size={14} className="mr-2" />
                                Add Learning
                            </Button>
                        </div>

                        {/* FAQ */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">FAQs</h2>

                            {faqs.map((_, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 space-y-3 bg-muted/30"
                                >
                                    <Input
                                        name={`faqs[${index}][question]`}
                                        defaultValue={
                                            _state?.formData?.faqs?.[index]
                                                ?.question ?? ""
                                        }
                                        placeholder="Question"
                                    />
                                    <Textarea
                                        name={`faqs[${index}][answer]`}
                                        defaultValue={
                                            _state?.formData?.faqs?.[index]
                                                ?.answer ?? ""
                                        }
                                        placeholder="Answer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-6">
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6 sticky top-6">
                            <h2 className="text-lg font-semibold">
                                Pricing & Status
                            </h2>

                            <Input
                                name="price"
                                type="number"
                                defaultValue={_state?.formData?.price ?? ""}
                            />

                            <Input
                                name="discountPrice"
                                type="number"
                                defaultValue={
                                    _state?.formData?.discountPrice ?? ""
                                }
                            />

                            <Input
                                name="duration"
                                type="number"
                                defaultValue={
                                    _state?.formData?.duration ?? ""
                                }
                            />

                            <Input
                                name="totalClasses"
                                type="number"
                                defaultValue={
                                    _state?.formData?.totalClasses ?? ""
                                }
                            />

                            <Field>
                                <FieldLabel>Level</FieldLabel>
                                <Select
                                    value={
                                        _state?.formData?.level ?? level
                                    }
                                    onValueChange={setLevel}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BEGINNER">
                                            Beginner
                                        </SelectItem>
                                        <SelectItem value="INTERMEDIATE">
                                            Intermediate
                                        </SelectItem>
                                        <SelectItem value="ADVANCED">
                                            Advanced
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <input
                                    type="hidden"
                                    name="level"
                                    value={
                                        _state?.formData?.level ?? level
                                    }
                                />
                            </Field>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Premium</span>
                                <Switch
                                    checked={
                                        _state?.formData?.isPremium ??
                                        isPremium
                                    }
                                    onCheckedChange={setIsPremium}
                                />
                                <input
                                    type="hidden"
                                    name="isPremium"
                                    value={
                                        (_state?.formData?.isPremium ??
                                            isPremium)
                                            ? "true"
                                            : "false"
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Featured</span>
                                <Switch
                                    checked={
                                        _state?.formData?.isFeatured ??
                                        isFeatured
                                    }
                                    onCheckedChange={setIsFeatured}
                                />
                                <input
                                    type="hidden"
                                    name="isFeatured"
                                    value={
                                        (_state?.formData?.isFeatured ??
                                            isFeatured)
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
                                    : "Create Course"}
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}