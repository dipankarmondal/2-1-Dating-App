import UserIcon from '@svgs/setting/user.svg'
import LocationIcon from '@svgs/setting/location.svg'
import StarIcon from '@svgs/drawericon/star.svg'
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
import GroupIcon from '@svgs/group.svg'
import PlayIcon from '@svgs/play.svg'
import SubscriptionIcon from '@svgs/subscription.svg'

import { ms } from '../../utils/helpers/responsive'

export const menuItems = (Navigation: any) => [
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
        onPress: () => Navigation.navigate("AccountScreen"),
    },
    {
        id: "subscription",
        label: "Subscription",
        Icon: SubscriptionIcon,
        size: 20,
        onPress: () => Navigation.navigate("SubscriptionScreen"),
    },
    {
        id: "location",
        label: "Location",
        Icon: LocationIcon,
        size: 18,
        onPress: () => Navigation.navigate("LocationScreen"),
    },
    {
        id: "Frineds",
        label: "Friends",
        Icon: FrinedsIcon,
        size: 17,
        onPress: () => Navigation.navigate("FriendsScreen"),
    },
    {
        id: "InviteFrineds",
        label: "Invite Frineds",
        Icon: InviteIcon,
        size: 16,
        onPress: () => Navigation.navigate("InviteFriendsScreen"),
    },
    {
        id: "Views",
        label: "Who i viewed",
        Icon: ViewsIcon,
        size: 15,
        onPress: () => Navigation.navigate("ViewScreen"),
    },
    {
        id: "Likes/Dislikes",
        label: "Likes/Dislikes",
        Icon: LikeIcon,
        size: 16,
        onPress: () => Navigation.navigate("LikeAndDislikeScreen"),
    },
    {
        id: "Block",
        label: "Block List",
        Icon: BlockIcon,
        size: 17,
        onPress: () => Navigation.navigate("BlockListScreen"),
    },
    // {
    //     id: "Note",
    //     label: "Notes",
    //     Icon: NoteIcon,
    //     size: 15,
    //     onPress: () => Navigation.navigate("NoteScreen"),
    // },
    {
        id: "Time",
        label: "Remembered",
        Icon: TimeIcon,
        size: 15,
        onPress: () => Navigation.navigate("RememberedScreen"),
    },
    {
        id: "Privacy",
        label: "Privacy",
        Icon: LockIcon,
        size: 16,
        onPress: () => Navigation.navigate("PrivacyScreen"),
    },
    // {
    //     id: "Notification",
    //     label: "Notification",
    //     Icon: NotificationIcon,
    //     size: 15,
    //     onPress: () => console.log("Notification clicked"),
    // },
    // {
    //     id: "Membership",
    //     label: "Member Service",
    //     Icon: MembershipIcon,
    //     size: 16,
    //     onPress: () => console.log("Member Service clicked"),
    // },
    // {
    //     id: "Bug",
    //     label: "Bug Report",
    //     Icon: BugIcon,
    //     size: 14,
    //     onPress: () => Navigation.navigate("BugReportScreen"),
    // },
    // {
    //     id: "Hide",
    //     label: "Hide Profile",
    //     Icon: HideIcon,
    //     size: 15,
    //     onPress: () => Navigation.navigate("HideProfileScreen"),
    // },
    // {
    //     id: "Call",
    //     label: "Contact & Help",
    //     Icon: CallIcon,
    //     size: 15,
    //     onPress: () => Navigation.navigate("ContactAndHelpScreen"),
    // },
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
export const DateTypeOptions = [
    { key: "private", value: "Private Chatroom" },
    { key: "public", value: "Public Chatroom" },
    { key: "virtual", value: "Secret Chatroom" },
];
export const BlockUserOptions = [
    { key: "yes", value: "Yes" },
    { key: "no", value: "No" },
];
export const GoliveOptions = [
    { key: "now", value: "ChatNow" },
    { key: "later", value: "Chat later" },
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
export const OnlineOptions = [
    { key: "latest", value: "Latest" },
    { key: "business", value: "Business" },
    { key: "transgender", value: "Transgender" },
    { key: "looking", value: "Looking for me / us" },
];
export const VideoOptions = [
    { key: "latest", value: "Latest" },
    { key: "distance", value: "Distance" },
    { key: "most_viewed", value: "Most Viewed" },
    { key: "male", value: "Male" },
    { key: "business", value: "Business" },
    { key: "transgender", value: "Transgender" },
    { key: "friends", value: "Friends" },
    { key: "past_live_streams", value: "Past Live Streams" },
];
export const TravelOptions = [
    { key: 'likes_given', value: 'Likes given' },
    { key: 'joined_group', value: 'Joined group' },
    { key: 'photos_videos', value: 'Photos & Videos' },
    { key: 'validations', value: 'Validations' },
    { key: 'speed_date', value: 'Speed Date' },
    { key: 'travel_plans', value: 'Travel Plans' },
    { key: 'parties_events', value: 'Parties & Events' },
    { key: 'member_services', value: 'Member Services' },
    { key: 'new_friends_followers', value: 'New Friends / Followers' },
];
export const ChatroomFilterOptions = [
    { key: 'public', value: 'Public' },
    { key: 'private', value: 'Private' },
    { key: 'secret', value: 'Secret' },
];
export const HeaderBtn = [
    { key: "feed", title: "Feed" },
    { key: "notification", title: "2+1 Notification" },
]
export const getProfileActions = (item: any) => [
    { id: 1, icon: CameraIcon, size: ms(17), count: item?.profile?.photos?.length || 0 },
    { id: 2, icon: VideoIcon, size: ms(17), count: item?.profile?.videos?.length || 0 },
    { id: 3, icon: DubbleCheckIcon, size: ms(20), count: item?.profile?.checks || 0 },
    { id: 4, icon: LikeThumbIcon, size: ms(18), count: item?.profile?.likes || 0 },
];
export const WellfameActions = [
    { id: 1, icon: CameraIcon, size: ms(13), count: 0 },
    { id: 2, icon: GroupIcon, size: ms(12), count: 0 },
    { id: 4, icon: StarIcon, size: ms(14), count: 0 },
    { id: 3, icon: LikeIcon, size: ms(13), count: 0 },
    { id: 5, icon: ViewsIcon, size: ms(17), count: 0 },
];
export const NewMemberActions = (data: any) => [
    { id: 1, icon: CameraIcon, size: ms(13), count: data?.profile?.photos?.length ?? 0 },
    { id: 2, icon: LikeThumbIcon, size: ms(17), count: 0 },
    { id: 4, icon: UserIcon, size: ms(14), count: data?.friends?.length ?? 0 },
    { id: 3, icon: PlayIcon, size: ms(13), count: 0 },
];

export const TABS = [
    { key: "all_friends", label: "Friends" },
    { key: "friends_request", label: "Friend request" },
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
export const ProfileExtraMenuItems= (count: any) => [
    { key: 'groups', label: 'Groups', number: count?.groups ?? 0 },
    { key: 'friends', label: 'Friends', number: count?.friends ?? 0 },
];
export const ProfileUserMenuItems= (count: any) => [
    // { key: 'certifications', label: 'Certifications' },
    { key: 'groups', label: 'Groups', number: count?.groups ?? 0 },
    // { key: 'parties_and_events', label: 'Parties & Events' },
    // { key: 'following', label: 'Following' },
    { key: 'friends', label: 'Friends', number: count?.friends ?? 0 },
];
export const SingleGroupMenuItems=(count: any) => [
    { key: 'members', label: 'Members',number: count ?? 0 },
    // { key: 'forum', label: 'Forum' },
    // { key: 'visuals', label: 'Visuals' },
]; 
export const MessengerItems = [
    { key: 'messenger', label: 'Messenger' },
    { key: 'group_messenger', label: 'Group Messenger' },
];

export const FeedTabs = [
    // { key: 'global_feeds', label: 'Global Feeds' },
    { key: 'your_feeds', label: 'Your Feeds' },
    { key: 'notifications', label: 'Notifications' },
];
export const CgatRoomTabs = [
    { key: 'all_public_room', label: 'All Chatroom' },
    { key: 'my_chatroom', label: 'My Chatroom' },
];
export const WallofFameItems = [
    { key: 'most_photos', label: 'Most Photos' },
    { key: 'most_videos', label: 'Most Videos' },
    { key: 'most_friends', label: 'Most Friends' },
    { key: 'most_liked', label: 'Most Liked' },
    { key: 'most_validations', label: 'Most Validations' },
    { key: 'most_viewed', label: 'Most Viewed' },
    { key: 'most_contest_articipation', label: 'Most Pontest Participation' },
];
export const CategoryOptions = [
    { key: 'social', value: 'Social' },
    { key: 'dating', value: 'Dating' },
    { key: 'events', value: 'Events' },
    { key: 'business', value: 'Business' },
    { key: 'lifestyle', value: 'Lifestyle' },
    { key: 'hobbies', value: 'Hobbies' },
    { key: 'other', value: 'Other' },
];
export const GroupTypeOptions = [
    { key: 'open', value: 'Open Group' },
    { key: 'closed', value: 'Closed Group' },
    { key: 'private', value: 'Private Group' },
];
export const GroupForOptions = [
    { key: 'couples', value: 'Couples' },
    { key: 'females', value: 'Females' },
    { key: 'males', value: 'Males' },
    { key: 'transgender', value: 'Transgender' },
    { key: 'business', value: 'Business' }
]
export const NewMemberForOptions = [
    { key: 'couple', value: 'Couple' },
    { key: 'female', value: 'Female' },
    { key: 'male', value: 'Male' },
    // { key: 'transgender', value: 'Transgender' },
]
export const Categories = [
    {
        id: 1,
        btnsData: [
            "Couples Only", "Threesome", "Full Swap", "Gays", "Lesbian", "Exhibitionist", "Nudism", "Public Sex", "Group Sex", "Masturbation", "Dildo & Toys",
        ],
    },
    {
        id: 2,
        btnsData: [
            "Transgender", "BDSM", "Voyeur", "Gang bang", "Wife swap", "Hot wifing", "Interracial", "Beach Sex", "Anal Sex", "Girl on Girl"
        ],
    },
    {
        id: 3,
        btnsData: [
            "Bi Couple", "BBC", "Bare fun", "Body Tattoo", "BBW Hot Wives", "Flashing", "cougars and vixens", "Erotic Massage", "Tantra",
        ],
    }
]
export const features = [
    {
        category: "Connections",
        items: [
            "Unlimited messaging",
            "Member verification",
            "Send friend requests",
            "Broadcast to connections"
        ]
    },
    {
        category: "Media",
        items: [
            "View full profiles",
            "Live video streaming",
            "Unlimited media uploads",
            "Private media sharing"
        ]
    },
    {
        category: "Events",
        items: [
            "Create private events",
            "Manage guest lists",
            "Partner venue discounts",
            "VIP event access"
        ]
    },
    {
        category: "Community",
        items: [
            "Group creation",
            "Forum participation",
            "Member services",
            "Featured profile placement"
        ]
    }
];
export const restrictions = [
    { id: 1, text: "Limited to 10 messages per day" },
    { id: 2, text: "Can only receive friend requests" },
    { id: 3, text: "View limited profile information" },
    { id: 4, text: "No access to private media" },
    { id: 5, text: "Cannot create events or groups" },
    { id: 6, text: "Read-only forum access" },
    { id: 7, text: "No VIP event access" },
];
export const Distance = [
    { key: 'mi', value: 'MI' },
    { key: 'kms', value: 'KMS' },
]
export const friendsfilterOptions = [
    { key: "accepted", value: "Accepted" },
    { key: "pending", value: "Pending" },
    { key: "declined", value: "Declined" },
    { key: "latest", value: "Latest" },
    { key: "distance", value: "Distance" },
    { key: "all", value: "All" },
    { key: "couples_females", value: "Couples & Females" },
    { key: "couples", value: "Couples" },
    { key: "females", value: "Females" },
    { key: "males", value: "Males" },
    { key: "transgender", value: "Transgender" },
];