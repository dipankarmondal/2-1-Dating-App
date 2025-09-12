import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { MessageListStyles as styles } from './styles'
import MenuDotsIcon from '@svgs/menu-dots.svg'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'

type Props = {
    chat: any,
    onMorePress?: any
}

const MessageList: React.FC<Props> = ({ chat,onMorePress  }) => {
  
    return (
        <>
            <TouchableOpacity
                style={styles.dt_messenger_wrapper}
                activeOpacity={0.7}
            >
                <View style={styles.dt_image_container}>
                    <Image source={chat.image} style={styles.dt_image} />
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