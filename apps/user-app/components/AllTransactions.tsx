import { Card } from "@repo/ui/card";

export const AllTransactions = ({
    transactions,
    sentTransfer,
    receivedTransfer,
}: {
    transactions: {
        time: Date;
        amount: number;
        status: string; // This can be updated to a more specific type like `"pending" | "completed" | "failed"`
        provider: string;
    }[];
    sentTransfer: {
        amount: number;
        timestamp: Date;
        toUser: {
            number: string;
        };
    }[];
    receivedTransfer: {
        amount: number;
        timestamp: Date;
        fromUser: {
            number: string;
        };
    }[];
}) => {
    return (
        <div className="w-[50vw] p-4">
            <Card title={"Transaction History"}>
                <div className="p-5 h-[50vh] overflow-y-auto space-y-6">
                    {/* Transactions */}
                    <div>
                        <div className="space-y-3">
                            {transactions.length > 0 ? (
                                transactions.map((t, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center border border-gray-200 rounded-lg p-3 hover:shadow-md"
                                    >
                                        <div>
                                            <div className="text-sm font-medium text-gray-700">
                                                Added INR
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {t.time.toDateString()}
                                            </div>
                                        </div>
                                        <div className="text-green-600 font-semibold text-sm">
                                            + ₹{(t.amount / 100).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No transactions available.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sent Transfers */}
                    <div>
                        <div className="space-y-3">
                            {sentTransfer.length > 0 ? (
                                sentTransfer.map((t, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center border border-gray-200 rounded-lg p-3 hover:shadow-md"
                                    >
                                        <div>
                                            <div className="text-sm font-medium text-gray-700">
                                                Sent INR
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {t.timestamp.toDateString()}
                                            </div>
                                        </div>
                                        <div className="text-red-500 font-semibold text-sm">
                                            - ₹{(t.amount / 100).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    {/* Received Transfers */}
                    <div>
                        <div className="space-y-3">
                            {receivedTransfer.length > 0 ? (
                                receivedTransfer.map((t, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center border border-gray-200 rounded-lg p-3 hover:shadow-md"
                                    >
                                        <div>
                                            <div className="text-sm font-medium text-gray-700">
                                                Received INR
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {t.timestamp.toDateString()}
                                            </div>
                                        </div>
                                        <div className="text-green-600 font-semibold text-sm">
                                            + ₹{(t.amount / 100).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                               <></>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>

    );
};
