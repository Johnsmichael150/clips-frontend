"use client";

import React, { useState, useEffect } from 'react';
import { Download, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Transaction, MockApi, Summary } from '@/app/lib/mockApi';
import { useAuth } from '@/components/AuthProvider';

interface EarningsTableProps {
  onExport?: (format: 'csv') => void;
}

const platforms = ['YouTube', 'TikTok', 'Instagram', 'Twitch'];
const statuses = ['completed', 'pending', 'failed'];

export default function EarningsTable({ onExport }: EarningsTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({ total: '0.00', completed: '0.00', pending: '0.00' });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'platform'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const { user } = useAuth();

  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;
      try {
        setLoading(true);
        const { transactions: txs, summary: sum } = await MockApi.getEarningsReport(user.id);
        setTransactions(txs);
        setSummary(sum);
      } catch (error) {
        console.error('Failed to fetch earnings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user?.id]);

  const filteredTransactions = transactions.filter(tx => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aVal, bVal;
    if (sortBy === 'date') {
      aVal = new Date(a.date).getTime();
      bVal = new Date(b.date).getTime();
    } else if (sortBy === 'amount') {
      aVal = a.amount;
      bVal = b.amount;
    } else {
      aVal = a.platform;
      bVal = b.platform;
    }
    return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });

  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const statusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'text-brand bg-brand/10 border-brand/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'failed': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
    }
  };

  if (loading) {
    return (
      <div className="bg-[#111111] border border-white/5 rounded-[24px] p-12 flex items-center justify-center">
        <div className="text-[#4A5D54] animate-spin-slow w-8 h-8 rounded-full border-2 border-brand/20 border-t-brand" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] border border-white/5 rounded-[24px] p-8">
          <div className="text-[#8e9895] text-[13px] font-bold uppercase tracking-wider mb-2">Total Earnings</div>
          <div className="text-[28px] font-extrabold text-white">${summary.total}</div>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-[24px] p-8">
          <div className="text-[#8e9895] text-[13px] font-bold uppercase tracking-wider mb-2">Completed</div>
          <div className="text-[28px] font-extrabold text-brand">${summary.completed}</div>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-[24px] p-8">
          <div className="text-[#8e9895] text-[13px] font-bold uppercase tracking-wider mb-2">Pending</div>
          <div className="text-[28px] font-extrabold text-yellow-400">${summary.pending}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5D54] pointer-events-none" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 bg-[#111111] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-white placeholder:text-[#4A5D54] focus:border-brand focus:outline-none transition-colors"
            />
          </div>
          <div className="text-[#8e9895] text-[13px]">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </div>
        <button
          onClick={() => onExport?.('csv')}
          className="bg-brand hover:bg-brand-hover text-black px-6 py-2.5 rounded-xl font-bold text-[14px] flex items-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-white/5 rounded-[24px] overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#4A5D54] text-[15px] mb-2">No transactions match your search</p>
            <p className="text-[#5A6F65]">Try adjusting your search terms</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th 
                      className="py-4 pl-8 pr-4 text-left font-bold text-[13px] text-[#8e9895] uppercase tracking-wider cursor-pointer hover:text-white flex-1 min-w-[200px]"
                      onClick={() => { setSortBy('date'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }}
                    >
                      Date {sortBy === 'date' && (sortDir === 'asc' ? <ChevronUp className="inline ml-1 w-3 h-3" /> : <ChevronDown className="inline ml-1 w-3 h-3" />)}
                    </th>
                    <th 
                      className="py-4 px-4 text-left font-bold text-[13px] text-[#8e9895] uppercase tracking-wider cursor-pointer hover:text-white min-w-[250px]"
                      onClick={() => { setSortBy('platform'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }}
                    >
                      Description
                    </th>
                    <th 
                      className="py-4 px-4 text-left font-bold text-[13px] text-[#8e9895] uppercase tracking-wider cursor-pointer hover:text-white min-w-[120px]"
                      onClick={() => { setSortBy('amount'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }}
                    >
                      Amount
                    </th>
                    <th 
                      className="py-4 px-4 text-left font-bold text-[13px] text-[#8e9895] uppercase tracking-wider min-w-[100px]"
                    >
                      Platform
                    </th>
                    <th 
                      className="py-4 px-4 text-left font-bold text-[13px] text-[#8e9895] uppercase tracking-wider min-w-[100px]"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="py-4 pl-8 pr-4 text-[14px] font-medium text-white">{tx.date}</td>
                      <td className="py-4 px-4 text-[14px] text-white max-w-[250px] truncate">{tx.description}</td>
                      <td className="py-4 px-4 text-[14px] font-bold text-brand">${tx.amount.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/5 capitalize">
                          {tx.platform}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3 p-6">
              {paginatedTransactions.map((tx) => (
                <div key={tx.id} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[15px] font-bold text-white">{tx.date}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="text-[14px] text-white mb-3 max-w-[200px] truncate">{tx.description}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-brand font-bold text-[16px]">${tx.amount.toFixed(2)}</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 capitalize">
                      {tx.platform}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 pb-6 flex items-center justify-between">
            <div className="text-[#8e9895] text-[13px]">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-[#8e9895] hover:text-white hover:bg-white/10 transition-colors disabled:hover:bg-white/5"
              >
                ‹
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-[#8e9895] hover:text-white hover:bg-white/10 transition-colors disabled:hover:bg-white/5"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
