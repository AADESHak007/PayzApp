import { Card } from "@repo/ui/card"

export const MerchantTransfer = ({ data }:{
    data: Array<{
        amount: number,
        timestamp: Date,
        toMerchant: {
            id: number,
            name: string
        }
    }>
}) => {

    return (
        <div>
            <Card title="Merchant Transactions">
                <div className="pt-2">
                    {data.map((t,ind) => <div key={ind} className="flex justify-between">
                        <div>
                            <div className="text-sm">
                                Sent INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.timestamp.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            - Rs {t.amount / 100}
                        </div>

                    </div>)}
                </div>
            </Card>

        </div>
    )
}