/**Local imports*/
import { ms } from "../../utils/helpers/responsive";

/**Icons*/
import HomeIcon from '@svgs/home.svg';
import MessagesIcon from '@svgs/messages.svg';
import ViewMoreIcon from '@svgs/setting/views.svg';
import OnlineIcon from '@svgs/appicon/user_online.svg';
import LiveIcon from '@svgs/appicon/live.svg';
import FireIcon from '@svgs/drawericon/fire.svg';
import ChatroomIcon from '@svgs/drawericon/chatroom.svg';

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
]