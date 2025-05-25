"use client"

import React from 'react'

const Analytics = () => {
  return (
    <section className="flex-1 p-8">
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="text-gray-500 text-sm mb-1">No. of Transactions</div>
        <div className="text-3xl font-bold text-gray-800">56,560</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="text-gray-500 text-sm mb-1">Transactions Amount</div>
        <div className="text-3xl font-bold text-gray-800">₹ 3,78,079</div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800">Recent Transactions</div>
        <button className="bg-[#ede9fe] text-[#6a51a6] px-4 py-2 rounded hover:bg-[#d1c4e9]">Overlay Success Rate</button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-2">Date</th>
            <th className="py-2">Time</th>
            <th className="py-2">Payment Amount</th>
            <th className="py-2">Deduction</th>
            <th className="py-2">Net Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="py-2">28 Aug<br /><span className="text-xs text-gray-400">UTR: 023977XXXX</span></td>
            <td className="py-2">06:49 AM</td>
            <td className="py-2">₹ 10,000</td>
            <td className="py-2">₹ 2,000</td>
            <td className="py-2">₹ 8,000</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="py-2">27 Aug<br /><span className="text-xs text-gray-400">UTR: 023477XXXX</span></td>
            <td className="py-2">10:23 PM</td>
            <td className="py-2">₹ 45,000</td>
            <td className="py-2">₹ 1,000</td>
            <td className="py-2">₹ 44,000</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2">26 Aug<br /><span className="text-xs text-gray-400">UTR: 053277XXXX</span></td>
            <td className="py-2">02:34 AM</td>
            <td className="py-2">₹ 74,000</td>
            <td className="py-2">₹ 4,000</td>
            <td className="py-2">₹ 70,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  )
}

export default Analytics