import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import DashboardClient from "../../components/DashboardClient";




async function getMerchant() {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    return {
        id: session.user?.id,
        name: session.user?.name,
        email: session.user?.email,
    };
}

export default async function DashboardPage() {
    const merchant = await getMerchant();
    return <DashboardClient merchant={merchant} />;
} 