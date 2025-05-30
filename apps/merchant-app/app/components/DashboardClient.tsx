import React from 'react'
// import SignUpLogin from './SignUpLogin';


interface DashboardClientProps {
  merchant: {
    id?: string | number;
    name?: string;
    email?: string;
  } | null;
  merchantBalance: {
    balance?: number | string;
    locked?: number | string;
  } | null;
}

const DashboardClient = async ({ merchant, merchantBalance }: DashboardClientProps) => {
  console.log("merchantBalance", merchantBalance);

  if (!merchantBalance) {
    return <div>Loading balance...</div>;
  }

  const displayBalance = merchantBalance.balance !== undefined && merchantBalance.balance !== null
    ? Number(merchantBalance.balance) / 100
    : 0;
  const displayLocked = merchantBalance.locked ?? 0;
  const isMissing = merchantBalance.balance === undefined && merchantBalance.locked === undefined;

  console.log("balance", merchantBalance.balance)
  return (
    <section className="flex-1 p-8">
      
      <div className="w-full max-w-md mx-auto flex flex-col p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            {/* Merchant Name */}
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
                {merchant?.name}
            </h1>
            {/* Merchant Email */}
            <h2 className="text-sm text-gray-600 mb-1">
                Email: {merchant?.email || "Please register your EMAIL"}
            </h2>
            {isMissing && (
              <div className="text-red-500 text-xs mb-2">No balance record found for this merchant.</div>
            )}
            {/* Balance Section */}
            <div className="flex flex-col gap-2">
                {/* Total Balance */}
                <h2 className="flex items-center justify-between text-sm font-medium text-gray-800">
                    <span>Balance:</span>
                    <span className="flex items-center gap-1 text-green-600">
                        <CurrencyRupee />
                        {displayBalance}
                    </span>
                </h2>
                {/* Locked Balance */}
                <h2 className="flex items-center justify-between text-sm font-medium text-gray-800">
                    <span>Locked Balance:</span>
                    <span className="flex items-center gap-1 text-red-500">
                        <CurrencyRupee />
                        {displayLocked}
                    </span>
                </h2>
            </div>
          </div>

    </section>
  );
};

export default DashboardClient;



function CurrencyRupee() {
  return (
      <span>
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>


      </span>
  )
}