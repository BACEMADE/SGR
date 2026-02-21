// Mock data for the Creator Portal
// Structured to sync with mockPartnerData (restaurant side)

export const creator = {
  name: "Mia Rodriguez",
  handle: "@mia.eats.atx",
  email: "mia@creatorcollective.com",
  phone: "(512) 555-0342",
  city: "Austin, TX",
  platforms: {
    instagram: "@mia.eats.atx",
    tiktok: "@miaeatsatx",
  },
  instagramFollowers: 24500,
  tiktokFollowers: 18200,
};

export type CreatorVisitStatus = "Pending" | "Confirmed" | "Completed";

export interface CreatorAssignedVisit {
  id: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantCity: string;
  contactPerson: string;
  date: string;
  time: string;
  status: CreatorVisitStatus;
  deliverables: string[];
  instructions: string;
}

export const creatorVisits: CreatorAssignedVisit[] = [
  {
    id: "v1",
    restaurantName: "The Olive Garden Kitchen",
    restaurantAddress: "456 Culinary Blvd, Suite 12",
    restaurantCity: "Austin, TX 78701",
    contactPerson: "Sarah Mitchell",
    date: "2026-02-25",
    time: "6:00 PM",
    status: "Confirmed",
    deliverables: ["1 Reel", "3 Story Frames"],
    instructions: "Parking available behind the building. Best time to film is golden hour around 5:30 PM.",
  },
  {
    id: "v5",
    restaurantName: "The Olive Garden Kitchen",
    restaurantAddress: "456 Culinary Blvd, Suite 12",
    restaurantCity: "Austin, TX 78701",
    contactPerson: "Sarah Mitchell",
    date: "2026-03-15",
    time: "5:30 PM",
    status: "Pending",
    deliverables: ["1 Reel", "3 Story Frames"],
    instructions: "Weekend dinner crowd footage. Focus on ambiance and plating.",
  },
  {
    id: "cv3",
    restaurantName: "Sakura Bistro",
    restaurantAddress: "120 East 6th St",
    restaurantCity: "Austin, TX 78701",
    contactPerson: "Ken Tanaka",
    date: "2026-03-08",
    time: "12:00 PM",
    status: "Confirmed",
    deliverables: ["1 TikTok Video", "2 Story Frames"],
    instructions: "Lunch service highlight. Capture the sushi chef in action.",
  },
  {
    id: "cv4",
    restaurantName: "The Olive Garden Kitchen",
    restaurantAddress: "456 Culinary Blvd, Suite 12",
    restaurantCity: "Austin, TX 78701",
    contactPerson: "Sarah Mitchell",
    date: "2026-01-18",
    time: "7:00 PM",
    status: "Completed",
    deliverables: ["1 Reel", "4 Story Frames", "2 Photos"],
    instructions: "Feature the chef's tasting menu. Ask about seasonal ingredients.",
  },
  {
    id: "cv5",
    restaurantName: "Sakura Bistro",
    restaurantAddress: "120 East 6th St",
    restaurantCity: "Austin, TX 78701",
    contactPerson: "Ken Tanaka",
    date: "2026-02-02",
    time: "1:00 PM",
    status: "Completed",
    deliverables: ["1 Reel", "2 Photos"],
    instructions: "Weekend brunch special coverage.",
  },
];

export type SubmissionStatus = "Submitted" | "Approved" | "Needs Revision";

export interface ContentSubmission {
  id: string;
  visitId: string;
  platform: "Instagram" | "TikTok";
  postUrl: string;
  notes: string;
  status: SubmissionStatus;
  submittedAt: string;
}

export const contentSubmissions: ContentSubmission[] = [
  {
    id: "cs1",
    visitId: "cv4",
    platform: "Instagram",
    postUrl: "https://instagram.com/p/mia-olivegarden-reel1",
    notes: "Reel featuring the tasting menu with chef interview.",
    status: "Approved",
    submittedAt: "2026-01-20",
  },
  {
    id: "cs2",
    visitId: "cv4",
    platform: "Instagram",
    postUrl: "https://instagram.com/p/mia-olivegarden-story1",
    notes: "Story set covering the full tasting experience.",
    status: "Approved",
    submittedAt: "2026-01-20",
  },
  {
    id: "cs3",
    visitId: "cv5",
    platform: "Instagram",
    postUrl: "https://instagram.com/p/mia-sakura-reel1",
    notes: "Brunch reel with sushi prep footage.",
    status: "Submitted",
    submittedAt: "2026-02-04",
  },
  {
    id: "cs4",
    visitId: "cv5",
    platform: "TikTok",
    postUrl: "https://tiktok.com/@miaeatsatx/video/sakura-brunch",
    notes: "",
    status: "Needs Revision",
    submittedAt: "2026-02-05",
  },
];

