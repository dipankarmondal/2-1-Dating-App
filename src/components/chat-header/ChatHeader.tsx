/**React Imports */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

/**Local imports*/
import { ChatHeaderStyles as styles } from './styles'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'

/**Icons*/
import LeftIcon from '@svgs/angle-small-left.svg'
import CallIcon from '@svgs/setting/call.svg'
import VideoIcon from '@svgs/appicon/live.svg'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

type Props = {
    chat: any,
    type: any
}
const ChatHeader: React.FC<Props> = ({ chat, type }) => {
    const Navigation = useNavigation<any>();

    const handleClick = () => {
        if (type === "single") {
            Navigation.navigate("ProfileScreen", { userId: chat?.otherParticipant?._id, type: "friends" })
        } else {
            Navigation.navigate("GroupInfoScreen", { chat: chat, type: type })
        }
    }

    const ProfileImage =
        type === 'group'
            ? chat?.group?.coverImage
                ? { uri: chat.group.coverImage }
                : require('@images/dummy.png')
            : chat?.otherParticipant?.profile?.photos?.[0]
                ? { uri: chat.otherParticipant.profile.photos[0] }
                : require('@images/dummy.png');

    return (
        <View style={styles.dt_container}>
            <View style={styles.dt_left_header}>
                <TouchableOpacity style={styles.dt_icon_box} onPress={() => Navigation.goBack()}>
                    <LeftIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dt_profile_box} onPress={handleClick} >
                    <View style={styles.dt_profile_image}>
                        <Image
                            source={ProfileImage}
                            style={styles.dt_image}
                        />
                    </View>
                    <Text style={styles.dt_name} numberOfLines={1} ellipsizeMode="middle">
                        {type === 'group' ? chat?.group?.name : chat?.otherParticipant?.username}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dt_right_header}>
                <TouchableOpacity style={styles.dt_btn_box}>
                    <CallIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dt_btn_box}>
                    <VideoIcon {...IconProps(ms(19))} fill={Colors.dt_white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatHeader