import { Card } from "@repo/ui/card"

export const SentTransfer = ({ data }: {
    data: {
        amount: number,
        timestamp: Date,
        toUser: {
            number: string
        }
    }[]
}) => {

    return (
        <div>
            <Card title="Sent Transfers">
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