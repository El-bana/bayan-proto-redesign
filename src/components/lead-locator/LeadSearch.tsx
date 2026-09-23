'use client';
import { useAppStore, Lead } from '@/lib/store';
import { ChevronDown, Briefcase, Users, User, Building, MapPin, Inbox, Search, type LucideIcon } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { LeadTable } from './LeadTable';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';

const CUSTOM_ICP_VALUE = 'custom';
const CUSTOM_ICP_LABEL = 'Localization Managers at SaaS and E-commerce';

export function LeadSearch() {
  const { setLeads, icps } = useAppStore();
  const [hasSearched, setHasSearched] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState('');
  const [selectedIcp, setSelectedIcp] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleAiSearch = useCallback(() => {
    // Generate mock leads matching Figma design
    const mockLeads: Lead[] = [
      { id: '1', name: 'Hager Torky', jobTitle: 'UI Designer', company: 'BayanTech', email: 'hagertorky@gmail.com', location: 'Cairo,Egypt', fitScore: 91 },
      { id: '2', name: 'Salma Abdelmageed', jobTitle: 'UI/UX Designer', company: 'AsgaTech', email: 'salmaali@gmail.com', location: 'Cairo,Egypt', fitScore: 65 },
      { id: '3', name: 'Toka Ali', jobTitle: 'UX Designer', company: 'PWC Etic', email: 'tokaali@gmail.com', location: 'Cairo,Egypt', fitScore: 50 },
      { id: '4', name: 'Sara Samy', jobTitle: 'Senior UI designer', company: '700 Apps', email: 'sarsamy@gmail.com', location: 'Cairo,Egypt', fitScore: 35 },
      { id: '5', name: 'Farah Elsayed', jobTitle: 'Product Designer', company: 'Synapse', email: 'farahsayed@gmail.com', location: 'Cairo,Egypt', fitScore: 85 },
      { id: '6', name: 'Amany Shafik', jobTitle: 'Junior UX Designer', company: 'AsgaTech', email: 'amany@gmail.com', location: 'Cairo,Egypt', fitScore: 99 },
      { id: '7', name: 'Abeer Helmy', jobTitle: 'Head of Design', company: 'SI-Vision', email: 'abeer56@gmail.com', location: 'Cairo,Egypt', fitScore: 99 },
      { id: '8', name: 'Samy Sultan', jobTitle: 'Head of Design', company: 'BayanTech', email: 's.sultan@gmail.com', location: 'Cairo,Egypt', fitScore: 99 },
    ];
    setLeads(mockLeads);
    setHasSearched(true);
    setSelectedIcp(CUSTOM_ICP_VALUE);
  }, [setLeads]);

  useEffect(() => {
    if (searchParams.get('run') !== 'true') return;
    router.replace('/lead-locator');
    const timer = setTimeout(handleAiSearch, 0);
    return () => clearTimeout(timer);
  }, [searchParams, handleAiSearch, router]);

  const handleClear = () => {
    setLeads([]);
    setHasSearched(false);
    setSearchPrompt('');
    setSelectedIcp('');
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAiSearch();
  };

  return (
    <div className="flex h-full w-full">
      {/* Internal Sidebar Filters */}
      <div className="w-[308px] bg-[#ECF6F5] border-r border-[#D3DEDB] p-4 flex flex-col gap-4 overflow-y-auto shrink-0 relative rounded-l-lg ml-2 my-2">
        
        <div>
          <label htmlFor="icp-select" className="text-[13px] text-[#7C8C87] mb-1 block px-2">Choose ICP</label>
          <div className="relative">
            <select 
              id="icp-select"
              className="w-full bg-white border border-[#D6D7D7] rounded-[4px] h-12 px-4 appearance-none outline-none text-sm text-[#10201C] font-mono truncate pr-10"
              value={selectedIcp}
              onChange={(e) => setSelectedIcp(e.target.value)}
            >
              <option value="" disabled>Select an ICP</option>
              {icps.map(icp => <option key={icp.id} value={icp.id}>{icp.name}</option>)}
              <option value={CUSTOM_ICP_VALUE}>{CUSTOM_ICP_LABEL}</option>
            </select>
            <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-[#7C8C87] pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        {hasSearched && (
          <div className="flex flex-col gap-3 mt-2 px-2">
            <div className="bg-[#00C11A]/10 border-l-4 border-[#00B218] p-2.5 rounded-lg">
              <p className="text-[10px] font-mono text-black">Result size looks workable for one run. (1,200)</p>
            </div>
            <div className="bg-[#00C11A]/10 border-l-4 border-[#00B218] p-2.5 rounded-lg">
              <p className="text-[10px] font-mono text-black">Decision-maker coverage looks good (3 titles).</p>
            </div>
            <div className="bg-[#8000FF]/10 border-l-4 border-[#8000FF] p-2.5 rounded-lg">
              <p className="text-[10px] font-mono text-black">Estimated cost for this run: 180 credits (sourcing + enrichment).</p>
            </div>
          </div>
        )}

        <div className="h-[1px] bg-[#D3DEDB] my-2" />

        <div className="flex items-center gap-3 px-2 mb-2">
          <User className="w-6 h-6 text-[#10201C]" aria-hidden="true" />
          <h3 className="font-medium text-[20px] text-[#10201C]">Customer Profile</h3>
        </div>

        <FilterDropdown icon={Briefcase} label="Job Titles" hasValue={hasSearched} value="3 Selected" />
        <FilterDropdown icon={Users} label="People Lookalikes" hasValue={hasSearched} value="2 Lookalikes" />
        <FilterDropdown icon={Building} label="Company" />
        <FilterDropdown icon={MapPin} label="Location" hasValue={hasSearched} value="USA, EMEA" />
        <FilterDropdown icon={Briefcase} label="Industry" hasValue={hasSearched} value="SaaS, E-commerce" />
        <FilterDropdown icon={Inbox} label="Email Status" />

        <div className="h-[1px] bg-[#D3DEDB] mt-auto" />

        <div className="flex items-center gap-2 pt-2">
          {hasSearched && <span className="text-[13px] text-[#7C8C87] flex-1">25 Filters</span>}
          <div className="flex gap-2 ml-auto w-full justify-end">
            <button onClick={handleClear} className="px-4 py-1.5 text-[#0D8C7C] font-medium text-sm hover:bg-black/5 rounded-lg transition-colors">
              Clear All
            </button>
            <button className="px-6 py-1.5 bg-[#0D8C7C] text-white font-medium text-sm rounded-lg hover:bg-[#14B39F] shadow-sm transition-colors">
              Save
            </button>
          </div>
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
                I&apos;m Smart LeadLocator
              </span>
            </h2>
            
            <p className="text-[20px] text-[#10201C] font-medium mb-6">
              Tell me about your perfect lead and I&apos;ll find it right away!
            </p>

            <div className="w-full bg-white rounded-xl shadow-[0px_2px_4px_rgba(13,140,124,0.3)] border border-[#0D8C7C] p-4 flex flex-col gap-4">
              <input 
                type="text" 
                value={searchPrompt}
                onChange={e => setSearchPrompt(e.target.value)}
                placeholder="Ask AI to find your specific leads..." 
                className="w-full text-lg outline-none placeholder:text-[#7C8C87] text-[#10201C]"
                onKeyDown={handleEnter}
              />
              
              <div className="flex items-center justify-between">
                <button className="px-4 py-1.5 text-sm font-semibold text-[#7C8C87] border border-[#7C8C87] rounded-full hover:bg-gray-50 flex items-center gap-2">
                  <Search className="w-4 h-4" aria-hidden="true" /> Chat History
                </button>
                <button 
                  onClick={handleAiSearch}
                  className="px-6 py-2 bg-gradient-to-r from-[#0D8C7C] via-[#14B39F] to-[#6D5BD0] text-white rounded-full font-bold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Search className="w-4 h-4" aria-hidden="true" /> AI Search
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

function FilterDropdown({ icon: Icon, label, hasValue, value }: { icon: LucideIcon, label: string, hasValue?: boolean, value?: string }) {
  return (
    <button className="flex flex-col w-full px-2 py-2 text-left hover:bg-black/5 rounded-md transition-colors group">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[#445751] opacity-70 group-hover:opacity-100" aria-hidden="true" />
          <span className="font-medium text-[16px] text-[#10201C]">{label}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-[#445751]" aria-hidden="true" />
      </div>
      {hasValue && value && (
        <span className="text-[12px] text-[#0D8C7C] font-mono mt-1 ml-8 bg-[#0D8C7C]/10 px-2 py-0.5 rounded-md inline-block w-fit">
          {value}
        </span>
      )}
    </button>
  );
}

function SuggestionChip({ text, onClick }: { text: string, onClick: (t: string) => void }) {
  return (
    <button 
      onClick={() => onClick(text)}
      className="px-4 py-2 bg-white border border-[#C3C3C3] rounded-full text-sm text-[#C3C3C3] hover:border-[#0D8C7C] hover:text-[#0D8C7C] transition-colors shadow-sm flex items-center gap-2"
    >
      <Search className="w-4 h-4" aria-hidden="true" /> {text}
    </button>
  );
}