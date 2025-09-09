/**React Imports */
import { View, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'

/**Icons*/
import OpenDrawerIcon from '@svgs/open-drawer.svg'
import SearchIcon from '@svgs/search.svg'
import Notification from '@svgs/notification.svg'
import SettingIcon from '@svgs/setting.svg'
import MessengerIcon from '@svgs/messenger.svg'

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
const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, setUpdateKey, type }) => {

    const Navigation = useNavigation<any>()
    const { toggleDrawer } = useRightDrawer();
    const searchRef = useRef<SearchBarRef>(null);


    const HeaderIcon: React.FC<HeaderIconProps> = ({ Icon, onPress }) => (
        <TouchableOpacity style={styles.dt_menu_container} onPress={onPress}>
            <Icon {...IconProps(ms(18))} fill={Colors.dt_white} />
        </TouchableOpacity>
    )

    const handleNavigation = () => {
        if (type === "feed") {
            setUpdateKey("notification")
        } else {
            Navigation.navigate("FeedScreen", { key: "notification" })
        }
    }

    return (
        <View style={styles.container}>
            <AnimatedSearchBar ref={searchRef} headerHeight={50} />
            <View style={styles.dt_header}>
                <HeaderIcon Icon={OpenDrawerIcon} onPress={() => Navigation.openDrawer()} />
                <View style={styles.dt_right_container}>
                    <HeaderIcon Icon={SearchIcon} onPress={() => searchRef.current?.open()} />
                    <HeaderIcon Icon={MessengerIcon} onPress={() => Navigation.navigate("MessengerScreen")} />
                    <HeaderIcon Icon={Notification} onPress={handleNavigation} />
                    <HeaderIcon Icon={SettingIcon} onPress={toggleDrawer} />
                </View>
            </View>
            {/* SearchBar Component */}
            <View style={{flex:1}}>
                {children}
            </View>
            <RightDrawer />
        </View>
    )
}

export default ScreenLayout 