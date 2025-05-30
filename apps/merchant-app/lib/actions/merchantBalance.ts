"use server"

import { authOptions } from "../auth";
import { getServerSession } from "next-auth"
import db from "@repo/db/client";



const getMerachantBalance = async () => {
    const session =  await getServerSession(authOptions);
    if (!session) {
        throw new Error("User not authorized to access balance .Please login first.");
    }
    try {
        const merchantId = session.user.id;
        const balance = await db.merchantBalance.findUnique({
            where: {
                merchantId: Number(merchantId),
            },
            select: {
                amount: true,
                locked: true,
            }
        });
    
        return {balance:balance?.amount , locked: balance?.locked};
    } catch (error) {
        console.error("Error retrieving merchant balance:", error);
        throw new Error("Failed to retrieve merchant balance. Please try again later.");
        
    }
}

export default getMerachantBalance;