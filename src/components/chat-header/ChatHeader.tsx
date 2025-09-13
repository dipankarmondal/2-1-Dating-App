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
    chat: any
}
const ChatHeader: React.FC<Props> = ({chat}) => {
    const Navigation = useNavigation<any>();

    return (
        <View style={styles.dt_container}>
            <View style={styles.dt_left_header}>
                <TouchableOpacity style={styles.dt_icon_box} onPress={() => Navigation.goBack()}>
                    <LeftIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                </TouchableOpacity>
                <View style={styles.dt_profile_image}>
                    <Image source={{uri: chat?.image?.uri}} style={styles.dt_image} />
                </View>
                <Text style={styles.dt_name}>{chat?.name}</Text>
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