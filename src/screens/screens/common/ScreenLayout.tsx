/**React Imports */
import { View, TouchableOpacity, Text } from 'react-native'
import React, { useRef } from 'react'

/**Icons*/
import OpenDrawerIcon from '@svgs/open-drawer.svg'
import SearchIcon from '@svgs/search.svg'
import Notification from '@svgs/notification.svg'
import SettingIcon from '@svgs/setting.svg'
import MessengerIcon from '@svgs/messenger.svg'
import LeftIcon from '@svgs/angle-small-left.svg'

/**Local imports*/
import { ScreenLayoutStyles as styles } from './styles'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/responsive'
import { Colors } from '../../../utils/constant/Constant'
import { HeaderIconProps, ScreenLayoutProps, SearchBarRef } from '../../../utils/types/types'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import RightDrawer from '../../../components/right-drawer/RightDrawer'
import { useRightDrawer } from '../../../utils/context/right-drawer/RightDrawer'

import AnimatedSearchBar from '../../../components/animated-search-bar'

/**Main export*/
const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, setUpdateKey, type, title, headerChildren }) => {
    const Navigation = useNavigation<any>();
    const { toggleDrawer } = useRightDrawer();
    const searchRef = useRef<SearchBarRef>(null);

    const HeaderIcon: React.FC<HeaderIconProps> = ({ Icon, onPress }) => (
        <TouchableOpacity style={styles.dt_menu_container} onPress={onPress}>
            <Icon {...IconProps(type === "stack" ? ms(24) : ms(18))} fill={Colors.dt_white} />
        </TouchableOpacity>
    );

    const handleNotification = () => {
        if (type === "feed") {
            setUpdateKey?.("notification");
        } else {
            Navigation.navigate("FeedScreen", { key: "notification" });
        }
    };

    const leftIcon = type === "stack" ? LeftIcon : OpenDrawerIcon;
    const leftAction = type === "stack" ? () => Navigation.goBack() : () => Navigation.openDrawer();

    const rightActions = [
        { Icon: SearchIcon, onPress: () => searchRef.current?.open() },
        { Icon: MessengerIcon, onPress: () => Navigation.navigate("MessengerScreen") },
        { Icon: Notification, onPress: handleNotification },
        { Icon: SettingIcon, onPress: toggleDrawer },
    ];

    return (
        <View style={styles.container}>
            <AnimatedSearchBar ref={searchRef} headerHeight={50} />
            <View style={styles.dt_header}>
                <View style={styles.dt_left_container}>
                    <HeaderIcon Icon={leftIcon} onPress={leftAction} />
                    <Text style={styles.dt_header_title}>{title}</Text>
                </View>
                {type !== "stack" && (
                    <View style={styles.dt_right_container}>
                        {rightActions.map(({ Icon, onPress }, index) => (
                            <HeaderIcon key={index} Icon={Icon} onPress={onPress} />
                        ))}
                    </View>
                )}
                {headerChildren && headerChildren}
            </View>
            <View style={{ flex: 1 }}>{children}</View>
            <RightDrawer />
        </View>
    );
};

export default ScreenLayout;