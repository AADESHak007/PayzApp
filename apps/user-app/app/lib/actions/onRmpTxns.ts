"use server" ;

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const onRampTransaction = async (amount:number , provider:string)=>{
    const session = await getServerSession(authOptions) ; //gives us the current user  .
    const userId = session.user.id ;
    const token = Math.random().toString(12) ; //random token 

    if(!userId) return {message:"Please log in to your account...!!!"} ;
    try {
        //adding onRamp 
        await prisma.onRampTransaction.create({
            data:{
                userId : Number(userId) ,
                amount,
                provider,
                startTime: new Date() ,
                status : "Processing" ,
                token,
            }
        })
    } catch (error) {
        return {
            message:"Failed to add the ON RAMP TXN...!!!"
        }
    }
}