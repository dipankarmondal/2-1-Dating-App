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

import CameraIcon from '@svgs/camera.svg'
import VideoIcon from '@svgs/appicon/live.svg'
import DubbleCheckIcon from '@svgs/dubble_check.svg'
import LikeThumbIcon from '@svgs/like.svg'
import { ms } from '../../utils/helpers/responsive'

export const menuItems = (Navigation) => [
    {
        id: "settings",
        label: "Profile",
        Icon: UserIcon,
        size: 16,
        onPress: () => Navigation.navigate("ProfileScreen"),
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

export const ViewMeOptions = [
    { key: "viewedMe", value: "Viewed Me" },
    { key: "viewedEachOther", value: "Viewed Each Other" },
    { key: "whoIViewed", value: "Who I viewed" },
    { key: "remembered", value: "Remembered" },
    { key: "latest", value: "Latest" },
    { key: "distance", value: "Distance" },
    { key: "all", value: "All" },
    { key: "couplesAndFemales", value: "Couples & Females" },
    { key: "couples", value: "Couples" },
    { key: "female", value: "Female" },
    { key: "male", value: "Male" },
    { key: "transgender", value: "Transgender" },
    { key: "business", value: "Business" }
];

export const HeaderBtn = [
    { key: "feed", title: "Feed" },
    { key: "notification", title: "Notification" },
]

export const getProfileActions = (item: any) => [
    { id: 1, icon: CameraIcon, size: ms(17), count: item?.profile?.photos?.length || 0 },
    { id: 2, icon: VideoIcon, size: ms(17), count: item?.profile?.videos?.length || 0 },
    { id: 3, icon: DubbleCheckIcon, size: ms(20), count: item?.profile?.checks || 0 },
    { id: 4, icon: LikeThumbIcon, size: ms(18), count: item?.profile?.likes || 0 },
];

export const benefitsData = [
    {
        title: "Benefits of the website:",
        items: [
            { id: 1, text: "See all adult content" },
            {
                id: 2,
                text: "Additional features such as Videos, Contest, Groups, Chatrooms, Live and Popularity wall",
            },
            { id: 3, text: "Lifetime membership available" },
        ],
    },
    {
        title: "Benefits of the app:",
        items: [
            { id: 1, text: "Push notification when you receive a new message" },
            { id: 2, text: "Easy way to make Video calls" },
            { id: 3, text: "Connected 24/7" },
        ],
    },
];

export const NotificationData = [
    {
        id: 1,
        title: "Lifetime Special",
        text: "Within the next 3 days your account is up for renewal. As a special thank you, we would like to offer you the opportunity to become a lifetime member of 2+1 for only $270. Lifetime memberships can normally only be purchased in the month of December so take this offer by selecting MEMBERSHIP in the menu and upgrade your membership to lifetime now. We hope you enjoy our site and are having fun.",
        read: false,
    },
    {
        id: 2,
        title: "Parties & Events",
        text: "Dear Member, We noticed you were a guest for the Swinging Atlanta New Years Complete Hotel Takeover party and hope you had a great time. Please give us your opinion and post a party review here. Thank you for your time. Your 2+1 Team.",
        read: true,
    },
    {
        id: 3,
        title: "Pictures",
        text: "Your picture(s) have been approved and added to your profile!",
        read: false,
    },
    {
        id: 4,
        title: "New Message",
        text: "You’ve received a new private message from another member. Tap here to open your inbox and reply.",
        read: true,
    },
    {
        id: 5,
        title: "Security Alert",
        text: "We detected a login from a new device. If this was you, no action is needed. Otherwise, please reset your password immediately.",
        read: false,
    },
    {
        id: 6,
        title: "Profile Update",
        text: "Your profile information was successfully updated. Keep it fresh to get noticed more often!",
        read: true,
    },
    {
        id: 7,
        title: "Membership Reminder",
        text: "Your premium membership will expire in 7 days. Renew now to keep enjoying uninterrupted access.",
        read: false,
    },
    {
        id: 8,
        title: "System Update",
        text: "We’ve made some improvements to the app experience. Update to the latest version for the best performance.",
        read: true,
    }
]

export const ProfileMenuItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'edit', label: 'Edit' },
    { key: 'pictures', label: 'Pictures' },
    { key: 'videos', label: 'Videos' },
    { key: 'album', label: 'Album' },
];
export const ProfileExtraMenuItems = [
    { key: 'certifications', label: 'Certifications' },
    { key: 'groups', label: 'Groups' },
    { key: 'parties_events', label: 'Parties & Events' },
    { key: 'following', label: 'Following' },
    { key: 'friends', label: 'Friends' },
];
