import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MessageListStyles as styles } from './styles'
import MenuDotsIcon from '@svgs/menu-dots.svg'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import { useNavigation } from '@react-navigation/native'

type Props = {
    chat: any,
    onMorePress?: any
}

const MessageList: React.FC<Props> = ({ chat, onMorePress }) => {

    const Navigation = useNavigation<any>()

    return (
        <>
            <TouchableOpacity
                style={styles.dt_messenger_wrapper}
                activeOpacity={0.7}
                onPress={() => Navigation.navigate("ChatScreen", { chat: chat })}
            >
                <View style={styles.dt_image_container}>
                    <Image source={chat.image} style={styles.dt_image} />
                    <View style={styles.dt_status_overlay}/>
                </View>

                <View style={styles.dt_text_container}>
                    <View style={styles.dt_text_wrapper}>
                        <View style={styles.dt_name_wrapper}>
                            <Text style={styles.dt_name}>{chat.name}</Text>
                            <TouchableOpacity style={styles.dt_more} onPress={() => onMorePress(chat.id, chat.name)}>
                                <MenuDotsIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={styles.dt_text}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {chat.message}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>
        </>
    )
}

export default MessageList