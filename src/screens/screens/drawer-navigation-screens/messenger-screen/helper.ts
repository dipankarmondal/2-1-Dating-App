import DeleteIcon from '@svgs/delete.svg'
import ViewIcon from '@svgs/setting/views.svg'

export const createModalBtn = (handlers: Record<string, () => void>) => [
    {
        name: "Pin",
        onPress: handlers["Pin"],
    },
    {
        name: "Unread",
        onPress: handlers["Unread"],
    },
    {
        name: "Mute",
        onPress: handlers["Mute"],
    },
    {
        name: "Archive",
        onPress: handlers["Archive"],
    },
    {
        name: "Move to Folder",
        onPress: handlers["Move to Folder"],
    },
    {
        name: "View Profile",
        onPress: handlers["View Profile"],
    },
    {
        name: "Delete Chat",
        onPress: handlers["Delete Chat"],
        type: "error"
    },
    {
        name: "Block",
        onPress: handlers["Block"],
        type: "error"
    },
    {
        name: "Report",
        onPress: handlers["Report"],
        type: "error"
    },
]

export const optionsData = [
    { id: "1", label: "Latest" },
    { id: "2", label: "Online" },
    { id: "3", label: "Unread" },
    { id: "4", label: "Sent" },
    { id: "5", label: "Archive" },
];

export const groupMessages = [
    {
        id: 1,
        name: "Project Team Alpha",
        message: "Let’s finalize the presentation slides today.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", // office team working
    },
    {
        id: 2,
        name: "Weekend Travelers",
        message: "Who’s excited for the trip this Saturday? 🏞️",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", // friends outdoors
    },
    {
        id: 3,
        name: "Study Buddies",
        message: "Don’t forget, we have a group study at 5 PM.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", // students together
    },
    {
        id: 4,
        name: "Startup Founders",
        message: "Let’s schedule a call with the investors tomorrow.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", // group meeting
    },
    {
        id: 5,
        name: "Family Group",
        message: "Dinner at grandma’s house this Sunday 🍲",
        image: "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", // family smiling
    },
    {
        id: 6,
        name: "Gamers Hub",
        message: "Who’s up for an online match tonight? 🎮",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80", // group with laptops
    },
];
