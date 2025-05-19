import { getServerSession } from "next-auth"
import DashboardCard from "../../../components/DashboardCard"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";

async function getUser(){
    const session  = await getServerSession(authOptions) ;

    if(!session) return {msg:"try logging in again"}
    const user = await prisma.user.findFirst({
        where: {
            id:Number(session.user.id)
        },
        select:{
            id:true,
            name:true,
            number:true,
            email:true,
        }
    })
    return {
        id:user?.id ?? undefined ,
        name:user?.name ?? undefined,
        number:user?.number ?? undefined,
        email:user?.email ?? undefined,
    }
}

export default async function(){
    const user = await getUser()
    if(user?.msg) return <h1>{user.msg}</h1>

    return (
        <div w-full h-full p-2>
            <h1 className="font-semibold text-3xl mb-3 ">Customer Info</h1>
            <DashboardCard  data={user} />
        </div>
    )
}