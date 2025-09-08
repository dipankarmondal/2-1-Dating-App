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

import TvIcon from '@svgs/tv.svg'
import VideoIcon from '@svgs/appicon/live.svg'
import DubbleCheckIcon from '@svgs/dubble_check.svg'
import LikeThumbIcon from '@svgs/like.svg'
import { ms } from '../../utils/helpers/responsive'

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

export const ModeOptions = [
    { key: "couple", value: "Couple" },
    { key: "female", value: "Female" },
    { key: "male", value: "Male" },
    { key: "trans", value: "Trans" },
];

export const SexualityOptions = [
    { key: "straight", value: "Straight" },
    { key: "bi_sexual", value: "Bi-sexual" },
    { key: "bi_curious", value: "Bi-curious" },
    { key: "gay", value: "Gay" },
    { key: "pansexual", value: "Pansexual" },
];

export const ChooseInterst = [
    { key: "couple", value: "Couple", image: require('@images/couple.png') },
    { key: "female", value: "Female", image: require('@images/woman.png') },
    { key: "male", value: "Male", image: require('@images/man.png') },
    { key: "transgender", value: "Transgender", image: require('@images/transgender.png') },
];

export const AlreadyMemberOptions = [
    { key: true, value: "Yes, I’m already a member" },
    { key: false, value: "No, I’m not a member yet" },
];

export const PromotionOptions = [
    { key: false, value: "Promote events / parties" },
    { key: false, value: "Build an audience / community" },
    { key: false, value: "Promote your club" },
    { key: false, value: "Promote your BNB / Hotel / Resort" },
    { key: false, value: "Sell a product / service" },
    { key: false, value: "Interest in paid advertising" },
];

export const ReferalOptions = [
    { key: "Friend / Word of Mouth", value: "Friend / Word of Mouth" },
    { key: "Social Media (Facebook, Instagram, etc.)", value: "Social Media (Facebook, Instagram, etc.)" },
    { key: "Google Search", value: "Google Search" },
    { key: "Event / Conference", value: "Event / Conference" },
    { key: "Advertisement", value: "Advertisement" },
    { key: "Other", value: "Other" }
];

export const GeneralItems = [
    { key: "viewed_me", value: "Viewed me" },
    { key: "groups_blogs", value: "Groups / Blogs" },
    { key: "speed_date", value: "Speed Date" },
    { key: "travel_plans", value: "Travel Plans" },
    { key: "parties_events", value: "Parties & Events" },
];

export const FrindItems = [
    { key: "likes_given", value: "Likes given" },
    { key: "joined_group", value: "Joined group" },
    { key: "photos_videos", value: "Photos & Videos" },
    { key: "validations", value: "Validations" },
    { key: "speed_date", value: "Speed Date" },
    { key: "travel_plans", value: "Travel Plans" },
    { key: "parties_events", value: "Parties & Events" },
    { key: "member_services", value: "Member Services" },
    { key: "new_friends_followers", value: "New Friends / Followers" }
];

export const HeaderBtn = [
    { key: "feed", title: "Feed" },
    { key: "notification", title: "Notification" },
]

export const profileActions = [
    { id: 1, icon: TvIcon, size: ms(17), count: 56 },
    { id: 2, icon: VideoIcon, size: ms(17), count: 56 },
    { id: 3, icon: DubbleCheckIcon, size: ms(20), count: 56 },
    { id: 4, icon: LikeThumbIcon, size: ms(18), count: 56 },
];