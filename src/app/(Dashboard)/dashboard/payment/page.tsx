/* eslint-disable @typescript-eslint/no-explicit-any */
import { myPayment } from "@/services/payment/myPayment";

const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, string> = {
        PAID: "bg-green-100 text-green-700",
        FAILED: "bg-red-100 text-red-700",
        CANCELLED: "bg-gray-200 text-gray-700",
        PENDING: "bg-yellow-100 text-yellow-700",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status] || map.PENDING
                }`}
        >
            {status}
        </span>
    );
};

const PaymentCard = ({ item }: { item: any }) => {
    const payload = item.payment?.gatewayPayload;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">

            {/* Top Section */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        {item.batch?.course?.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Batch: {item.batch?.name}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">
                        ৳ {item.amount}
                    </p>
                    <StatusBadge status={item.status} />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-4" />

            {/* Details Section */}
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">

                <div className="space-y-2">
                    <p>
                        <span className="font-medium text-gray-800">Transaction ID:</span>{" "}
                        {item.transactionId}
                    </p>

                    <p>
                        <span className="font-medium text-gray-800">Order Date:</span>{" "}
                        {new Date(item.createdAt).toLocaleString()}
                    </p>

                    {payload?.tran_date && (
                        <p>
                            <span className="font-medium text-gray-800">Payment Time:</span>{" "}
                            {payload.tran_date}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    {payload?.card_issuer && (
                        <p>
                            <span className="font-medium text-gray-800">Payment Method:</span>{" "}
                            {payload.card_issuer}
                        </p>
                    )}

                    {payload?.card_type && (
                        <p>
                            <span className="font-medium text-gray-800">Method Type:</span>{" "}
                            {payload.card_type}
                        </p>
                    )}

                    {payload?.bank_tran_id && (
                        <p>
                            <span className="font-medium text-gray-800">Gateway Ref:</span>{" "}
                            {payload.bank_tran_id}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default async function Page() {
    const res = await myPayment();
    const history = res.data;

    return (
        <div className="max-w-7xl mx-auto px-6 py-14">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900">
                    Payment History
                </h1>
                <p className="text-gray-500 mt-2">
                    Track your course purchases and transactions.
                </p>
            </div>

            {history.length === 0 ? (
                <div className="text-center py-24 text-gray-500">
                    You haven’t made any payments yet.
                </div>
            ) : (
                <div className="space-y-8">
                    {history.map((item: any) => (
                        <PaymentCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}