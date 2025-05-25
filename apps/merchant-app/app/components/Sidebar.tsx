'use client'
import React from 'react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64  max-h-screen overflow-y-hidden bg-[#f7f5fa] border-r border-slate-200 text-[#6a51a6] p-6 flex flex-col gap-3  justify-between">
      <div>
        <nav className="flex flex-col gap-2">
          <a
            className={`rounded px-3 py-2 ${pathname === '/dashboard' ? 'font-bold bg-white/20' : 'hover:bg-white/10'}`}
            href="/dashboard"
          >
            Dashboard
          </a>
          <a
            className={`rounded px-3 py-2 ${pathname === '/analytics' ? 'font-bold bg-white/20' : 'hover:bg-white/10'}`}
            href="/analytics"
          >
            Analytics
          </a>
          <a className="hover:bg-white/10 rounded px-3 py-2" href="#">Transactions</a>
          <a className="hover:bg-white/10 rounded px-3 py-2" href="#">Settlements</a>
          <a className="hover:bg-white/10 rounded px-3 py-2" href="#">Refunds</a>
          <a className="hover:bg-white/10 rounded px-3 py-2" href="#">Chargebacks</a>
          <a className="hover:bg-white/10 rounded px-3 py-2" href="#">Report</a>
        </nav>
        <div className="mt-8">
          <div className="text-xs text-white/80 mb-2">Accept Payments</div>
          <a className="hover:bg-white/10 rounded px-3 py-2 block" href="#">My QR Code</a>
        </div>
        <button
          onClick={() => signOut()}
          className="mt-12 w-full px-3 py-2 rounded border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 