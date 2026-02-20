// Mock data for the Partner Portal

export const restaurant = {
  name: "The Olive Garden Kitchen",
  address: "456 Culinary Blvd, Suite 12",
  city: "Austin, TX 78701",
  contactPerson: "Sarah Mitchell",
  phone: "(512) 555-0198",
  email: "sarah@olivegardenkitchen.com",
  logo: null as string | null,
  menuPdf: null as string | null,
};

export type VisitStatus = "Pending" | "Confirmed" | "Completed" | "Rescheduled";

export interface CreatorVisit {
  id: string;
  creatorName: string;
  creatorHandle: string;
  date: string;
  time: string;
  status: VisitStatus;
  deliverables: string[];
  notes: string;
  content?: ContentItem[];
}

export interface ContentItem {
  id: string;
  platform: "Instagram" | "TikTok";
  postLink: string;
  postingDate: string;
  type: "Reel" | "Story" | "Photo" | "Video";
  visitId: string;
}

export const visits: CreatorVisit[] = [
  {
    id: "v1",
    creatorName: "Mia Rodriguez",
    creatorHandle: "@mia.eats.atx",
    date: "2026-02-25",
    time: "6:00 PM",
    status: "Confirmed",
    deliverables: ["1 Reel", "3 Story Frames"],
    notes: "Parking available behind the building. Best time to film is golden hour around 5:30 PM.",
    content: [],
  },
  {
    id: "v2",
    creatorName: "Jordan Blake",
    creatorHandle: "@jordanblake.food",
    date: "2026-03-04",
    time: "12:00 PM",
    status: "Pending",
    deliverables: ["1 TikTok Video", "1 Reel", "2 Story Frames"],
    notes: "Highlight the new spring menu. Ask about the signature cocktail.",
  },
  {
    id: "v3",
    creatorName: "Priya Sharma",
    creatorHandle: "@priyacooks",
    date: "2026-02-10",
    time: "7:00 PM",
    status: "Completed",
    deliverables: ["1 Reel", "4 Story Frames", "2 Photos"],
    notes: "Feature the chef's tasting menu.",
    content: [
      { id: "c1", platform: "Instagram", postLink: "https://instagram.com/p/example1", postingDate: "2026-02-12", type: "Reel", visitId: "v3" },
      { id: "c2", platform: "Instagram", postLink: "https://instagram.com/p/example2", postingDate: "2026-02-12", type: "Story", visitId: "v3" },
      { id: "c3", platform: "TikTok", postLink: "https://tiktok.com/@priyacooks/video/example", postingDate: "2026-02-13", type: "Video", visitId: "v3" },
    ],
  },
  {
    id: "v4",
    creatorName: "Alex Chen",
    creatorHandle: "@alexchen.eats",
    date: "2026-01-20",
    time: "1:00 PM",
    status: "Completed",
    deliverables: ["1 Reel", "2 Photos"],
    notes: "Brunch feature. Focus on the avocado toast and latte art.",
    content: [
      { id: "c4", platform: "Instagram", postLink: "https://instagram.com/p/example3", postingDate: "2026-01-22", type: "Photo", visitId: "v4" },
      { id: "c5", platform: "Instagram", postLink: "https://instagram.com/p/example4", postingDate: "2026-01-23", type: "Reel", visitId: "v4" },
    ],
  },
  {
    id: "v5",
    creatorName: "Mia Rodriguez",
    creatorHandle: "@mia.eats.atx",
    date: "2026-03-15",
    time: "5:30 PM",
    status: "Rescheduled",
    deliverables: ["1 Reel", "3 Story Frames"],
    notes: "Rescheduled from March 10. New date works better for weekend dinner crowd footage.",
  },
];

export const quickStats = {
  views: 48200,
  likes: 3750,
  comments: 412,
  shares: 289,
};

export const monthlyPlan = [
  { task: "2 Creator Visits", completed: true },
  { task: "4 Posts Published", completed: false },
  { task: "6 Story Frames", completed: false },
  { task: "1 Monthly Report", completed: false },
];

