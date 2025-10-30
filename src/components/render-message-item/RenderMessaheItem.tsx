import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useAuth } from '../../utils/context/auth-context/AuthContext';
import CheckIcon from "../../../assets/svgs/check.svg"
import DubbleCheck from "../../../assets/svgs/dubble_check.svg"
import { IconProps } from '../../utils/helpers/Iconprops';
import { ms } from '../../utils/helpers/responsive';
import { Colors, Fonts } from '../../utils/constant/Constant';

const RenderMessageItem: React.FC<any> = ({ item, onLongPress, styles }) => {
    const { user } = useAuth()
    const isUser = item?.senderId?._id === user?.id

    const messageContent = () => {
        return (
            <>
                {item.messageType === 'image' ? ( 
                    <>
                        <Image
                            source={{ uri: item?.mediaUrl }}
                            style={{ width: 200, height: 200, borderRadius: 10 }}
                            resizeMode="cover"
                        />
                        <Text style={[styles.dt_messageText, { marginTop: ms(5) }]}>{item?.content}</Text>
                    </>
                ) : (
                    <Text style={styles.dt_messageText}>{item?.content}</Text>
                )}

                <View style={styles.dt_timestampContainer}>
                    {
                        isUser && (
                            item?.isRead ?
                                <DubbleCheck  {...IconProps(ms(15))} fill="#26a1f4" style={{ marginBottom: ms(-2), marginLeft: ms(-3) }} /> :
                                <CheckIcon  {...IconProps(ms(11))} fill={Colors.dt_gray} style={{ marginBottom: ms(-3) }} />
                        )
                    }
                    <Text style={[styles.dt_timestamp,{color:  Colors.dt_black}]}> {new Date(item.timestamp).toLocaleTimeString()}</Text>
                    {
                        item?.isEdited && (
                            <Text style={[styles.dt_timestamp,{fontStyle: 'italic', color: Colors.dt_black}]}> Edited </Text>
                        )
                    }
                </View>
            </>
        )
    }

    return (
        <>
            {
                isUser ? (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onLongPress={() => onLongPress(item)}
                        style={[
                            styles.dt_messageContainer,
                            isUser ? styles.dt_myMessage : styles.dt_otherMessage,
                        ]}
                    >
                        {messageContent()}
                    </TouchableOpacity>
                ) : (
                    <View
                        style={[
                            styles.dt_messageContainer,
                            isUser ? styles.dt_myMessage : styles.dt_otherMessage,
                        ]}
                    >
                        {messageContent()}
                    </View>
                )
          }
        </>

    )
}

export default RenderMessageItem