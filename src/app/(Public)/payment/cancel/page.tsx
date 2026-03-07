"use client";

import { useRouter } from "next/navigation";

export default function PaymentCancelPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-900">
                    Payment Cancelled
                </h1>

                {/* Description */}
                <p className="text-gray-600 mt-2">
                    Your payment was cancelled and no transaction has been completed.
                </p>

                <p className="text-sm text-gray-500 mt-2">
                    You can try the payment again or return to the course page.
                </p>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => router.back()}
                        className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition"
                    >
                        Go Back
                    </button>

                    <button
                        onClick={() => router.push("/courses")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition"
                    >
                        Browse Courses
                    </button>
                </div>

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-4">
                    If you believe this was an error, please contact support.
                </p>
            </div>
        </div>
    );
}