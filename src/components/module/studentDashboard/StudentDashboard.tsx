// app/student/dashboard/page.tsx
"use client";

import {
    BookOpen,
    Award,
    CreditCard, ChevronRight
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function StudentDashboard() {


    const courses = [
        {
            id: 1,
            name: "Web Development Bootcamp",
            progress: 75,
            instructor: "John Smith",
            nextClass: "Tomorrow at 10:00 AM"
        },
        {
            id: 2,
            name: "UI/UX Design Fundamentals",
            progress: 45,
            instructor: "Emma Wilson",
            nextClass: "Today at 2:00 PM"
        },
        {
            id: 3,
            name: "JavaScript Mastery",
            progress: 90,
            instructor: "Mike Johnson",
            completed: true
        }
    ];

    const certificates = [
        { id: 1, name: "HTML/CSS Basics", date: "Dec 15, 2024" },
        { id: 2, name: "JavaScript Essentials", date: "Jan 20, 2025" }
    ];

    const payments = [
        { id: 1, course: "Web Development Bootcamp", amount: "$299", date: "Feb 1, 2025", status: "Paid" },
        { id: 2, course: "UI/UX Design Fundamentals", amount: "$199", date: "Jan 15, 2025", status: "Paid" }
    ];



    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">


            <div className="flex">


                {/* Main Content */}
                <main className="flex-1 p-6">


                    {/* StudentDashboard Component Placeholder */}
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 mb-6">
                        <div className="text-center text-gray-400">
                            <p className="text-sm font-medium mb-2">StudentDashboard Component</p>
                            <p className="text-xs">Main dashboard content will be rendered here</p>
                        </div>
                    </div>

                    {/* Quick Overview Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* My Courses Preview */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    My Courses
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {courses.slice(0, 2).map(course => (
                                    <div key={course.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium">{course.name}</span>
                                            <span className="text-gray-500">{course.progress}%</span>
                                        </div>
                                        <Progress value={course.progress} className="h-2" />
                                        <p className="text-xs text-gray-500 mt-1">{course.nextClass}</p>
                                    </div>
                                ))}
                                <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                                    <Link href="#">View All Courses <ChevronRight className="h-3 w-3 ml-1" /></Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Certificates Preview */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Award className="h-4 w-4" />
                                    Recent Certificates
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {certificates.map(cert => (
                                        <div key={cert.id} className="text-sm">
                                            <p className="font-medium">{cert.name}</p>
                                            <p className="text-xs text-gray-500">{cert.date}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" size="sm" className="w-full text-xs mt-4" asChild>
                                    <Link href="#">View All Certificates <ChevronRight className="h-3 w-3 ml-1" /></Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Payments */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Recent Payments
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {payments.slice(0, 2).map(payment => (
                                        <div key={payment.id} className="flex justify-between text-sm">
                                            <div>
                                                <p className="font-medium">{payment.course}</p>
                                                <p className="text-xs text-gray-500">{payment.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{payment.amount}</p>
                                                <Badge variant="outline" className="text-xs">{payment.status}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" size="sm" className="w-full text-xs mt-4" asChild>
                                    <Link href="#">View Payment History <ChevronRight className="h-3 w-3 ml-1" /></Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}