"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const transactionId = searchParams.get("transactionId");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800">
                    Payment Successful
                </h1>

                <p className="text-gray-600 mt-2">
                    Your enrollment has been completed successfully.
                </p>

                {transactionId && (
                    <p className="text-sm text-gray-500 mt-4 break-all">
                        Transaction ID: {transactionId}
                    </p>
                )}

                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}