import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ChatHeader from '../../../../components/chat-header/ChatHeader'
import { ChatScreenStyles as styles } from './styles'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

type Props = {
    route: any
}

const ChatScreen: React.FC<Props> = ({ route }) => {
    const { chat } = route.params
    const [messages, setMessages] = useState<IMessage[]>([]);

    // Example: initial messages
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: `Welcome to chat with ${chat.name}!`,
                createdAt: new Date(),
                user: {
                    _id: 2, // id of the other user
                    name: chat.name,
                    avatar: chat.avatar || 'https://i.pravatar.cc/300', // fallback avatar
                },
            },
        ]);
    }, [chat]);

    const onSend = useCallback((newMessages: IMessage[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        );
        // Here you can also emit the message via your socket or API
    }, []);
    return (
        <View style={styles.dt_container}>
            <ChatHeader
                {...{
                    chat
                }}
            />
            <View style={styles.dt_message_container}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1, // current user id
                    }}
                    placeholder="Type a message..."
                    showUserAvatar
                    alwaysShowSend
                />
            </View>
        </View>
    )
}

export default ChatScreen