import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MessageListStyles as styles } from './styles'
import MenuDotsIcon from '@svgs/menu-dots.svg'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import { useNavigation } from '@react-navigation/native'
import { MessageListProps } from '../../utils/types/types'
import { useAuth } from '../../utils/context/auth-context/AuthContext'


const MessageList: React.FC<MessageListProps> = ({ chat, onMorePress, type }) => {
    const Navigation = useNavigation<any>();
    const { user } = useAuth();

    const isUser = chat?.lastMessage?.receiverId === user?.id;
    const FullName = `${chat?.otherParticipant?.profile?.firstName || ''} ${chat?.otherParticipant?.profile?.lastName || ''}`.trim();

    const getMessagePreview = () => {
        const msg = chat?.lastMessage;

        if (!msg) return '';

        switch (msg.messageType) {
            case 'text':
                return msg.content;
            case 'image':
                return isUser ? '📸 You sent a photo' : '📸 Photo received';
            case 'pdf':
                return isUser ? '📄 You sent a document' : '📄 Document received';
            default:
                return '';
        }
    };

    return (
        <TouchableOpacity
            style={styles.dt_messenger_wrapper}
            activeOpacity={0.7}
            onPress={() => Navigation.navigate('ChatScreen', { chat, type })}
        >
            {/* User Avatar */}
            <View style={styles.dt_image_container}>
                <Image
                    source={
                        chat?.otherParticipant?.profile?.photos?.length > 0
                            ? { uri: chat?.otherParticipant?.profile?.photos[0] }
                            : require('@images/dummy.png')
                    }
                    style={styles.dt_image}
                />
                <View
                    style={[
                        styles.dt_status_overlay,
                        {
                            backgroundColor: chat?.otherParticipant?.settings?.showOnline
                                ? Colors.dt_primary_green
                                : Colors.dt_gray,
                        },
                    ]}
                />
            </View>

            {/* Message Text */}
            <View style={styles.dt_text_container}>
                <View style={styles.dt_text_wrapper}>
                    <View style={styles.dt_name_wrapper}>
                        <Text style={styles.dt_name}>{FullName}</Text>
                        <TouchableOpacity
                            style={styles.dt_more}
                            onPress={() => onMorePress(chat?.lastMessage?.conversationId, FullName)}
                        >
                            <MenuDotsIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.dt_text} numberOfLines={2} ellipsizeMode="tail">
                        {getMessagePreview()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MessageList;