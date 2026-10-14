import { create } from "zustand";

export interface ICP {
  id: string;
  name: string;
  industry: string;
  size: string;
  region: string;
  titles: string[];
  isArchived?: boolean;
  createdBy: string; // owner / creator of the ICP
  lastUsedDays: number | null; // days since last qualifying use, null = never used
  leadsFound: number; // leads from this ICP that were added to Lists
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  companyDescription: string;
  email: string;
  location: string;
  fitScore: number;
}

export interface LeadList {
  id: string;
  name: string;
  leadIds: string[];
  icpId?: string;
}

// Fields the store fills in itself when an ICP is created
type NewIcp = Omit<ICP, "id" | "createdBy" | "lastUsedDays" | "leadsFound">;

// TODO: replace with the logged-in user once auth is wired
const CURRENT_USER = "Hager Torky";

interface AppState {
  icps: ICP[];
  leads: Lead[];
  lists: LeadList[];
  addIcp: (icp: NewIcp) => void;
  deleteIcp: (id: string) => void;
  archiveIcp: (id: string) => void;
  setLeads: (leads: Lead[]) => void;
  addList: (name: string, leadIds: string[]) => void;
  addToList: (listId: string, leadIds: string[]) => void;
}

const initialIcps: ICP[] = [
  {
    id: "1",
    name: "American ICP",
    industry: "Education",
    size: "50-1000",
    region: "USA",
    titles: ["Director", "VP of Sales", "Head of Growth"],
    createdBy: "Hager Torky",
    lastUsedDays: 3,
    leadsFound: 42,
  },
  {
    id: "2",
    name: "Middle east ICP",
    industry: "Life Sciences",
    size: "50-1000",
    region: "USA",
    titles: ["Director", "Regulatory affairs"],
    createdBy: "Ibrahim Aly",
    lastUsedDays: 60,
    leadsFound: 18,
  },
  {
    id: "3",
    name: "English ICP",
    industry: "Gaming",
    size: "50-1000",
    region: "GCC",
    titles: ["Director"],
    createdBy: "Hager Torky",
    lastUsedDays: 150,
    leadsFound: 7,
  },
  {
    id: "4",
    name: "USA ICP",
    industry: "Gaming",
    size: "50-1000",
    region: "GCC",
    titles: ["Director", "CEO"],
    createdBy: "Esraa Mahmoud",
    lastUsedDays: 3,
    leadsFound: 56,
  },
  {
    id: "5",
    name: "Hellawy ICP",
    industry: "Beauty",
    size: "10-50",
    region: "Middle east",
    titles: ["Regulatory affairs"],
    createdBy: "Ibrahim Aly",
    lastUsedDays: 150,
    leadsFound: 0,
  },
  {
    id: "6",
    name: "Esraa ICP",
    industry: "Beauty",
    size: "50-100",
    region: "Middle east",
    titles: ["Regulatory affairs", "Head of Marketing"],
    createdBy: "Esraa Mahmoud",
    lastUsedDays: 3,
    leadsFound: 12,
    isArchived: true,
  },
  {
    id: "7",
    name: "Hussein ICP",
    industry: "Marketing",
    size: "50-1000",
    region: "UK",
    titles: ["Regulatory affairs"],
    createdBy: "Hager Torky",
    lastUsedDays: null,
    leadsFound: 0,
    isArchived: true,
  },
];

const initialLeads: Lead[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    jobTitle: "VP of Sales",
    company: "Acme Technologies",
    companyDescription: "Acme Technologies delivers enterprise cloud solutions and developer tooling.",
    email: "john.smith@acmetech.com",
    location: "New York, USA",
    fitScore: 92,
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    jobTitle: "Director of Marketing",
    company: "TechFlow Inc.",
    companyDescription: "TechFlow Inc. provides intelligent workflow automation for modern business teams.",
    email: "sarah.johnson@techflow.com",
    location: "San Francisco, USA",
    fitScore: 87,
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    jobTitle: "CEO",
    company: "CloudScale",
    companyDescription: "CloudScale specializes in scalable cloud infrastructure and DevOps consulting.",
    email: "michael.brown@cloudscale.io",
    location: "London, UK",
    fitScore: 95,
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    jobTitle: "Head of Growth",
    company: "GrowthLabs",
    companyDescription: "GrowthLabs is a data-driven growth marketing agency for high-growth tech startups.",
    email: "emily.davis@growthlabs.com",
    location: "Dubai, UAE",
    fitScore: 84,
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Wilson",
    jobTitle: "Founder",
    company: "SaaS Ventures",
    companyDescription: "SaaS Ventures invests in and accelerates early-stage B2B software companies.",
    email: "david.wilson@saasventures.com",
    location: "Austin, USA",
    fitScore: 90,
  },
];

export const useAppStore = create<AppState>((set) => ({
  icps: initialIcps,
  leads: initialLeads,
  lists: [
    {
      id: "1",
      name: "Euro Leads",
      leadIds: ["1", "2", "3", "6", "11", "15"],
      icpId: "1",
    },
    {
      id: "l1",
      name: "Euro Leads",
      leadIds: ["1", "2", "3", "6", "11", "15"],
      icpId: "1",
    },
    {
      id: "2",
      name: "GCC Decision Makers",
      leadIds: ["1", "2", "5", "10", "12", "18"],
    },
    {
      id: "l2",
      name: "GCC Decision Makers",
      leadIds: ["1", "2", "5", "10", "12", "18"],
    },
    {
      id: "l3",
      name: "USA SaaS",
      leadIds: ["1", "4", "5", "7", "13"],
    },
    {
      id: "l4",
      name: "Webinar Attendees",
      leadIds: ["3", "7", "13", "18"],
    },
    {
      id: "l5",
      name: "Event Contacts",
      leadIds: ["7", "11", "12"],
    },
  ],
  addIcp: (icp) =>
    set((state) => ({
      icps: [
        ...state.icps,
        {
          ...icp,
          id: crypto.randomUUID(),
          createdBy: CURRENT_USER,
          lastUsedDays: null,
          leadsFound: 0,
        },
      ],
    })),
  archiveIcp: (id) =>
    set((state) => ({
      icps: state.icps.map((icp) =>
        icp.id === id ? { ...icp, isArchived: !icp.isArchived } : icp,
      ),
    })),
  deleteIcp: (id) =>
    set((state) => ({
      icps: state.icps.filter((icp) => icp.id !== id),
    })),
  setLeads: (leads) => set({ leads }),
  addList: (name, leadIds) =>
    set((state) => ({
      lists: [...state.lists, { id: crypto.randomUUID(), name, leadIds }],
    })),
  addToList: (listId, leadIds) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? { ...list, leadIds: [...new Set([...list.leadIds, ...leadIds])] }
          : list,
      ),
    })),
}));
