/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { NotificationCardStyles as styles } from './styles'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import { NotificationCardProps } from '../../utils/types/types'

/**Icons*/
import NotificatioIcon from '@svgs/notification_icon.svg'

/**Main export*/

const NotificationCard: React.FC<NotificationCardProps> = ({ item, setShowDropdown, setSelectedItem }) => {

    const HanddleClick = (data: any) => {
        setShowDropdown(true)
        setSelectedItem(data)
    }

    return (
        <>
            <TouchableOpacity key={item.id} style={styles.dt_container_list} activeOpacity={0.7} onPress={() => HanddleClick(item)}>
                <View style={styles.dt_icon_container}>
                    <NotificatioIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                    <View style={[styles.dt_overlay, { backgroundColor: item?.read ? Colors.dt_white : Colors.dt_primary_green }]} />
                </View>
                <View style={styles.dt_info_container}>
                    <View style={styles.dt_info_header}>
                        <Text style={styles.dt_info_title}>{item?.title}</Text>
                        <Text style={styles.dt_info_date}>{new Date().toDateString()}</Text>
                    </View>
                    <Text style={styles.dt_info_text} numberOfLines={3} ellipsizeMode="tail">
                        {item?.text}
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default NotificationCard