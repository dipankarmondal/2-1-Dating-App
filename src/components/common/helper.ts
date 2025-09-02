import UserIcon from '@svgs/setting/user.svg'
import LocationIcon from '@svgs/setting/location.svg'
import AccountIcon from '@svgs/setting/account.svg'
import BlockIcon from '@svgs/setting/block.svg'
import BugIcon from '@svgs/setting/bug.svg'
import FrinedsIcon from '@svgs/setting/friends.svg'
import InviteIcon from '@svgs/setting/invite.svg'
import LikeIcon from '@svgs/setting/like.svg'
import LockIcon from '@svgs/setting/lock.svg'
import MembershipIcon from '@svgs/setting/membership.svg'
import NoteIcon from '@svgs/setting/note.svg'
import TimeIcon from '@svgs/setting/time.svg'
import ViewsIcon from '@svgs/setting/views.svg'
import HideIcon from '@svgs/setting/eye-crossed.svg'
import NotificationIcon from '@svgs/notification.svg'
import CallIcon from '@svgs/setting/call.svg'

export const menuItems = [
    {
        id: "settings",
        label: "Profile",
        Icon: UserIcon,
        size: 16,
        onPress: () => console.log("⚙️ Settings clicked"),
    },
    {
        id: "account",
        label: "Account",
        Icon: AccountIcon,
        size: 16,
        onPress: () => console.log("👤 Account clicked"),
    },
    {
        id: "location",
        label: "Location",
        Icon: LocationIcon,
        size: 18,
        onPress: () => console.log("📍 Location clicked"),
    },
    {
        id: "Frineds",
        label: "Frineds",
        Icon: FrinedsIcon,
        size: 17,
        onPress: () => console.log("Frineds clicked"),
    },
    {
        id: "InviteFrineds",
        label: "Invite Frineds",
        Icon: InviteIcon,
        size: 16,
        onPress: () => console.log("Invite Frineds clicked"),
    },
    {
        id: "Views",
        label: "Views",
        Icon: ViewsIcon,
        size: 15,
        onPress: () => console.log("Views clicked"),
    },
    {
        id: "Likes/Dislikes",
        label: "Likes/Dislikes",
        Icon: LikeIcon,
        size: 16,
        onPress: () => console.log("Likes/Dislikes clicked"),
    },
    {
        id: "Block",
        label: "Block List",
        Icon: BlockIcon,
        size: 17,
        onPress: () => console.log("👥 Blocklist clicked"),
    },
    {
        id: "Note",
        label: "Notes",
        Icon: NoteIcon,
        size: 15,
        onPress: () => console.log("Notes clicked"),
    },
    {
        id: "Time",
        label: "Remembered",
        Icon: TimeIcon,
        size: 15,
        onPress: () => console.log("Time clicked"),
    },
    {
        id: "Privacy",
        label: "Privacy",
        Icon: LockIcon,
        size: 16,
        onPress: () => console.log("Privacy clicked"),
    },
    {
        id: "Notification",
        label: "Notification",
        Icon: NotificationIcon,
        size: 15,
        onPress: () => console.log("Notification clicked"),
    },
    {
        id: "Membership",
        label: "Member Service",
        Icon: MembershipIcon,
        size: 16,
        onPress: () => console.log("Member Service clicked"),
    },
    {
        id: "Bug",
        label: "Bug Report",
        Icon: BugIcon,
        size: 14,
        onPress: () => console.log("bug clicked"),
    },
    {
        id: "Hide",
        label: "Hide Profile",
        Icon: HideIcon,
        size: 15,
        onPress: () => console.log("Hide clicked"),
    },
    {
        id: "Call",
        label: "Contact & Help",
        Icon: CallIcon,
        size: 15,
        onPress: () => console.log("Notification clicked"),
    },
];