export interface ConversationMessage {
  id: string;
  senderId: "creator" | "restaurant";
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  restaurantName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ConversationMessage[];
}

export const conversations: Conversation[] = [
  {
    id: "conv1",
    restaurantName: "The Olive Garden Kitchen",
    lastMessage: "Looking forward to the visit on the 25th!",
    lastMessageTime: "2026-02-20 10:30 AM",
    unreadCount: 1,
    messages: [
      { id: "m1", senderId: "restaurant", senderName: "Sarah Mitchell", text: "Hi Mia! Just confirming your visit on Feb 25th at 6 PM. We've reserved a window table for the shoot.", timestamp: "2026-02-18 09:00 AM", read: true },
      { id: "m2", senderId: "creator", senderName: "Mia Rodriguez", text: "Perfect, thank you Sarah! I'll arrive around 5:30 to set up. Is there parking nearby?", timestamp: "2026-02-18 09:15 AM", read: true },
      { id: "m3", senderId: "restaurant", senderName: "Sarah Mitchell", text: "Yes, there's free parking behind the building. I'll send you the exact spot details the day before.", timestamp: "2026-02-18 09:20 AM", read: true },
      { id: "m4", senderId: "restaurant", senderName: "Sarah Mitchell", text: "Looking forward to the visit on the 25th!", timestamp: "2026-02-20 10:30 AM", read: false },
    ],
  },
  {
    id: "conv2",
    restaurantName: "Sakura Bistro",
    lastMessage: "The brunch reel needs a small edit — can you add the restaurant tag?",
    lastMessageTime: "2026-02-06 02:15 PM",
    unreadCount: 0,
    messages: [
      { id: "m5", senderId: "restaurant", senderName: "Ken Tanaka", text: "Hi Mia, great working with you last week! The content looks amazing.", timestamp: "2026-02-04 11:00 AM", read: true },
      { id: "m6", senderId: "creator", senderName: "Mia Rodriguez", text: "Thanks Ken! I've submitted the reel and TikTok. Let me know if any edits are needed.", timestamp: "2026-02-04 11:30 AM", read: true },
      { id: "m7", senderId: "restaurant", senderName: "Ken Tanaka", text: "The brunch reel needs a small edit — can you add the restaurant tag?", timestamp: "2026-02-06 02:15 PM", read: true },
      { id: "m8", senderId: "creator", senderName: "Mia Rodriguez", text: "Done! Updated and resubmitted.", timestamp: "2026-02-06 03:00 PM", read: true },
    ],
  },
];

export const creatorStats = {
  totalVisitsCompleted: 2,
  postsSubmitted: 4,
  pendingSubmissions: 1,
};

export const creatorActivity = [
  { id: "ca1", text: "Visit confirmed at The Olive Garden Kitchen", time: "2 hours ago", type: "visit" as const },
  { id: "ca2", text: "Content approved: Sakura Bistro brunch reel", time: "1 day ago", type: "content" as const },
  { id: "ca3", text: "New message from Sarah Mitchell", time: "1 day ago", type: "message" as const },
  { id: "ca4", text: "Content submitted for Sakura Bistro visit", time: "3 days ago", type: "content" as const },
  { id: "ca5", text: "Visit completed at Sakura Bistro", time: "2 weeks ago", type: "visit" as const },
];

export const creatorFaqItems = [
  {
    question: "How do I submit content after a visit?",
    answer: "Go to the Submit Content page, find your completed visit, and add your post links with the platform and any notes. You can submit multiple posts per visit.",
  },
  {
    question: "What deliverables are expected per visit?",
    answer: "Deliverables vary by restaurant and are listed on each visit card. Common requirements include 1 Reel, 2-4 Story Frames, and sometimes TikTok videos or photos.",
  },
  {
    question: "When do I get paid?",
    answer: "Payments are processed monthly for all approved content from the previous month. You'll receive payment by the 15th of the following month.",
  },
  {
    question: "What if I need to reschedule a visit?",
    answer: "Contact the restaurant through the Messages page or reach out to our support team. We'll work to find a new date that works for everyone.",
  },
  {
    question: "Can I bring my own equipment?",
    answer: "Absolutely! You're encouraged to bring your own camera, lighting, and any other equipment. Just make sure to coordinate with the restaurant contact for setup space.",
  },
];

export const creatorSupportTickets = [
  { id: "CTKT-001", subject: "Payment inquiry for January", date: "Feb 10, 2026", status: "Open" as const },
  { id: "CTKT-002", subject: "Visit rescheduling request", date: "Jan 28, 2026", status: "Closed" as const },
];
