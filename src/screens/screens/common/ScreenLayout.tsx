/**React Imports */
import { View, TouchableOpacity } from 'react-native'
import React from 'react'

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
import { HeaderIconProps, ScreenLayoutProps } from '../../../utils/types/types'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import RightDrawer from '../../../components/right-drawer/RightDrawer'
import { useRightDrawer } from '../../../utils/context/right-drawer/RightDrawer'

/**Main export*/
const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {

    const Navigation = useNavigation<any>()
      const { toggleDrawer } = useRightDrawer();

    const HeaderIcon: React.FC<HeaderIconProps> = ({ Icon, onPress }) => (
        <TouchableOpacity style={styles.dt_menu_container} onPress={onPress}>
            <Icon {...IconProps(ms(18))} fill={Colors.dt_white} />
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <View style={styles.dt_header}>
                <HeaderIcon Icon={OpenDrawerIcon} onPress={() => Navigation.openDrawer()} />
                <View style={styles.dt_right_container}>
                    <HeaderIcon Icon={SearchIcon} onPress={() => console.log("Search")} />
                    <HeaderIcon Icon={MessengerIcon} onPress={() => console.log("Messenger")} />
                    <HeaderIcon Icon={Notification} onPress={() => console.log("Notifications")} />
                    <HeaderIcon Icon={SettingIcon} onPress={toggleDrawer}   />
                </View>
            </View>

            <View style={styles.dt_content}>
                {children}
            </View>
            <RightDrawer />
        </View>
    )
}

export default ScreenLayout 