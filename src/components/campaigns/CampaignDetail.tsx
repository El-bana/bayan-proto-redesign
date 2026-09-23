'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Send, FileText, Mail, MailOpen, CornerDownRight, CheckCircle2, XCircle, CheckSquare, Flag, Edit3, Trash2, Clock } from 'lucide-react';
import { useAppStore } from '@/lib/store';

type Tab = 'Analytics' | 'Leads' | 'Sequence';

export function CampaignDetail() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('Analytics');
  const { leads } = useAppStore();

  return (
    <main className="min-h-screen bg-[#F6F8F7] p-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => router.push('/campaigns')} className="text-[#0D8C7C] hover:text-[#14B39F] transition-colors">
            <Send className="w-8 h-8" />
          </button>
          <h1 className="text-[28px] font-bold text-[#10201C]">
            Campaigns <span className="font-normal text-[#10201C]">/ Europe campaign 2026</span>
          </h1>
        </div>

        {/* Campaign Info Card */}
        <div className="bg-[#E9F3F0] rounded-xl p-8 mb-8 relative border border-[#D3DEDB]">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-[#10201C]">Campaign info</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-base font-bold text-[#10201C] mb-3">Campaign Name</h3>
              <p className="text-[#7C8C87]">Europe campaign</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#10201C] mb-3">Language</h3>
              <p className="text-[#7C8C87]">English (UK)</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#10201C] mb-3">Campaign Type</h3>
              <p className="text-[#7C8C87]">Manual</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#D3DEDB] mb-8 w-[400px]">
          {(['Analytics', 'Leads', 'Sequence'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
                activeTab === tab ? 'text-[#10201C]' : 'text-[#D3DEDB]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#10201C]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Analytics' && (
          <div className="grid grid-cols-4 gap-4">
            <StatCard icon={<FileText className="w-6 h-6 text-[#1814F3]" />} bg="bg-[#1814F3]/10" label="Total Leads" value="300" />
            <StatCard icon={<Mail className="w-6 h-6 text-[#00B218]" />} bg="bg-[#00B218]/10" label="Sent Emails" value="950" trend="↑ 12 Today" trendColor="text-[#00B218]" />
            <StatCard icon={<MailOpen className="w-6 h-6 text-[#8B88FF]" />} bg="bg-[#8B88FF]/10" label="Open Rate" value="31%" />
            <StatCard icon={<CornerDownRight className="w-6 h-6 text-[#1814F3]" />} bg="bg-[#1814F3]/10" label="Reply Rate" value="50" trend="12 Interested" trendColor="text-[#00B218]" />
            <StatCard icon={<CheckCircle2 className="w-6 h-6 text-[#00B218]" />} bg="bg-[#00B218]/10" label="Delivery Rate" value="97.7%" />
            <StatCard icon={<XCircle className="w-6 h-6 text-[#E20000]" />} bg="bg-[#E20000]/10" label="Bounce Rate" value="2.1%" />
            <StatCard icon={<CheckSquare className="w-6 h-6 text-[#8000FF]" />} bg="bg-[#8000FF]/10" label="Follow-ups Sent" value="1000" />
            <StatCard icon={<Flag className="w-6 h-6 text-[#E20000]" />} bg="bg-[#E20000]/10" label="Unsubscribed Rate" value="10%" trend="↑ 12 Today" trendColor="text-[#E20000]" />
          </div>
        )}

        {activeTab === 'Leads' && (
          <div className="bg-[#F6F8F7] border border-[#D3DEDB] rounded-xl overflow-hidden shadow-sm">
            {/* Toolbar similar to Lead Locator */}
            <div className="p-4 border-b border-[#D3DEDB] flex gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-[#D3DEDB] px-3 py-2 text-sm text-[#7C8C87] bg-white h-[42px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  placeholder="Search for People..."
                  className="w-48 bg-transparent text-[#10201C] placeholder:text-[#7C8C87] focus:outline-none"
                />
              </div>
              <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] w-[42px] h-[42px] text-[#0D8C7C] hover:bg-teal-50 shrink-0 bg-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </button>
              <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] w-[42px] h-[42px] text-[#0D8C7C] hover:bg-teal-50 bg-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="border-b border-[#D3DEDB] text-[#10201C] font-bold">
                <tr>
                  <th className="w-12 px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#D3DEDB] text-[#0D8C7C] focus:ring-[#0D8C7C]" />
                  </th>
                  <th className="px-4 py-4">Lead Name</th>
                  <th className="px-4 py-4">Job Title</th>
                  <th className="px-4 py-4">Company</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Location</th>
                  <th className="px-4 py-4 text-[#0D8C7C]">Score Fit</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {leads.slice(0, 5).map(l => (
                  <tr key={l.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="w-4 h-4 rounded border-[#D3DEDB] text-[#0D8C7C] focus:ring-[#0D8C7C]" />
                    </td>
                    <td className="px-4 py-4 text-[#10201C]">{l.name}</td>
                    <td className="px-4 py-4 text-[#10201C]">{l.jobTitle}</td>
                    <td className="px-4 py-4 text-[#10201C]">{l.company}</td>
                    <td className="px-4 py-4 text-[#10201C]">{l.email}</td>
                    <td className="px-4 py-4 text-[#10201C]">{l.location}</td>
                    <td className="px-4 py-4 font-medium text-[#00B218]">{l.fitScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Sequence' && (
          <div className="flex flex-col items-center max-w-[600px] mx-auto mt-8">
            {/* Email Box 1 */}
            <div className="bg-[#F6F8F7] border border-[#D3DEDB] rounded-lg p-6 w-full relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-[#10201C] text-base font-medium">Initial Email</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-[#79D488] text-white text-sm font-medium px-4 py-1 rounded">Delivered</span>
                  <Edit3 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  <Trash2 className="w-5 h-5 text-red-400 cursor-pointer hover:text-red-600" />
                </div>
              </div>
              <h4 className="text-[#0E0E0E] text-base font-medium mb-3">Laoret-elevate your global</h4>
              <p className="text-[#10201C] text-sm font-mono leading-relaxed">
                Dear Mohamed, I hope this message finds you well. This is Omar from the Laoret team, and I am excited to introduce our company, a trusted provider of ISO-certified translation and localization services.
              </p>
            </div>

            {/* Dashed Arrow Down */}
            <div className="flex flex-col items-center justify-center h-12">
              <div className="w-px h-full border-l-2 border-dashed border-[#10201C] relative">
                 <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-b-2 border-r-2 border-[#10201C] transform rotate-45" />
              </div>
            </div>

            {/* Delay Node */}
            <div className="flex justify-center z-10 relative">
              <div className="bg-[#F6F8F7] border border-dashed border-[#10201C] rounded-[24px] px-8 py-3 flex items-center gap-4">
                <Clock className="w-6 h-6 text-[#10201C]" />
                <span className="font-bold text-[#10201C] text-lg">Wait for</span>
                <div className="bg-white border border-[#D6D7D7] rounded-md w-12 h-8 flex items-center justify-center font-bold text-[#10201C]">2</div>
                <span className="font-bold text-[#10201C] text-lg">Days</span>
              </div>
            </div>

            {/* Dashed Arrow Down */}
            <div className="flex flex-col items-center justify-center h-12">
              <div className="w-px h-full border-l-2 border-dashed border-[#10201C] relative">
                 <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-b-2 border-r-2 border-[#10201C] transform rotate-45" />
              </div>
            </div>

            {/* Email Box 2 */}
            <div className="bg-[#F6F8F7] border border-[#D3DEDB] rounded-lg p-6 w-full relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-[#10201C] text-base font-medium">Follow Up Email</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-[#8B88FF] text-white text-sm font-medium px-4 py-1 rounded">Pending</span>
                  <Edit3 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  <Trash2 className="w-5 h-5 text-red-400 cursor-pointer hover:text-red-600" />
                </div>
              </div>
              <h4 className="text-[#0E0E0E] text-base font-medium mb-3">Laoret-elevate your global</h4>
              <p className="text-[#10201C] text-sm font-mono leading-relaxed">
                Dear Mohamed, I hope this message finds you well. This is Omar from the Laoret team, and I am excited to introduce our company, a trusted provider of ISO-certified translation and localization services.
              </p>
            </div>
            
            {/* Dashed Arrow Down */}
            <div className="flex flex-col items-center justify-center h-12">
              <div className="w-px h-full border-l-2 border-dashed border-[#10201C] relative">
                 <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-b-2 border-r-2 border-[#10201C] transform rotate-45" />
              </div>
            </div>
            
             {/* Delay Node 2 */}
            <div className="flex justify-center z-10 relative">
              <div className="bg-[#F6F8F7] border border-dashed border-[#10201C] rounded-[24px] px-8 py-3 flex items-center gap-4">
                <Clock className="w-6 h-6 text-[#10201C]" />
                <span className="font-bold text-[#10201C] text-lg">Wait for</span>
                <div className="bg-white border border-[#D6D7D7] rounded-md w-12 h-8 flex items-center justify-center font-bold text-[#10201C]">2</div>
                <span className="font-bold text-[#10201C] text-lg">Days</span>
              </div>
            </div>
            
            {/* Dashed Arrow Down */}
            <div className="flex flex-col items-center justify-center h-12 mb-8">
              <div className="w-px h-full border-l-2 border-dashed border-[#10201C] relative">
                 <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-b-2 border-r-2 border-[#10201C] transform rotate-45" />
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon, bg, label, value, trend, trendColor }: { icon: React.ReactNode, bg: string, label: string, value: string, trend?: string, trendColor?: string }) {
  return (
    <div className="bg-white border border-[#D3DEDB] rounded-xl p-6 flex flex-col justify-between h-32 hover:border-[#0D8C7C] transition-colors shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[#7C8C87] text-sm font-medium">{label}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[28px] font-bold text-[#10201C] leading-none">{value}</span>
            {trend && <span className={`text-sm font-medium ${trendColor}`}>{trend}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
