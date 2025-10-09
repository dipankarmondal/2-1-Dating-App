/**Local imports*/
import { ms } from "../../utils/helpers/responsive";

/**Icons*/
import HomeIcon from '@svgs/home.svg';
import MessagesIcon from '@svgs/messages.svg';
import ViewMoreIcon from '@svgs/setting/views.svg';
import OnlineIcon from '@svgs/appicon/user_online.svg';
import LiveIcon from '@svgs/live_video.svg';
import FireIcon from '@svgs/drawericon/fire.svg';
import VideoIcon from '@svgs/appicon/live.svg';
import ChatroomIcon from '@svgs/drawericon/chatroom.svg';
import InviteIcon from '@svgs/setting/invite.svg';
import EventIcon from '@svgs/events.svg';
import GroupIcon from '@svgs/group.svg';
import MembershipIcon from '@svgs/drawericon/membership.svg';
import CertificationIcon from '@svgs/drawericon/certification.svg';
import TravelIcon from '@svgs/drawericon/travel.svg';
import StarIcon from '@svgs/drawericon/star.svg';
import ContestsIcon from '@svgs/drawericon/contests.svg';
import VacationsIcon from '@svgs/drawericon/vacations.svg';
import ArcheryIcon from '@svgs/drawericon/archery .svg';

/**Local imports*/
import { DrawerScreenType } from "../../utils/types/types";

/**Screens */
import MessengerScreen from "../../screens/screens/drawer-navigation-screens/messenger-screen";
import FeedScreen from "../../screens/screens/drawer-navigation-screens/feed-screen";
import ViewMeScreen from "../../screens/screens/drawer-navigation-screens/view-me-screen";
import OnlineNowScreen from "../../screens/screens/drawer-navigation-screens/online-now-screen";
import HotDateScreen from "../../screens/screens/drawer-navigation-screens/hot-date-screen";
import ChatroomScreen from "../../screens/screens/drawer-navigation-screens/chatroom-screen";
import LivestreamScreen from "../../screens/screens/drawer-navigation-screens/livestream-screen";
import NewMemberScreen from "../../screens/screens/drawer-navigation-screens/new-member-screen";
import PartiesEventsScreen from "../../screens/screens/drawer-navigation-screens/parties_events_screen";
import VideoScreen from "../../screens/screens/drawer-navigation-screens/videos-screen";
import TravelDateScreen from "../../screens/screens/drawer-navigation-screens/travel-date-screen";
import CertificationsScreen from "../../screens/screens/drawer-navigation-screens/certifications-screen";
import WallOfFameScreen from "../../screens/screens/drawer-navigation-screens/wall-of-fame-screen";
import GroupsScreen from "../../screens/screens/drawer-navigation-screens/groups-screen";
import FeaturedMembersScreen from "../../screens/screens/drawer-navigation-screens/featured-members-screen";
import ContestsScreen from "../../screens/screens/drawer-navigation-screens/contests-screen";
import AddVacationsRentalScreen from "../../screens/screens/drawer-navigation-screens/add-vacations-rental-screen";
import TwoPlusOneScreen from "../../screens/screens/drawer-navigation-screens/two-plus-one-screen";

export const DrawerScreens: DrawerScreenType[] = [
    {
        name: 'FeedScreen',
        component: FeedScreen,
        label: '2+1 Feed',
        Icon:HomeIcon,
        size: ms(20),
    },
    {
        name: 'MessengerScreen',
        component: MessengerScreen,
        label: 'Messages',
        Icon:MessagesIcon,
        size: ms(17),
    },
    {
        name: 'ViewMeScreen',
        component: ViewMeScreen,
        label: 'Viewed Me',
        Icon:ViewMoreIcon,
        size: ms(17),
    },
    {
        name: 'OnlineNowScreen',
        component: OnlineNowScreen,
        label: 'Online',
        Icon:OnlineIcon,
        size: ms(16),
    },
    {
        name: 'HotDateScreen',
        component: HotDateScreen,
        label: 'Hot Date',
        Icon:FireIcon,
        size: ms(16),
    },
    {
        name: 'ChatroomScreen',
        component: ChatroomScreen,
        label: 'Chatrooms',
        Icon:ChatroomIcon,
        size: ms(16),
    },
    {
        name: 'LivestreamScreen',
        component: LivestreamScreen,
        label: 'Live Stream',
        Icon:LiveIcon,
        size: ms(16),
    },
    {
        name: 'NewMemberScreen',
        component: NewMemberScreen,
        label: 'New Member',
        Icon:InviteIcon,
        size: ms(14),
    },
    {
        name: 'PartiesEventsScreen',
        component: PartiesEventsScreen,
        label: 'Parties and Events',
        Icon:EventIcon,
        size: ms(14),
    },
    {
        name: 'VideoScreen',
        component: VideoScreen,
        label: 'Videos',
        Icon:VideoIcon,
        size: ms(18),
    },
    {
        name: 'TravelDateScreen',
        component: TravelDateScreen,
        label: 'Travel Date',
        Icon:TravelIcon,
        size: ms(16),
    },
    {
        name: 'CertificationsScreen',
        component: CertificationsScreen,
        label: 'Certifications',
        Icon:CertificationIcon,
        size: ms(16),
    },
    {
        name: 'WallOfFameScreen',
        component: WallOfFameScreen,
        label: 'Wall Of Fame',
        Icon:StarIcon,
        size: ms(16),
    },
    {
        name: 'GroupsScreen',
        component: GroupsScreen,
        label: 'Groups',
        Icon:GroupIcon,
        size: ms(16),
    },
    {
        name: 'FeaturedMembersScreen',
        component: FeaturedMembersScreen,
        label: 'Featured Members',
        Icon:MembershipIcon,
        size: ms(17),
    },
    // {
    //     name: 'ContestsScreen',
    //     component: ContestsScreen,
    //     label: 'Contests',
    //     Icon:ContestsIcon,
    //     size: ms(16),
    // },
    // {
    //     name: 'AddVacationsRentalScreen',
    //     component: AddVacationsRentalScreen,
    //     label: 'Add Vacations Rental',
    //     Icon:VacationsIcon,
    //     size: ms(16),
    // },
    {
        name: 'TwoPlusOneScreen',
        component: TwoPlusOneScreen,
        label: '2+1',
        Icon:ArcheryIcon,
        size: ms(16),
    },
]