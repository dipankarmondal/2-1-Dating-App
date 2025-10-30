import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../utils/context/auth-context/AuthContext';
import CheckIcon from "../../../assets/svgs/check.svg"
import DubbleCheck from "../../../assets/svgs/dubble_check.svg"
import { IconProps } from '../../utils/helpers/Iconprops';
import { ms } from '../../utils/helpers/responsive';
import { Colors, Fonts } from '../../utils/constant/Constant';
import GalleryModal from '../modal/gallery-modal/GalleryModal';
import VideoModal from '../modal/video-modal/VideoModal';
import PyramidIcon from "@svgs/pyramid.svg"

const RenderMessageItem: React.FC<any> = ({ item, onLongPress, styles, type }) => {

    const chatType = type === 'single'
    const { user } = useAuth()
    const isUser = chatType
        ? item?.senderId?._id === user?.id // for personal chat
        : item?.sender?._id === user?.id;

    const [visible, setVisible] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [source, setSource] = useState(null);

    const handleClick = (item: any) => {
        if (item?.messageType === 'video') {
            setVideoModal(true);
            setSource(item?.mediaUrl)
        } else  if(item?.messageType === 'image') (
            setVisible(true),
            setSource([item?.mediaUrl])
        )
    }

    return (
        <View style={{ flexDirection: isUser ? 'row-reverse' : 'row' }}>
            {
                !chatType && !isUser && (
                    <View style={styles.dt_group_image_container}>
                        <Image
                            source={{ uri: item?.sender?.profile?.photos[0] }}
                            style={styles.dt_group_image}
                        />
                    </View>
                )
            }
            <Pressable
                onLongPress={() => onLongPress(item)}
                style={[
                    styles.dt_messageContainer,
                    isUser ? styles.dt_myMessage : styles.dt_otherMessage,
                ]}
                onPress={() => handleClick(item)}
            >
                {
                    !chatType && !isUser && (
                        <Text style={[styles.dt_messageText, styles.dt_group_username]}>
                            {item?.sender?.username}
                        </Text>
                    )
                }
                <View style={[isUser ? styles.dt_chat_user : styles.dt_pyramidContainer, ]}>
                    <PyramidIcon {...IconProps(ms(13))} fill={isUser ? Colors.dt_card_blue : Colors.dt_success_green} />
                </View>
                {item.messageType === 'image' ? (
                    <>
                        <Image
                            source={{ uri: item?.mediaUrl }}
                            style={{ width: 200, height: 200, borderRadius: 10 }}
                            resizeMode="cover"
                        />
                        <Text style={[styles.dt_messageText, { marginTop: ms(5) }]}>{item?.content}</Text>
                    </>
                ) : item.messageType === 'video' ? (
                    <>
                        <View style={styles.dt_video_Container}>
                            <Image
                                source={require('@images/play.png')}
                                style={{ width: 150, height: 150, borderRadius: 10 }}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={[styles.dt_messageText, { marginTop: ms(5) }]}>{item?.content}</Text>
                    </>
                ) : (
                    <Text style={styles.dt_messageText}>{item?.content}</Text>
                )}
                <View style={styles.dt_timestampContainer}>
                    {
                        chatType && !isUser && (
                            item?.isRead ?
                                <DubbleCheck  {...IconProps(ms(15))} fill="#26a1f4" style={{ marginBottom: ms(-2), marginLeft: ms(-3) }} /> :
                                <CheckIcon  {...IconProps(ms(11))} fill={Colors.dt_gray} style={{ marginBottom: ms(-3) }} />
                        )
                    }
                    
                    <Text style={[styles.dt_timestamp, { color: Colors.dt_black }]}> {new Date(item.timestamp).toLocaleTimeString()}</Text>
                    {
                        item?.isEdited && (
                            <Text style={[styles.dt_timestamp, { fontStyle: 'italic', color: Colors.dt_black }]}> Edited </Text>
                        )
                    }
                </View>
            </Pressable>
            <GalleryModal
                {...{
                    visible: visible,
                    setVisible: setVisible,
                    photos: source
                }}
            />
            <VideoModal
                {...{
                    setVisible: setVideoModal,
                    visible: videoModal,
                    source: source,
                    type: "message"
                }}
            />
        </View>
    )
}

export default RenderMessageItem