export const recentActivity = [
  { id: "a1", text: "Creator visit confirmed with Mia Rodriguez", time: "2 hours ago", type: "visit" as const },
  { id: "a2", text: "New reel posted by Priya Sharma", time: "1 day ago", type: "content" as const },
  { id: "a3", text: "Monthly performance report generated", time: "3 days ago", type: "report" as const },
  { id: "a4", text: "Creator visit completed with Alex Chen", time: "1 week ago", type: "visit" as const },
  { id: "a5", text: "4 story frames posted by Alex Chen", time: "1 week ago", type: "content" as const },
];

export const performanceData = {
  viewsOverTime: [
    { month: "Sep", views: 12000 },
    { month: "Oct", views: 18500 },
    { month: "Nov", views: 22000 },
    { month: "Dec", views: 31000 },
    { month: "Jan", views: 39500 },
    { month: "Feb", views: 48200 },
  ],
  engagementOverTime: [
    { month: "Sep", likes: 800, comments: 90, shares: 60 },
    { month: "Oct", likes: 1400, comments: 150, shares: 95 },
    { month: "Nov", likes: 1900, comments: 210, shares: 130 },
    { month: "Dec", likes: 2600, comments: 290, shares: 180 },
    { month: "Jan", likes: 3200, comments: 360, shares: 240 },
    { month: "Feb", likes: 3750, comments: 412, shares: 289 },
  ],
  byPlatform: [
    { platform: "Instagram", views: 32500, engagement: 3100 },
    { platform: "TikTok", views: 15700, engagement: 1351 },
  ],
  byCreator: [
    { creator: "Mia Rodriguez", views: 18400, posts: 4 },
    { creator: "Priya Sharma", views: 16200, posts: 3 },
    { creator: "Alex Chen", views: 8900, posts: 2 },
    { creator: "Jordan Blake", views: 4700, posts: 1 },
  ],
  byContentType: [
    { type: "Reels", views: 28000, engagement: 2800 },
    { type: "Stories", views: 12500, engagement: 900 },
    { type: "Photos", views: 4200, engagement: 450 },
    { type: "TikTok Videos", views: 3500, engagement: 301 },
  ],
  googleReviews: 14,
  yelpReviews: 8,
  monthlySummary: [
    "Views increased 22% compared to last month, driven by Priya Sharma's reel going semi-viral.",
    "Instagram continues to outperform TikTok by 2:1 in total views.",
    "Engagement rate is trending upward — comments grew 14% month-over-month.",
    "Recommendation: Schedule a TikTok-focused visit to boost presence on that platform.",
    "Consider requesting a brunch-focused shoot — breakfast content consistently performs well.",
  ],
};

export const invoices = [
  { id: "INV-2026-02", date: "Feb 1, 2026", amount: "$299.00", status: "Paid" },
  { id: "INV-2026-01", date: "Jan 1, 2026", amount: "$299.00", status: "Paid" },
  { id: "INV-2025-12", date: "Dec 1, 2025", amount: "$299.00", status: "Paid" },
  { id: "INV-2025-11", date: "Nov 1, 2025", amount: "$299.00", status: "Paid" },
];

export const faqItems = [
  {
    question: "How do I schedule a creator visit?",
    answer: "Navigate to the Calendar page and click 'Schedule Visit' or use the button on your dashboard. Select a preferred date and time, and our team will match you with an available creator.",
  },
  {
    question: "Can I choose which creator visits my restaurant?",
    answer: "While we handle creator matching based on your cuisine type and target audience, you can request specific creators or express preferences. We'll do our best to accommodate.",
  },
  {
    question: "When will I receive my monthly performance report?",
    answer: "Reports are generated on the 1st of each month covering the previous month's activity. You'll receive an email notification and can also download it from the Performance page.",
  },
  {
    question: "Can I repost the creator's content on my own social media?",
    answer: "Yes! All content created during visits is licensed for your use. You can repost on your restaurant's social media channels with proper creator credit/tag.",
  },
  {
    question: "What happens if a creator cancels or reschedules?",
    answer: "If a creator needs to reschedule, you'll be notified immediately and a new date will be proposed within the same billing cycle. Cancellations are replaced with a different creator at no extra cost.",
  },
];

export const supportTickets = [
  { id: "TKT-001", subject: "Question about upcoming visit", date: "Feb 18, 2026", status: "Open" as const },
  { id: "TKT-002", subject: "Content download issue", date: "Feb 5, 2026", status: "Closed" as const },
  { id: "TKT-003", subject: "Billing inquiry", date: "Jan 15, 2026", status: "Closed" as const },
];
