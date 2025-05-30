import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import DashboardClient from "../../components/DashboardClient";
import getMerachantBalance from "../../../lib/actions/merchantBalance";




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
    const merchantBalance = await getMerachantBalance();
    return <DashboardClient merchant={merchant} merchantBalance={merchantBalance} />;
} 