"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const transactionId = searchParams.get("transactionId");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">

                {/* Success Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
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

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-900">
                    Payment Successful
                </h1>

                {/* Description */}
                <p className="text-gray-600 mt-2">
                    Your payment has been processed successfully and your enrollment is now confirmed.
                </p>

                {/* Transaction ID */}
                {transactionId && (
                    <div className="mt-6 bg-gray-50 border rounded-lg p-3 text-sm text-gray-600 break-all">
                        <span className="font-medium text-gray-700">Transaction ID:</span>
                        <div className="mt-1">{transactionId}</div>
                    </div>
                )}

                {/* Button */}
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                >
                    Go to Dashboard
                </button>

                {/* Footer text */}
                <p className="text-xs text-gray-400 mt-4">
                    If you experience any issues, please contact support.
                </p>
            </div>
        </div>
    );
}