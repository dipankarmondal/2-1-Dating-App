/**React Imports */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

/**Local imports*/
import { MessageListStyles as styles } from './styles'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import { MessageListProps } from '../../utils/types/types'
import { useAuth } from '../../utils/context/auth-context/AuthContext'

/**Icons*/
import MenuDotsIcon from '@svgs/menu-dots.svg'
import CheckIcon from "../../../assets/svgs/check.svg"
import DubbleCheck from "../../../assets/svgs/dubble_check.svg"

/** Liabary*/
import LoaderKitView from 'react-native-loader-kit'
import { useNavigation } from '@react-navigation/native'

/**Main export*/
const MessageList: React.FC<MessageListProps> = ({ chat, onMorePress, type, showTyping }) => {
    const Navigation = useNavigation<any>();
    const { user } = useAuth();

    const isTyping = showTyping?.userId === chat?.otherParticipant?._id && showTyping?.isTyping === true;
    const isCheckIcon = chat?.lastMessage?.senderId === user?.id

    const getMessagePreview = () => {
        const msg = chat?.lastMessage;

        if (!msg) return '';

        switch (msg.messageType) {
            case 'text':
                return isTyping ?
                    <LoaderKitView
                        style={{ width: 17, height: 17 }}
                        name={'BallPulse'}
                        animationSpeedMultiplier={2.0}
                        color={Colors.dt_white}
                    /> : msg.content;
            case 'image':
                return isCheckIcon ? '📸 You sent a photo' : '📸 Photo received';
            case 'video':
                return isCheckIcon ? '🎥 You sent a video' : '🎥 Video received';
            default:
                return '';
        }
    };

    const ProfileImage =
        type === 'group'
            ? chat?.group?.coverImage
                ? { uri: chat.group.coverImage }
                : require('@images/dummy.png')
            : chat?.otherParticipant?.profile?.photos?.[0]
                ? { uri: chat.otherParticipant.profile.photos[0] }
                : require('@images/dummy.png');

    return (
        <TouchableOpacity
            style={styles.dt_messenger_wrapper}
            activeOpacity={0.7}
            onPress={() => Navigation.navigate('ChatScreen', { chat, type })}
        >
            {/* User Avatar */}
            <View style={styles.dt_image_container}>
                <Image
                    source={ProfileImage}
                    style={styles.dt_image}
                />
                {
                    type !== 'group' && (
                        <View
                            style={[
                                styles.dt_status_overlay,
                                {
                                    backgroundColor: chat?.otherParticipant?.isOnline === true
                                        ? Colors.dt_primary_green
                                        : Colors.dt_gray,
                                },
                            ]}
                        />
                    )
                }
            </View>

            {/* Message Text */}
            <View style={styles.dt_text_container}>
                <View style={styles.dt_text_wrapper}>
                    <View style={styles.dt_name_wrapper}>
                        <Text style={styles.dt_name}>{type === 'group' ? chat?.group?.name : chat?.otherParticipant?.username}</Text>
                        <TouchableOpacity
                            style={styles.dt_more}
                            onPress={() => onMorePress(chat)}
                        >
                            <MenuDotsIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dt_message_wrapper}>
                        {
                            isCheckIcon && (
                                chat?.lastMessage?.isRead ?
                                    <DubbleCheck  {...IconProps(ms(15))} fill="#26a1f4" style={{ marginBottom: ms(-2), marginLeft: ms(-3) }} /> :
                                    <CheckIcon  {...IconProps(ms(11))} fill={Colors.dt_gray} style={{ marginBottom: ms(-3) }} />
                            )
                        }
                        <Text style={styles.dt_text} numberOfLines={2} ellipsizeMode="tail">
                            {getMessagePreview()}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MessageList;