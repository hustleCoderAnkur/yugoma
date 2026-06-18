import {
    Mail,
    CalendarDays,
    Bell,
    BarChart3,
    Reply,
    Repeat2,
    Settings,
    MessageSquare,
    Inbox,
    
} from "lucide-react";

export const COMMANDS = [
    "Send an email to Rahul",
    "Reply to the latest client email",
    "Schedule tomorrow's meeting",
    "Summarize unread emails",
    "Set a reminder for 7 PM",
    "Check my availability next week",
    "Draft a professional response",
    "Create a calendar event",
    "Follow up on pending conversations",
];

export const FEATURES = [
    {
        icon: Mail,
        title: "Send Emails",
        desc: "Compose and send emails instantly.",
    },
    {
        icon: Reply,
        title: "Reply to Emails",
        desc: "Generate context-aware responses.",
    },
    {
        icon: CalendarDays,
        title: "Calendar Scheduling",
        desc: "Create and manage meetings automatically.",
    },
    {
        icon: Bell,
        title: "Smart Reminders",
        desc: "Never miss important events.",
    },
    {
        icon: BarChart3,
        title: "Daily Summary",
        desc: "Get AI-generated productivity reports.",
    },
    {
        icon: Repeat2,
        title: "Follow-Ups",
        desc: "Automatically track pending conversations.",
    },
];

export const STEPS = [
    {
        n: "01",
        title: "Tell Yugoma",
        desc: "Speak naturally.",
    },
    {
        n: "02",
        title: "Yugoma Understands",
        desc: "AI understands context and intent.",
    },
    {
        n: "03",
        title: "Work Gets Done",
        desc: "Emails sent. Meetings scheduled. Tasks completed.",
    },
];

export const INTEGRATIONS = [
    {
        icon: Mail,
        name: "Gmail",
    },
    {
        icon: CalendarDays,
        name: "Google Calendar",
    },

];

export const SIDEBAR = [
    {
        icon: MessageSquare,
        label: "Chat",
        active: true,
    },
    {
        icon: Inbox,
        label: "Emails",
    },
    {
        icon: CalendarDays,
        label: "Calendar",
    },
    {
        icon: Bell,
        label: "Reminders",
    },
    {
        icon: Settings,
        label: "Settings",
    },
];

export const PROGRESS_STEPS = [
    "Checking availability",
    "Creating calendar event",
    "Sending invitations",
    "Reminder added",
];