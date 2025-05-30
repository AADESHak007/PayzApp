import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import db from "@repo/db/client"


const getMerchTransfers = async () => {
    const session =  await getServerSession(authOptions) ;
    if (!session) {
        throw new Error("User not authorized to access transfers");
    }
    const userId = session?.user.id;
    const transfers = await db.user.findMany({
        where:{id: Number(userId)},
        select :{
            sentMerchantTransfers: {
                select: {
                    id: true,
                    amount: true,
                    timestamp: true,
                    toMerchant: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    timestamp: "desc"
                }
            }
        }
    })
    return transfers ;
}
export default getMerchTransfers;