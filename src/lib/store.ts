import { create } from 'zustand';

export interface ICP {
  id: string;
  name: string;
  industry: string;
  size: string;
  region: string;
  titles: string[];
}

export interface Lead {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  location: string;
  fitScore: number;
}

export interface LeadList {
  id: string;
  name: string;
  leadIds: string[];
}

interface AppState {
  icps: ICP[];
  leads: Lead[];
  lists: LeadList[];
  addIcp: (icp: Omit<ICP, 'id'>) => void;
  deleteIcp: (id: string) => void;
  setLeads: (leads: Lead[]) => void;
  addList: (name: string, leadIds: string[]) => void;
  addToList: (listId: string, leadIds: string[]) => void;
}

const initialIcps: ICP[] = [
  { id: '1', name: 'American ICP', industry: 'Education', size: '50-1000', region: 'USA', titles: ['Director'] },
  { id: '2', name: 'Middle east ICP', industry: 'Life Sciences', size: '50-1000', region: 'USA', titles: ['Director'] },
  { id: '3', name: 'English ICP', industry: 'Gaming', size: '50-1000', region: 'GCC', titles: ['Director'] },
  { id: '4', name: 'USA ICP', industry: 'Gaming', size: '50-1000', region: 'GCC', titles: ['Director'] },
  { id: '5', name: 'Hellawy ICP', industry: 'Beauty', size: '10-50', region: 'Middle east', titles: ['Regulatory affairs'] },
  { id: '6', name: 'Esraa ICP', industry: 'Beauty', size: '50-100', region: 'Middle east', titles: ['Regulatory affairs'] },
  { id: '7', name: 'Hussein ICP', industry: 'Marketing', size: '50-1000', region: 'UK', titles: ['Regulatory affairs'] },
];

export const useAppStore = create<AppState>((set) => ({
  icps: initialIcps,
  leads: [],
  lists: [
    { id: '1', name: 'Q4 Enterprise Targets', leadIds: [] },
    { id: '2', name: 'SaaS Founders', leadIds: [] },
  ],
  addIcp: (icp) => set((state) => ({
    icps: [...state.icps, { ...icp, id: crypto.randomUUID() }]
  })),
  deleteIcp: (id) => set((state) => ({
    icps: state.icps.filter((icp) => icp.id !== id)
  })),
  setLeads: (leads) => set({ leads }),
  addList: (name, leadIds) => set((state) => ({
    lists: [...state.lists, { id: crypto.randomUUID(), name, leadIds }]
  })),
  addToList: (listId, leadIds) => set((state) => ({
    lists: state.lists.map((list) => 
      list.id === listId 
        ? { ...list, leadIds: [...new Set([...list.leadIds, ...leadIds])] } 
        : list
    )
  })),
}));
