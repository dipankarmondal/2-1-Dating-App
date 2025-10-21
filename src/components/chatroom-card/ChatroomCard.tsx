import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChatroomCardStyles as styles } from './styles'
import moment from 'moment'
import GroupIcon from '@svgs/group.svg'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'

type Props = {
    item: any
}

const ChatroomCard: React.FC<Props> = ({ item }) => {
    const formatDate = (date?: string) =>
        date ? moment.utc(date).local().format("MMM DD, YYYY") : "-";

    return (
        <View style={styles.dt_room_container}>
            <View style={styles.dt_room_image}>
                <Image source={require('@images/chatroom.png')} style={styles.dt_image} />
                <View style={styles.dt_image_overlay}>
                    <View style={styles.dt_group_container}>
                        <GroupIcon {...IconProps(ms(13))} fill={Colors.dt_white} />
                        <Text style={styles.dt_group_text}>{item?.participants?.length}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.dt_room_info}>
                <View>
                    <Text style={styles.dt_room_name}>{item?.name ?? "__"}</Text>
                    <Text style={styles.dt_room_member}>{formatDate(item?.createdAt)}</Text>
                </View>
                <TouchableOpacity style={styles.dt_button}>
                    <Text style={styles.dt_button_text}>Join Chatroom</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatroomCard