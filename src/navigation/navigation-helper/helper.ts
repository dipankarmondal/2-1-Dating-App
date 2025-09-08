/**Local imports*/
import { ms } from "../../utils/helpers/responsive";

/**Icons*/
import HomeIcon from '@svgs/home.svg';
import MessagesIcon from '@svgs/messages.svg';
import ViewMoreIcon from '@svgs/setting/views.svg';
import OnlineIcon from '@svgs/appicon/user_online.svg';

/**Local imports*/
import { DrawerScreenType } from "../../utils/types/types";

/**Screens */
import MessengerScreen from "../../screens/screens/drawer-navigation-screens/messenger-screen";
import FeedScreen from "../../screens/screens/drawer-navigation-screens/feed-screen";
import ViewMeScreen from "../../screens/screens/drawer-navigation-screens/view-me-screen";
import OnlineNowScreen from "../../screens/screens/drawer-navigation-screens/online-now-screen";

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
        label: 'Online Now',
        Icon:OnlineIcon,
        size: ms(16),
    },
]