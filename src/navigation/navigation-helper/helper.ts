import { ms } from "../../utils/helpers/responsive";
import HomeIcon from '@svgs/home.svg';
import MessagesIcon from '@svgs/messages.svg';

import { DrawerScreenType } from "../../utils/types/types";
import MessengerScreen from "../../screens/screens/drawer-navigation-screens/messenger-screen";
import FeedScreen from "../../screens/screens/drawer-navigation-screens/feed-screen";

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
]