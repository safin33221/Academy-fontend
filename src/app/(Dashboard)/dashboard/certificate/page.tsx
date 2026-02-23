"use client";

import { Award, CheckCircle2 } from "lucide-react";

export default function Page() {
    // Demo flag (replace with real completion check)
    const hasCompletedCourse = false;

    if (!hasCompletedCourse) {
        return (
            <div className=" flex items-center justify-center bg-muted/30 px-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-md border p-10 text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                            <Award className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold">
                        No Certificate Available
                    </h2>

                    <p className="text-muted-foreground text-sm">
                        You have not completed any course yet.
                        Complete a course to receive your certificate.
                    </p>
                </div>
            </div>
        );
    }

    // Demo certificate view
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <div className="bg-white border-4 border-gray-200 rounded-2xl shadow-lg max-w-4xl w-full p-12 text-center space-y-8">

                <h1 className="text-4xl font-bold tracking-wide">
                    Certificate of Completion
                </h1>

                <p className="text-muted-foreground">
                    This is to certify that
                </p>

                <h2 className="text-3xl font-semibold">
                    John Doe
                </h2>

                <p className="text-muted-foreground">
                    has successfully completed the course
                </p>

                <h3 className="text-2xl font-medium">
                    Full Stack Web Development
                </h3>

                <div className="flex justify-center items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    Successfully Completed
                </div>

                <div className="flex justify-between text-sm text-muted-foreground pt-10 border-t">
                    <span>Date: {new Date().toLocaleDateString()}</span>
                    <span>Certificate ID: CERT-123456</span>
                </div>
            </div>
        </div>
    );
}
