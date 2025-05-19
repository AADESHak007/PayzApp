import { AllTransactions } from "../../../components/AllTransactions";

import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";


async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

async function getP2PTransfers(){
    const session = await getServerSession(authOptions) ;
    const sentTransfers = await prisma.p2pTransfer.findMany({
         where:{
            fromUserId:Number(session?.user?.id)  
         },
         select :{
             toUser :{
                 select:{
                     number : true,
                 }
             },
             amount :true,
             timestamp :true
         }
         
 
     })
     return sentTransfers ;
 
 }
 async function getreceivedTransfers(){
     const session = await getServerSession(authOptions) ;
     const TransfersReceived = await prisma.p2pTransfer.findMany({
         where: {
             toUserId: Number(session?.user?.id)
         },
         select :{
             fromUser :{
                 select:{
                     number : true,
                 }
             },
             amount :true,
             timestamp :true
         }
     })
     return TransfersReceived ;
 }

export default async function() {
    const onRampTransactions = await getOnRampTransactions();
    const sentTransfers = await getP2PTransfers();
    const receivedTransfers = await getreceivedTransfers();
    return (
    <div>
        <AllTransactions transactions={onRampTransactions} sentTransfer ={sentTransfers} receivedTransfer ={receivedTransfers} />
    </div>)
}