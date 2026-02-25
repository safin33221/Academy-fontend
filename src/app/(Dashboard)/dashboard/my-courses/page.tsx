/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { getMyCourses } from "@/services/course/myCourses";

export default async function Page() {
    const res = await getMyCourses();
    const courses = res.data || [];


    return (
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                    My Courses
                </h1>
            </div>

            {courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="bg-gray-100 rounded-full p-6 mb-6">
                        <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m6-6H6"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                        You have not enrolled in any course yet.
                    </p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((item: any) => {
                        const course = item.batch.course;

                        return (
                            <div
                                key={course.id}
                                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Thumbnail */}
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={item?.batch?.thumbnail}
                                        alt={course.title}
                                        width={400}
                                        height={250}
                                        className="object-cover h-52 w-full transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col h-full">
                                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
                                        {course.title}
                                    </h2>
                                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug tracking-tight line-clamp-1">
                                        {item.batch.name}
                                    </h2>

                                    <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                                        {course.shortDescription}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-5">
                                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                                            {course.totalClasses} Classes
                                        </span>
                                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                                            {course.duration} Hours
                                        </span>
                                    </div>

                                    <Link
                                        href={`/courses/${course.slug}`}
                                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-linear-to-r from-black to-gray-800 text-white py-2.5 font-medium transition-all duration-300 hover:opacity-90"
                                    >
                                        Continue Learning
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}