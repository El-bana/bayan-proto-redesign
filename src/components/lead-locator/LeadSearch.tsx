'use client';
import { useAppStore, Lead } from '@/lib/store';
import { ChevronDown, Briefcase, Users, User, Building, MapPin, Inbox, Search } from 'lucide-react';
import { useState } from 'react';
import { LeadTable } from './LeadTable';
import { motion } from 'framer-motion';

export function LeadSearch() {
  const { leads, setLeads, icps } = useAppStore();
  const [hasSearched, setHasSearched] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState('');

  const handleAiSearch = () => {
    // Generate mock leads
    const mockLeads: Lead[] = [
      { id: '1', name: 'Eleanor Pena', jobTitle: 'VP of Sales', company: 'TechCorp', email: 'eleanor@techcorp.com', location: 'USA', fitScore: 99 },
      { id: '2', name: 'Albert Flores', jobTitle: 'Sales Director', company: 'SaaS Inc', email: 'albert@saasinc.com', location: 'UK', fitScore: 85 },
      { id: '3', name: 'Jane Cooper', jobTitle: 'Head of Sales', company: 'GlobalData', email: 'jane@globaldata.com', location: 'Canada', fitScore: 78 },
      { id: '4', name: 'Wade Warren', jobTitle: 'Founder & CEO', company: 'StartupX', email: 'wade@startupx.com', location: 'Germany', fitScore: 35 },
      { id: '5', name: 'Esther Howard', jobTitle: 'VP Sales & Marketing', company: 'RetailPro', email: 'esther@retailpro.com', location: 'USA', fitScore: 92 },
    ];
    setLeads(mockLeads);
    setHasSearched(true);
  };

  const handleClear = () => {
    setLeads([]);
    setHasSearched(false);
    setSearchPrompt('');
  };

  return (
    <div className="flex h-full w-full">
      {/* Internal Sidebar Filters */}
      <div className="w-[308px] bg-[#ECF6F5] border-r border-[#D3DEDB] p-4 flex flex-col gap-4 overflow-y-auto shrink-0 relative rounded-l-lg ml-2 my-2">
        
        <div>
          <label className="text-[13px] text-[#7C8C87] mb-1 block px-2">Choose ICP</label>
          <div className="relative">
            <select className="w-full bg-white border border-[#D6D7D7] rounded-[4px] h-12 px-4 appearance-none outline-none text-sm text-[#10201C]">
              <option value="">Select an ICP</option>
              {icps.map(icp => <option key={icp.id} value={icp.id}>{icp.name}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-[#7C8C87] pointer-events-none" />
          </div>
        </div>

        <div className="h-[1px] bg-[#D3DEDB] my-2" />

        <div className="flex items-center gap-3 px-2 mb-2">
          <User className="w-6 h-6 text-[#10201C]" />
          <h3 className="font-medium text-[20px] text-[#10201C]">Customer Profile</h3>
        </div>

        <FilterDropdown icon={Briefcase} label="Job Titles" />
        <FilterDropdown icon={Users} label="People Lookalikes" />
        <FilterDropdown icon={Building} label="Company" />
        <FilterDropdown icon={MapPin} label="Location" />
        <FilterDropdown icon={Briefcase} label="Industry" />
        <FilterDropdown icon={Inbox} label="Email Status" />

        <div className="h-[1px] bg-[#D3DEDB] mt-auto" />

        <div className="flex gap-2 pt-2">
          <button onClick={handleClear} className="flex-1 py-2 text-[#0D8C7C] font-medium text-sm hover:bg-black/5 rounded-lg transition-colors">
            Clear All
          </button>
          <button className="flex-1 py-2 bg-[#0D8C7C] text-white font-medium text-sm rounded-lg hover:bg-[#14B39F] shadow-sm transition-colors">
            Save
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-8 relative overflow-hidden bg-[#F6F8F7]">
        <div className="flex items-center gap-4 text-[#10201C] mb-8">
          <h1 className="text-[25px] font-bold">Lead Locator</h1>
        </div>

        {!hasSearched ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center -mt-20 max-w-2xl mx-auto w-full text-center"
          >
            <h2 className="text-[49px] font-bold text-center leading-tight tracking-tight mb-12">
              <span className="text-[#10201C]">Hey Hager!</span><br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0D8C7C] via-[#14B39F] to-[#6D5BD0]">
                I'm Smart LeadLocator
              </span>
            </h2>
            
            <p className="text-[20px] text-[#10201C] font-medium mb-6">
              Tell me about your perfect lead and i'll find it rightaway!
            </p>

            <div className="w-full bg-white rounded-xl shadow-[0px_2px_4px_rgba(13,140,124,0.3)] border border-[#0D8C7C] p-4 flex flex-col gap-4">
              <input 
                type="text" 
                value={searchPrompt}
                onChange={e => setSearchPrompt(e.target.value)}
                placeholder="Ask AI to find your specific leads..." 
                className="w-full text-lg outline-none placeholder:text-[#7C8C87] text-[#10201C]"
                onKeyDown={e => e.key === 'Enter' && handleAiSearch()}
              />
              
              <div className="flex items-center justify-between">
                <button className="px-4 py-1.5 text-sm font-semibold text-[#7C8C87] border border-[#7C8C87] rounded-full hover:bg-gray-50 flex items-center gap-2">
                  <Search className="w-4 h-4" /> Chat History
                </button>
                <button 
                  onClick={handleAiSearch}
                  className="px-6 py-2 bg-gradient-to-r from-[#0D8C7C] via-[#14B39F] to-[#6D5BD0] text-white rounded-full font-bold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Search className="w-4 h-4" /> AI Search
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-8 flex-wrap justify-center">
              <SuggestionChip text="VPs of sales in SaaS" onClick={setSearchPrompt} />
              <SuggestionChip text="Fintech founders, Series A+" onClick={setSearchPrompt} />
              <SuggestionChip text="CMOs in e-commerce" onClick={setSearchPrompt} />
            </div>
          </motion.div>
        ) : (
          <LeadTable />
        )}
      </div>
    </div>
  );
}

function FilterDropdown({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex items-center justify-between w-full px-2 py-2 text-left hover:bg-black/5 rounded-md transition-colors group">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#445751] opacity-70 group-hover:opacity-100" />
        <span className="font-medium text-[16px] text-[#10201C]">{label}</span>
      </div>
      <ChevronDown className="w-4 h-4 text-[#445751]" />
    </button>
  );
}

function SuggestionChip({ text, onClick }: { text: string, onClick: (t: string) => void }) {
  return (
    <button 
      onClick={() => onClick(text)}
      className="px-4 py-2 bg-white border border-[#C3C3C3] rounded-full text-sm text-[#C3C3C3] hover:border-[#0D8C7C] hover:text-[#0D8C7C] transition-colors shadow-sm flex items-center gap-2"
    >
      <Search className="w-4 h-4" /> {text}
    </button>
  );
}
