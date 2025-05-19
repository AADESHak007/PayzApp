
import React from 'react'
import retrieveBalance from '../app/lib/actions/retrieveBalance';

type UserDetailProp = {
    id?: number,

    name?: string;

    number?: string;

    email?: string;

    msg?: string;

};

const DashboardCard = async ({ data }: { data: UserDetailProp }) => {
    const balance = await retrieveBalance()
    return (
        <div className="w-full max-w-md mx-auto flex flex-col p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            {/* User Name */}
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
                {data?.name}
            </h1>
            {/* User Email */}
            <h2 className="text-sm text-gray-600 mb-1">
                Email: {data?.email || "Please register your EMAIL"}
            </h2>
            {/* User Number */}
            <h3 className="text-sm text-gray-600 font-bold mb-4">
                Contact: {data?.number}
            </h3>
            {/* Balance Section */}
            <div className="flex flex-col gap-2">
                {/* Total Balance */}
                <h2 className="flex items-center justify-between text-sm font-medium text-gray-800">
                    <span>Balance:</span>
                    <span className="flex items-center gap-1 text-green-600">
                        <CurrencyRupee />
                        {balance?.amount ?? "Loading..."}
                    </span>
                </h2>
                {/* Locked Balance */}
                <h2 className="flex items-center justify-between text-sm font-medium text-gray-800">
                    <span>Locked Balance:</span>
                    <span className="flex items-center gap-1 text-red-500">
                        <CurrencyRupee />
                        {balance?.locked ?? "Loading..."}
                    </span>
                </h2>
            </div>
        </div>
    )
}

export default DashboardCard

function CurrencyRupee() {
    return (
        <span>
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
           </svg>


        </span>
    )
}