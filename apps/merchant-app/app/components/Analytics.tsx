import React from 'react'
import { authOptions } from '../../lib/auth'
import { getServerSession } from 'next-auth/next'
import db from "@repo/db/client"

const getMerchantTransactions =  async ()=>{
  const session =  await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized , Please login to continue .... ')
  }
  const merchantId = session.user.id ;
  try {
    const transactions = await db.merchant.findMany({
      where : {
        id: Number(merchantId)
      },
      select : {
        receivedUserTransfers:{
          select: {
            id: true,
            amount: true,
            timestamp: true,
            fromUser: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    })
  
    return transactions ;

  } catch (error) {
    console.error('Error fetching merchant transactions:', error)
    throw new Error('Failed to fetch merchant transactions')
    
  }
}



const Analytics = async () => {
  const transactions = await getMerchantTransactions();
  if (!transactions || transactions.length === 0){
    return (
      <section className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-4">No transactions found for this merchant.</div>
        </div>
      </section>
    )
  }

  const arr =  transactions[0].receivedUserTransfers.map((t)=>{
    return {
      amount: t.amount,
      timestamp: t.timestamp.toLocaleTimeString(),
      fromUser: {
        id: t.fromUser.id,
        name: t.fromUser.name
      }
    }
  })
  const sum  = arr.reduce((acc,t) => acc + t.amount, 0);

  return (
    <section className="flex-1 p-8">
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="text-gray-500 text-sm mb-1">No. of Transactions</div>
        <div className="text-3xl font-bold text-blue-800">{arr.length}</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="text-gray-500 text-sm mb-1">Transactions Amount</div>
        <div className="text-3xl font-bold text-gray-800"> ₹ {Number(sum/100)}</div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800">Recent Transactions</div>
        
      </div>
      <div className="space-y-4">
        {arr.map((t, index) => (
          <div key={index} className="flex justify-between items-center p-4 border-b last:border-b-0">
            <div>
              <div className="text-sm text-gray-600">Received from {t.fromUser.name}</div>
              <div className="text-xs text-gray-400">{t.timestamp}</div>
            </div>
            <div className="text-lg font-semibold text-green-600">₹ {t.amount / 100}</div>
          </div>
        ))}
    </div>
      
    </div>
  </section>
  )
}

export default Analytics