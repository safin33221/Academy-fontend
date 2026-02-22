/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { getMyCourses } from "@/services/course/myCourses";

export default async function Page() {
    const res = await getMyCourses();
    const courses = res.data || [];

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">My Courses</h1>

            {courses.length === 0 ? (
                <p className="text-gray-500">You have not enrolled in any course yet.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {courses.map((item: any) => {
                        const course = item.course;

                        return (
                            <div
                                key={course.id}
                                className="border rounded-xl shadow-sm hover:shadow-md transition p-4"
                            >
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title}
                                    width={400}
                                    height={250}
                                    className="rounded-lg object-cover h-48 w-full"
                                />

                                <h2 className="text-xl font-semibold mt-4">
                                    {course.title}
                                </h2>

                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                    {course.shortDescription}
                                </p>

                                <div className="flex justify-between text-sm mt-4 text-gray-500">
                                    <span>{course.totalClasses} Classes</span>
                                    <span>{course.duration} Hours</span>
                                </div>

                                <Link
                                    href={`/courses/${course.slug}`}
                                    className="block mt-5 text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Continue Learning
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}