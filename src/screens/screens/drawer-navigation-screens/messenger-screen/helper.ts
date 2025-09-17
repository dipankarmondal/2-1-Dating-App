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

export const chats = [
    { id: 1, name: "John Doe", message: "Hi, how are you?", image: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "Jane Smith", message: "Let’s meet tomorrow at 5pm!", image: "https://i.pravatar.cc/100?img=2" },
    { id: 3, name: "Michael Lee", message: "Did you check the new design?", image: "https://i.pravatar.cc/100?img=3" },
    { id: 4, name: "Emily Johnson", message: "I’ll send you the documents soon.", image: "https://i.pravatar.cc/100?img=4" },
    { id: 5, name: "Chris Evans", message: "Great work on the project!", image: "https://i.pravatar.cc/100?img=5" },
    { id: 6, name: "Sophia Brown", message: "Let’s catch up over coffee ☕", image: "https://i.pravatar.cc/100?img=6" },
    { id: 7, name: "David Wilson", message: "Can you review my code?", image: "https://i.pravatar.cc/100?img=7" },
    { id: 8, name: "Olivia Taylor", message: "I booked the tickets already 🎫", image: "https://i.pravatar.cc/100?img=8" },
    { id: 9, name: "Daniel Martin", message: "Don’t forget the meeting at 3pm.", image: "https://i.pravatar.cc/100?img=9" },
    { id: 10, name: "Ava Thompson", message: "Thanks for your help yesterday 🙌", image: "https://i.pravatar.cc/100?img=10" },
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
