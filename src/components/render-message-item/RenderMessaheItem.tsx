/**React Imports */
import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { useAuth } from '../../utils/context/auth-context/AuthContext';
import { IconProps } from '../../utils/helpers/Iconprops';
import { ms } from '../../utils/helpers/responsive';
import { Colors } from '../../utils/constant/Constant';

/**Icons*/
import CheckIcon from "../../../assets/svgs/check.svg"
import DubbleCheck from "../../../assets/svgs/dubble_check.svg"
import PyramidIcon from "@svgs/pyramid.svg"

/**Components */
import GalleryModal from '../modal/gallery-modal/GalleryModal';
import VideoModal from '../modal/video-modal/VideoModal';

/**Main export*/
const RenderMessageItem: React.FC<any> = ({ item, onLongPress, styles, type }) => {

    const chatType = type === 'single'
    const chatRoomType = type === 'chatroom'
    const { user } = useAuth()

    const isUser = chatType
        ? item?.senderId?._id === user?.id
        : chatRoomType
            ? item?.userId?._id === user?.id
            : item?.sender?._id === user?.id;

    const [visible, setVisible] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [source, setSource] = useState(null);

    const handleClick = (item: any) => {
        if (item?.messageType === 'video') {
            setVideoModal(true);
            setSource(item?.mediaUrl)
        } else if (item?.messageType === 'image') (
            setVisible(true),
            setSource([item?.mediaUrl])
        )
    }

    const userPhoto = item?.sender?.profile?.photos[0] || item?.userId?.profile?.photos[0]
    const userName = item?.sender?.username || item?.userId?.username

    return (
        <View style={{ flexDirection: isUser ? 'row-reverse' : 'row' }}>
            {
                !chatType && !isUser && (
                    <View style={styles.dt_group_image_container}>
                        <Image
                            source={{ uri: userPhoto }}
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
                    { marginLeft: chatType && ms(15) }]}
                onPress={() => handleClick(item)}
            >
                {
                    !chatType && !isUser && (
                        <Text style={[styles.dt_messageText, styles.dt_group_username]}>
                            {userName}
                        </Text>
                    )
                }
                <View style={[isUser ? styles.dt_chat_user : styles.dt_pyramidContainer,]}>
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
                        chatType && isUser && (
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