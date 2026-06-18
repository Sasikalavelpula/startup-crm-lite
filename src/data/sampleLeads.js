/**
 * Sample leads database representing realistic CRM contacts.
 * Includes exactly 6 sample leads with the following status distributions:
 * - 2 New
 * - 1 Contacted
 * - 1 Meeting Scheduled
 * - 1 Won
 * - 1 Lost
 * - 1 Proposal Sent (mapped as extra / seed data if needed, wait, the requirement is:
 *   "2 New, 1 Contacted, 1 Won, 1 Lost, 1 Meeting Scheduled")
 * 
 * Let's ensure the status distribution exactly matches the requested list:
 * - Lead 1: New
 * - Lead 2: Contacted
 * - Lead 3: Meeting Scheduled
 * - Lead 4: Won
 * - Lead 5: Lost
 * - Lead 6: New
 * 
 * Total: 6 Leads.
 */
export const sampleLeads = [
  {
    id: '1',
    name: 'Aarav Mehta',
    company: 'Mehta FinTech Solutions',
    email: 'aarav.mehta@mehtafintech.in',
    phone: '+91 98765 43210',
    status: 'New',
    source: 'Website',
    createdAt: '2026-06-18T06:00:00.000Z',
    value: 5200
  },
  {
    id: '2',
    name: 'Ananya Sharma',
    company: 'GreenEarth Innovations',
    email: 'ananya@greenearth.org',
    phone: '+91 87654 32109',
    status: 'Contacted',
    source: 'LinkedIn',
    createdAt: '2026-06-17T11:30:00.000Z',
    value: 8500
  },
  {
    id: '3',
    name: 'Rohan Deshmukh',
    company: 'Apex Logistics India',
    email: 'rohan.d@apexlogistics.co.in',
    phone: '+91 76543 21098',
    status: 'Meeting Scheduled',
    source: 'Referral',
    createdAt: '2026-06-16T14:15:00.000Z',
    value: 12000
  },
  {
    id: '4',
    name: 'Priyanka Nair',
    company: 'Lumina EdTech Group',
    email: 'priyanka@luminaedtech.com',
    phone: '+91 65432 10987',
    status: 'Won',
    source: 'Email Campaign',
    createdAt: '2026-06-15T09:45:00.000Z',
    value: 18500
  },
  {
    id: '5',
    name: 'Kabir Malhotra',
    company: 'Malhotra Retail Ventures',
    email: 'kabir.m@malhotravet.in',
    phone: '+91 98989 12345',
    status: 'Lost',
    source: 'Cold Call',
    createdAt: '2026-06-14T10:20:00.000Z',
    value: 3000
  },
  {
    id: '6',
    name: 'Diya Iyer',
    company: 'Nexa Softworks',
    email: 'diya.iyer@nexasoft.com',
    phone: '+91 91234 56789',
    status: 'New',
    source: 'Other',
    createdAt: '2026-06-13T16:00:00.000Z',
    value: 4500
  }
];

export default sampleLeads;
