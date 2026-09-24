
'use client';
import { useAppStore, Lead } from '@/lib/store';
import { useState, useCallback, useEffect } from 'react';
import { LeadTable } from './LeadTable';
import { 
  ChevronDown, 
  Search, 
  Briefcase,
  Users,
  Building,
  MapPin,
  User
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

const CUSTOM_ICP_VALUE = "custom-icp";
const CUSTOM_ICP_LABEL = "Localization Managers at SaaS and";

export function LeadSearch() {
  const { setLeads, icps } = useAppStore();
  const [selectedIcp, setSelectedIcp] = useState('no-icp');
  const [maxSearch, setMaxSearch] = useState('2000');

  const handleAiSearch = useCallback(() => {
    const mockLeads: Lead[] = [
      { id: '1', name: 'Hager Torky', jobTitle: 'UI Designer', company: 'BayanTech', email: 'hagertorky@gmail.com', location: 'Cairo,Egypt', fitScore: 91 },
      { id: '3', name: 'Toka Ali', jobTitle: 'UX Designer', company: 'PWC Etic', email: 'tokaali@gmail.com', location: 'Cairo,Egypt', fitScore: 50 },
      { id: '5', name: 'Farah Elsayed', jobTitle: 'Product Designer', company: 'Synapse', email: 'farahsayed@gmail.com', location: 'Cairo,Egypt', fitScore: 85 },
      { id: '7', name: 'Abeer Helmy', jobTitle: 'Head of Design', company: 'SI-Vision', email: 'abeer56@gmail.com', location: 'Cairo,Egypt', fitScore: 99 },
      { id: '2', name: 'Salma Abdelmageed', jobTitle: 'UI/UX Designer', company: 'AsgaTech', email: 'salmaali@gmail.com', location: 'Cairo,Egypt', fitScore: 65 },
      { id: '4', name: 'Sara Samy', jobTitle: 'Senior UI designer', company: '700 Apps', email: 'sarsamy@gmail.com', location: 'Cairo,Egypt', fitScore: 35 },
      { id: '6', name: 'Amany Shafik', jobTitle: 'Junior UX Designer', company: 'AsgaTech', email: 'amany@gmail.com', location: 'Cairo,Egypt', fitScore: 99 },
      { id: '8', name: 'Samy Sultan', jobTitle: 'Head of Design', company: 'BayanTech', email: 's.sultan@gmail.com', location: 'Cairo,Egypt', fitScore: 99 },
    ];
    setLeads(mockLeads);
  }, [setLeads]);

  useEffect(() => {
    // Populate leads initially
    handleAiSearch();
  }, [handleAiSearch]);

  const handleClear = () => {
    setSelectedIcp('no-icp');
  };

  const showIcpScores = selectedIcp !== 'no-icp';

  return (
    <main className="min-h-screen bg-[#F6F8F7] p-8 flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[#0D8C7C]">
          <Search className="w-8 h-8" />
        </span>
        <h1 className="text-[28px] font-bold text-[#10201C]">Lead Locator</h1>
      </div>
      <div className="flex-1 w-full flex overflow-hidden">
        
        {/* Left Sidebar (Filters) */}
        <div className="w-[308px] bg-[#F6F8F7] border border-[#D3DEDB] p-4 flex flex-col gap-4 overflow-y-auto shrink-0 relative rounded-l-xl my-0">
          <div className="flex items-center gap-3 px-2 mb-2 pt-2">
            <User className="w-6 h-6 text-[#10201C]" aria-hidden="true" />
            <h3 className="font-medium text-[20px] text-[#10201C]">Customer Profile</h3>
          </div>

          <div>
            <div className="relative">
              <select 
                id="icp-select"
                className="w-full bg-white border border-[#D6D7D7] rounded-[4px] h-12 px-4 appearance-none outline-none text-sm text-[#10201C] font-mono truncate pr-10"
                value={selectedIcp}
                onChange={(e) => setSelectedIcp(e.target.value)}
              >
                <option value="no-icp">No ICP</option>
                {icps.map(icp => <option key={icp.id} value={icp.id}>{icp.name}</option>)}
                <option value={CUSTOM_ICP_VALUE}>{CUSTOM_ICP_LABEL}</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-[#8B00FF] pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <div className="bg-[#79D488] border border-[#79D488] p-3 rounded-md">
              <p className="text-[11px] font-mono text-[#0E0E0E]">Result size looks workable for one run. (1,200)</p>
            </div>
            <div className="bg-[#79D488] border border-[#79D488] p-3 rounded-md">
              <p className="text-[11px] font-mono text-[#0E0E0E]">Decision-maker coverage looks good (3 titles).</p>
            </div>
            <div className="bg-[#B996FF] border border-[#B996FF] p-3 rounded-md">
              <p className="text-[11px] font-mono text-[#0E0E0E]">Estimated cost for this run: 180 credits (sourcing + enrichment).</p>
            </div>
          </div>

          <div className="mt-1">
            <div className="relative">
              <select 
                className="w-full bg-white border border-[#D6D7D7] rounded-[4px] h-12 px-4 appearance-none outline-none text-sm text-[#10201C] font-mono truncate pr-10"
                value={maxSearch}
                onChange={(e) => setMaxSearch(e.target.value)}
              >
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-[#10201C] pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <div className="h-[1px] bg-[#D3DEDB] my-2" />

          <FilterDropdown icon={Briefcase} label="Job Titles" />
          <FilterDropdown icon={Users} label="People Lookalikes" />
          <FilterDropdown icon={Building} label="Company" />
          <FilterDropdown icon={MapPin} label="Location" />
          <FilterDropdown icon={Briefcase} label="Industry" />

          <div className="h-[1px] bg-[#D3DEDB] mt-auto" />

          <div className="flex items-center gap-2 pt-2">
            <span className="text-[13px] text-[#7C8C87] flex-1">25 Filters</span>
            <div className="flex gap-2 ml-auto justify-end">
              <button onClick={handleClear} className="px-3 py-1.5 text-[#0D8C7C] font-medium text-sm hover:bg-black/5 rounded-lg transition-colors">
                Clear All
              </button>
              <button className="px-5 py-1.5 bg-[#0D8C7C] text-white font-medium text-sm rounded-lg hover:bg-[#14B39F] shadow-sm transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-4 relative overflow-hidden bg-white rounded-r-xl rounded-l-xl border border-[#D3DEDB]">
          <LeadTable showIcpScores={showIcpScores} />
        </div>
      </div>
    </main>
  );
}

function FilterDropdown({ icon: Icon, label, hasValue, value }: { icon: LucideIcon, label: string, hasValue?: boolean, value?: string }) {
  return (
    <button className="flex flex-col w-full px-2 py-3 text-left hover:bg-black/5 rounded-md transition-colors group">
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
