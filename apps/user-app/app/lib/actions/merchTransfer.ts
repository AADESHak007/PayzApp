"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

 

const userToMerchantTransfer = async(to: number, amount: number)=>{
    const session = await getServerSession(authOptions);
    const fromUser = session?.user?.id;
    if(!fromUser) {
        return { msg: "Error while sending money ...Please try logging in" };
    }
    const toMerchant = await db.merchant.findUnique({
        where :{
            id : to
        }
    })
    if(!toMerchant){
        return { msg: `Merchant with ID ${to}... Not Found` };
    }
    await db.$transaction(async(txn)=>{
        await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`;
        //fetch the user balance
        const fromBalance = await txn.balance.findUnique({
            where:{
                userId: Number(fromUser)
            }
        })
        
       // check if transfer is possible 
        if(!fromBalance) {
            return { msg: "Error while transferring funds..." };
        }
        if(fromBalance.amount < amount) {
                return { msg: "Insufficient Balance..." };
          }
       //deduct from user balance
       await txn.balance.update({
        where: { userId: Number(fromUser) },
        data:{amount: { decrement: amount }}
       })
       // increment merchant balance
       await txn.merchantBalance.update({
        where:{id:to},
        data:{amount: { increment: amount }}
       })
       //create a transfer record
       await txn.merchantTransfer.create({
        data:{
            fromUserId: Number(fromUser),
            toMerchantId: to,
            amount,
            timestamp: new Date()
        }
       })
    })
}

export default userToMerchantTransfer;