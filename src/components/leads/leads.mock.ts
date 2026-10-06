import type { Lead, LeadList } from "@/lib/store";

export type MockCampaign = {
  name: string;
  status: "Done" | "Paused" | "Active" | "Draft";
};

export type MockLead = Lead & {
  owner: string;
  emailStatus: "Verified" | "Risky" | "Not Verified" | "Invalid";
  campaign?: MockCampaign; // at most ONE campaign, or none
};

const EURO: MockCampaign = { name: "Euro Campaign", status: "Active" };
const GCC: MockCampaign = { name: "GCC Campaign", status: "Paused" };
const USA: MockCampaign = { name: "USA Campaign", status: "Done" };
const DRAFT: MockCampaign = { name: "Q4 Outreach", status: "Draft" };

const HT = "Hager Torky";
const IA = "Ibrahim Aly";
const EM = "Esraa Mahmoud";

const row = (
  id: string,
  name: string,
  jobTitle: string,
  company: string,
  location: string,
  fitScore: number,
  owner: string,
  emailStatus: MockLead["emailStatus"],
  campaign?: MockCampaign,
) =>
  ({
    id,
    name,
    jobTitle,
    company,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, ".")}@${company
      .toLowerCase()
      .replace(/[^a-z]+/g, "")}.com`,
    location,
    fitScore,
    owner,
    emailStatus,
    campaign,
  }) as unknown as MockLead;

export const MOCK_LEADS: MockLead[] = [
  row(
    "1",
    "Omar Hassan",
    "Head of Marketing",
    "Nile Corp",
    "Cairo, Egypt",
    92,
    HT,
    "Verified",
    EURO,
  ),
  row(
    "2",
    "Sara Khaled",
    "CTO",
    "Gulfline",
    "Dubai, UAE",
    88,
    IA,
    "Verified",
    GCC,
  ),
  row(
    "3",
    "Lukas Meyer",
    "VP Sales",
    "Brenner GmbH",
    "Berlin, Germany",
    79,
    EM,
    "Risky",
    EURO,
  ),
  row(
    "4",
    "Emily Carter",
    "Product Manager",
    "Brightpath",
    "Austin, USA",
    64,
    HT,
    "Verified",
  ),
  row(
    "5",
    "Youssef Adel",
    "Operations Director",
    "Gulfline",
    "Riyadh, KSA",
    81,
    IA,
    "Verified",
    GCC,
  ),
  row(
    "6",
    "Marta Rossi",
    "Founder",
    "Studio Rossi",
    "Milan, Italy",
    55,
    EM,
    "Not Verified",
    DRAFT,
  ),
  row(
    "7",
    "James Wilson",
    "Director of Growth",
    "Brightpath",
    "New York, USA",
    90,
    HT,
    "Verified",
    USA,
  ),
  row(
    "8",
    "Fatima Zahra",
    "COO",
    "Atlas Logistics",
    "Casablanca, Morocco",
    72,
    IA,
    "Risky",
    EURO,
  ),
  row(
    "9",
    "Daniel Novak",
    "Engineering Lead",
    "Novak Labs",
    "Prague, Czechia",
    47,
    EM,
    "Invalid",
  ),
  row(
    "10",
    "Aisha Rahman",
    "Marketing Manager",
    "Falcon Retail",
    "Doha, Qatar",
    76,
    HT,
    "Verified",
    GCC,
  ),
  row(
    "11",
    "Pierre Dubois",
    "Head of Partnerships",
    "Lumiere SA",
    "Paris, France",
    85,
    IA,
    "Verified",
    EURO,
  ),
  row(
    "12",
    "Noor Al-Din",
    "Procurement Lead",
    "Atlas Logistics",
    "Amman, Jordan",
    69,
    EM,
    "Not Verified",
  ),
  row(
    "13",
    "Ryan Brooks",
    "Sales Director",
    "Cobalt Systems",
    "Chicago, USA",
    58,
    HT,
    "Risky",
    USA,
  ),
  row(
    "14",
    "Hana Mostafa",
    "CEO",
    "Nile Corp",
    "Alexandria, Egypt",
    94,
    IA,
    "Verified",
    EURO,
  ),
  row(
    "15",
    "Tomas Berg",
    "IT Manager",
    "Nordlys",
    "Stockholm, Sweden",
    61,
    EM,
    "Verified",
    EURO,
  ),
  row(
    "16",
    "Layla Mansour",
    "Business Developer",
    "Falcon Retail",
    "Kuwait City, Kuwait",
    52,
    HT,
    "Invalid",
    GCC,
  ),
  row(
    "17",
    "Chris Evans",
    "Account Executive",
    "Cobalt Systems",
    "Denver, USA",
    74,
    IA,
    "Verified",
  ),
  row(
    "18",
    "Mona Samir",
    "HR Director",
    "Nile Corp",
    "Giza, Egypt",
    66,
    EM,
    "Verified",
    GCC,
  ),
];

const list = (id: string, name: string, leadIds: string[]): LeadList => ({
  id,
  name,
  leadIds,
});

// Leads 4, 9, 12 and 17 have NO campaign (shown as "None").
// Leads 8, 9, 14, 16 and 17 are in NO list (to test "Not in any list").
// Leads 1, 2, 3, 5, 7, 11, 13 and 18 are in MORE THAN ONE list.
export const MOCK_LISTS: LeadList[] = [
  list("l1", "Euro Leads", ["1", "2", "3", "6", "11", "15"]),
  list("l2", "GCC Decision Makers", ["1", "2", "5", "10", "12", "18"]),
  list("l3", "USA SaaS", ["1", "4", "5", "7", "13"]),
  list("l4", "Webinar Attendees", ["3", "7", "13", "18"]),
  list("l5", "Event Contacts", ["7", "11", "12"]),
];
