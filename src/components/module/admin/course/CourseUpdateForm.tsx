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

import SingleImageUploader from "@/components/shared/SingleImageUploader";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { ICourse } from "@/types/course/course.interface";
import { updateCourse } from "@/services/course/updateCourse";

interface Props {
    course: ICourse;
}

export default function CourseUpdateForm({ course }: Props) {
    const [level, setLevel] = useState(course.level);
    const [isPremium, setIsPremium] = useState(course.isPremium);
    const [isFeatured, setIsFeatured] = useState(course.isFeatured);
    const [image, setImage] = useState<File | null>(null);

    const [curriculums, setCurriculums] = useState(
        course.curriculum?.length
            ? course.curriculum
            : [{ title: "", content: "" }]
    );

    const [learnings, setLearnings] = useState(
        course.learnings?.length
            ? course.learnings.map((l) => l.content)
            : [""]
    );

    const [faqs, setFaqs] = useState(
        course.faqs?.length
            ? course.faqs
            : [{ question: "", answer: "" }]
    );

    const [_state, formAction, isPending] = useActionState(
        updateCourse,
        null
    );

    useEffect(() => {
        if (_state?.success) {
            toast.success(_state.message);
            redirect("/admin/dashboard/courses");
        }
    }, [_state]);

    return (
        <div className="min-h-screen bg-muted/40 p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Update Course
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Modify course information
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
                        formData.append("id", course.id);

                        if (image) {
                            formData.append("image", image);
                        }

                        return formAction(formData);
                    }}
                    encType="multipart/form-data"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* BASIC INFO */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">
                                Basic Information
                            </h2>

                            <SingleImageUploader
                                onChange={setImage}
                                defaultImageUrl={course.thumbnail}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input name="title" defaultValue={course.title} />
                                </Field>

                                <Field>
                                    <FieldLabel>Slug</FieldLabel>
                                    <Input name="slug" defaultValue={course.slug} />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel>Short Description</FieldLabel>
                                <Textarea
                                    name="shortDescription"
                                    rows={2}
                                    defaultValue={course.shortDescription}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Full Description</FieldLabel>
                                <Textarea
                                    name="fullDescription"
                                    rows={5}
                                    defaultValue={course.fullDescription}
                                />
                            </Field>
                        </div>

                        {/* CURRICULUM */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Curriculum</h2>
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

                            {curriculums.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 space-y-3 bg-muted/30"
                                >
                                    <Input
                                        name={`curriculum[${index}][title]`}
                                        defaultValue={item.title}
                                        placeholder="Module title"
                                    />
                                    <Textarea
                                        name={`curriculum[${index}][content]`}
                                        defaultValue={item.content}
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

                            {learnings.map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <Input
                                        name={`learnings[${index}]`}
                                        defaultValue={item}
                                    />
                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setLearnings(
                                                    learnings.filter((_, i) => i !== index)
                                                )
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    )}
                                </div>
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

                            {faqs.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 space-y-3 bg-muted/30"
                                >
                                    <Input
                                        name={`faqs[${index}][question]`}
                                        defaultValue={item.question}
                                        placeholder="Question"
                                    />
                                    <Textarea
                                        name={`faqs[${index}][answer]`}
                                        defaultValue={item.answer}
                                        placeholder="Answer"
                                    />

                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive"
                                            onClick={() =>
                                                setFaqs(faqs.filter((_, i) => i !== index))
                                            }
                                        >
                                            <Trash2 size={14} className="mr-2" />
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}

                            <Button
                                type="button"
                                size="sm"
                                onClick={() =>
                                    setFaqs([...faqs, { question: "", answer: "" }])
                                }
                            >
                                <Plus size={14} className="mr-2" />
                                Add FAQ
                            </Button>
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
                                defaultValue={course.price}
                            />

                            <Input
                                name="discountPrice"
                                type="number"
                                defaultValue={course.discountPrice ?? ""}
                            />

                            <Input
                                name="duration"
                                type="number"
                                defaultValue={course.duration}
                            />

                            <Input
                                name="totalClasses"
                                type="number"
                                defaultValue={course.totalClasses}
                            />

                            <Select
                                defaultValue={course.level}
                                onValueChange={(value) =>
                                    setLevel(value as ICourse["level"])
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                                </SelectContent>
                            </Select>

                            <input type="hidden" name="level" value={level} />

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Premium</span>
                                <Switch
                                    checked={isPremium}
                                    onCheckedChange={setIsPremium}
                                />
                                <input
                                    type="hidden"
                                    name="isPremium"
                                    value={isPremium ? "true" : "false"}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Featured</span>
                                <Switch
                                    checked={isFeatured}
                                    onCheckedChange={setIsFeatured}
                                />
                                <input
                                    type="hidden"
                                    name="isFeatured"
                                    value={isFeatured ? "true" : "false"}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending ? "Updating..." : "Update Course"}
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
