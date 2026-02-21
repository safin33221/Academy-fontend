/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Star, CheckCircle, Globe, Calendar } from "lucide-react";
import { courses } from "../../../../../public/data/courses";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { CoursePreviewCard } from "@/components/common/CoursePreviewCard";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { ICourse } from "@/types/course/course.interface";

interface CourseDetailsPageProps {
  course: ICourse;
}

export default function CourseDetailsPageClient({
  course,
}: CourseDetailsPageProps) {
  const router = useRouter();


  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Button onClick={() => router.push("/course")}>
          Back to Courses
        </Button>
      </div>
    );
  }
  console.log({ course });

  return (
    <div className="min-h-screen bg-background pt-14">
      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-b">
        <div className="container mx-auto px-4 md:px-6 py-14 space-y-6">
          <Breadcrumb />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
            {course.title}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl">
            {course.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-yellow-500 font-medium">
              <Star className="h-4 w-4 fill-current" />
              {course.rating} ({course.reviewCount} reviews)
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              English
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Updated {new Date(course.updatedAt).getFullYear()}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          {/* LEFT CONTENT */}
          <div className="space-y-16">

            {/* What You'll Learn */}
            {course.learnings?.length > 0 && (
              <section className="rounded-3xl border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">
                  What you&apos;ll learn
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  {course.learnings.map((item: any) => (
                    <div key={item.id} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {item.content}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Description */}
            <section className="space-y-4 max-w-3xl">
              <h2 className="text-2xl font-semibold">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {course.fullDescription}
              </p>
            </section>

            {/* Curriculum */}
            {course.curriculum?.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Course Content</h2>

                <div className="text-sm text-muted-foreground">
                  {course.curriculum.length} sections •{" "}
                  {course.totalClasses} lectures • {course.duration}h total
                  length
                </div>

                <Accordion
                  items={course.curriculum.map((section: any) => ({
                    title: section.title,
                    content: section.content,
                  }))}
                  allowMultiple
                />
              </section>
            )}

            {/* Requirements */}
            {course.requirements?.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {course.requirements.map((req: any) => (
                    <li key={req.id}>{req.content}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Reviews */}
            {course.reviews?.length > 0 && (
              <section className="space-y-8">
                <h2 className="text-2xl font-semibold">Student Reviews</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {course.reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="rounded-2xl border p-6 bg-card shadow-sm space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold">
                          {review.user?.name?.[0] || "U"}
                        </div>

                        <div>
                          <p className="font-semibold text-sm">
                            {review.user?.name || "User"}
                          </p>

                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating
                                  ? "fill-current"
                                  : "text-muted-foreground/30"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        &quot;{review.comment}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {course.faqs?.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold">
                  Frequently Asked Questions
                </h2>

                <Accordion
                  items={course.faqs.map((f: any) => ({
                    title: f.question,
                    content: f.answer,
                  }))}
                />
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="relative">
            <div className="sticky top-24">
              <CoursePreviewCard
                course={course}
                onEnroll={() =>
                  router.push(`/course/${course.id}/enroll`)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
