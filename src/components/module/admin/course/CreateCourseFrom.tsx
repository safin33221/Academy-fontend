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
import { useActionState, useState } from "react";
import { createCourse } from "@/services/course/createCourse";

export default function CourseCreateForm() {
    const [level, setLevel] = useState("");
    const [isPremium, setIsPremium] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);

    const [curriculums, setCurriculums] = useState([{ title: "", content: "" }]);
    const [learnings, setLearnings] = useState([""]);
    const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

    const [_state, formAction, isPending] = useActionState(
        createCourse,
        null
    );

    return (
        <div className="min-h-screen bg-muted/40 p-6">
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
                    action={formAction}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* BASIC INFO */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">Basic Information</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input name="title" />
                                </Field>

                                <Field>
                                    <FieldLabel>Slug</FieldLabel>
                                    <Input name="slug" />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel>Short Description</FieldLabel>
                                <Textarea name="shortDescription" rows={2} />
                            </Field>

                            <Field>
                                <FieldLabel>Full Description</FieldLabel>
                                <Textarea name="fullDescription" rows={5} />
                            </Field>
                        </div>

                        {/* CURRICULUM */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Curriculum</h2>
                                <Button type="button" size="sm" onClick={() =>
                                    setCurriculums([...curriculums, { title: "", content: "" }])
                                }>
                                    <Plus size={14} className="mr-2" />
                                    Add Module
                                </Button>
                            </div>

                            {curriculums.map((_, index) => (
                                <div key={index} className="border rounded-xl p-4 space-y-3 bg-muted/30">
                                    <Input
                                        name={`curriculum[${index}][title]`}
                                        placeholder="Module title"
                                    />
                                    <Textarea
                                        name={`curriculum[${index}][content]`}
                                        placeholder="Module content"
                                    />

                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive"
                                            onClick={() =>
                                                setCurriculums(curriculums.filter((_, i) => i !== index))
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
                            <h2 className="text-lg font-semibold">What You Will Learn</h2>

                            {learnings.map((_, index) => (
                                <div key={index} className="flex gap-3">
                                    <Input name={`learnings[${index}]`} />
                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setLearnings(learnings.filter((_, i) => i !== index))
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
                                onClick={() => setLearnings([...learnings, ""])}
                            >
                                <Plus size={14} className="mr-2" />
                                Add Learning
                            </Button>
                        </div>

                        {/* FAQ */}
                        <div className="bg-background rounded-2xl border shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">FAQs</h2>

                            {faqs.map((_, index) => (
                                <div key={index} className="border rounded-xl p-4 space-y-3 bg-muted/30">
                                    <Input
                                        name={`faqs[${index}][question]`}
                                        placeholder="Question"
                                    />
                                    <Textarea
                                        name={`faqs[${index}][answer]`}
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
                            <h2 className="text-lg font-semibold">Pricing & Status</h2>

                            <Input name="price" type="number" placeholder="Price" />
                            <Input
                                name="discountPrice"
                                type="number"
                                placeholder="Discount Price"
                            />
                            <Input name="duration" type="number" placeholder="Duration (hrs)" />
                            <Input
                                name="totalClasses"
                                type="number"
                                placeholder="Total Classes"
                            />

                            <Select onValueChange={setLevel}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Level" />
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
                                {isPending ? "Creating..." : "Create Course"}
                            </Button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}