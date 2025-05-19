"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
 

const retrieveBalance = async ()=> {
    const session = await getServerSession(authOptions)
    if(!session){
        throw new Error("User not authorized to access balance")
    }
    const userId = session?.user.id
    const balance = await prisma.balance.findFirst({
        where:{
            userId : Number(userId)
        },
        select:{
            amount:true ,
            locked:true
        }
    })
    if(balance){
        return {
            amount:balance.amount /100,
            locked:balance.locked  
        } ;
    }
    else{
        throw new Error(`No balance found for user with id ${userId}`)
    }
}
export default retrieveBalance ;