"use client";

import { ArrowLeft } from "lucide-react";
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
import { useState } from "react";

export default function CourseCreateForm() {
    const [certificateEnabled, setCertificateEnabled] = useState(false);

    return (
        <div className="p-6 lg:py-10  space-y-8 ">

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Create Course
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Fill in the details below to publish a new course.
                    </p>
                </div>

                <Link href="/dashboard/courses">
                    <Button variant="outline" size="sm">
                        <ArrowLeft size={16} className="mr-2" />
                        Back
                    </Button>
                </Link>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
            >

                {/* Basic Info */}
                <div className="rounded-xl border bg-white p-6 space-y-6 shadow-sm">
                    <h2 className="text-lg font-medium">Basic Information</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input id="title" name="title" placeholder="Course title" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="slug">Slug</FieldLabel>
                            <Input id="slug" name="slug" placeholder="course-slug" />
                        </Field>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea
                            id="description"
                            name="description"
                            rows={4}
                            placeholder="Write course description..."
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="thumbnail">Thumbnail URL</FieldLabel>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            placeholder="https://image-url.com"
                        />
                    </Field>
                </div>

                {/* Classification */}
                <div className="rounded-xl border bg-white p-6 space-y-6 shadow-sm">
                    <h2 className="text-lg font-medium">Classification</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel>Type</FieldLabel>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ONLINE">Online</SelectItem>
                                    <SelectItem value="OFFLINE">Offline</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel>Access</FieldLabel>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select access" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FREE">Free</SelectItem>
                                    <SelectItem value="PAID">Paid</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel>Level</FieldLabel>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="DRAFT">Draft</SelectItem>
                                    <SelectItem value="PUBLISHED">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                </div>

                {/* Pricing & Settings */}
                <div className="rounded-xl border bg-white p-6 space-y-6 shadow-sm">
                    <h2 className="text-lg font-medium">Pricing & Settings</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Field>
                            <FieldLabel htmlFor="price">Price</FieldLabel>
                            <Input type="number" id="price" name="price" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="discountPrice">
                                Discount Price
                            </FieldLabel>
                            <Input type="number" id="discountPrice" name="discountPrice" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="duration">
                                Duration (Hours)
                            </FieldLabel>
                            <Input
                                type="number"
                                id="duration"
                                name="estimatedDurationHours"
                            />
                        </Field>
                    </div>

                    <div className="flex items-center justify-between border rounded-lg px-4 py-3">
                        <div>
                            <p className="text-sm font-medium">Enable Certificate</p>
                            <p className="text-xs text-muted-foreground">
                                Allow students to receive certificate
                            </p>
                        </div>
                        <Switch
                            checked={certificateEnabled}
                            onCheckedChange={setCertificateEnabled}
                        />
                    </div>
                </div>

                {/* SEO */}
                <div className="rounded-xl border bg-white p-6 space-y-6 shadow-sm">
                    <h2 className="text-lg font-medium">SEO Settings</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field>
                            <FieldLabel htmlFor="metaTitle">Meta Title</FieldLabel>
                            <Input id="metaTitle" name="metaTitle" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="metaDescription">
                                Meta Description
                            </FieldLabel>
                            <Textarea id="metaDescription" name="metaDescription" />
                        </Field>
                    </div>
                </div>

                {/* Sticky Footer Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Course</Button>
                </div>

            </motion.form>
        </div>
    );
}