import { View, Text, KeyboardAvoidingView, Platform, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ChatroomChatboxScreenStyles as styles } from './styles'
import ChatHeader from '../../../../components/chat-header/ChatHeader'
import Loader from '../../../../components/loader/Loader'
import RenderMessageItem from '../../../../components/render-message-item/RenderMessaheItem'
import LoaderKitView from 'react-native-loader-kit'
import { Colors } from '../../../../utils/constant/Constant'
import { ms } from '../../../../utils/helpers/responsive'
import { IconProps } from '../../../../utils/helpers/Iconprops'
/**Icons*/
import SendIcon from '@svgs/send.svg'
import PlusIcon from '@svgs/plus.svg'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GetRoomMessages } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useSocket } from '../../../../utils/context/socket-context/SocketProvider'
import { useIsFocused } from '@react-navigation/native'

type Props = {
    route: any
}

const ChatroomChatboxScreen: React.FC<Props> = ({ route }) => {

    const flatListRef = useRef<FlatList>(null)
    const { Token } = useAuth()
    const { RoomData } = route.params || {}
    const { socket, socketConnected } = useSocket();
    const isFocused = useIsFocused();
    const QueryInvalidater = useQueryClient();

    const [inputText, setInputText] = useState('');

    const conversationId = RoomData?._id

    /**
     * Socket Connection 
     */
    useEffect(() => {
        if (isFocused && socket && socketConnected && conversationId) {
            const eventJoin = 'join_chatroom';
            const eventLeave = 'leave_chatroom';
            const payload = { roomId: conversationId };

            socket.emit(eventJoin, payload);

            return () => {
                socket.emit(eventLeave, payload);
            };
        }
    }, [isFocused, socket, socketConnected, conversationId]);


    useEffect(() => {
        if (isFocused && socket && socketConnected && conversationId) {
            const eventNewMessage = 'new_room_message';
            const eventSendMessage = 'room_message_sent';

            const invalidateMessages = () => {
                QueryInvalidater.invalidateQueries({ queryKey: ['chatroom_message', conversationId] });
            };

            const handleNewMessage = (message: any) => {
                invalidateMessages();
            };
            const handleMessageSent = (message: any) => {
                invalidateMessages();
            };

            socket.on(eventNewMessage, handleNewMessage);
            socket.on(eventSendMessage, handleMessageSent);

            return () => {
                socket.off(eventNewMessage, handleNewMessage);
                socket.off(eventSendMessage, handleMessageSent);
            };
        }
    }, [isFocused, socket, socketConnected, conversationId]);


    const renderItem = ({ item }: { item: any, }) => (
        <RenderMessageItem
            {...{
                styles,
                item,
                onLongPress: () => { },
                type: "chatroom"
            }}
        />
    );

    const sendMessage = () => {
        if (socket && socketConnected && conversationId) {
            socket.emit('send_room_message', {
                roomId: conversationId,
                content: inputText,
                messageType: 'text',
            });
            QueryInvalidater.invalidateQueries({ queryKey: ['chatroom_message'] });
        }
        setInputText('');
    };

    const { data, isLoading } = useQuery({
        queryKey: ["chatroom_message", RoomData?._id],
        queryFn: () => GetRoomMessages(Token, RoomData?._id),
        enabled: !!Token,
    })

    return (
        <View style={styles.dt_container}>
            <ChatHeader
                {...{
                    chat: RoomData,
                    type: "chatroom",
                }}
            />
            <KeyboardAvoidingView
                style={styles.dt_message_container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <FlatList
                            ref={flatListRef}
                            data={[...(data?.data || [])].reverse()}
                            renderItem={renderItem}
                            keyExtractor={item => item?._id}
                            contentContainerStyle={{ paddingVertical: 10 }}
                            inverted
                        />

                        {/* {isTyping && (
                            <View style={[styles.dt_messageContainer, styles.dt_typing_Container]}>
                                {chatType && (
                                    <Text style={[styles.dt_messageText, { marginBottom: ms(-5) }]}>
                                        {showTyping?.username}
                                    </Text>
                                )}
                                <LoaderKitView
                                    style={{ width: 20, height: 20 }}
                                    name={'BallPulse'}
                                    animationSpeedMultiplier={1.0}
                                    color={Colors.dt_white}
                                />
                            </View>
                        )} */}
                    </>
                )}
                <View style={styles.dt_inputContainer}>
                    <TouchableOpacity
                        style={[styles.dt_sendButton]}
                    // onPress={handlePickMedia}
                    >
                        <PlusIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.dt_input}
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={setInputText}
                        placeholderTextColor={Colors.dt_gray}
                        multiline
                        scrollEnabled
                    />
                    <TouchableOpacity style={styles.dt_sendButton} onPress={sendMessage} >
                        <SendIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                    </TouchableOpacity>
                    {/* onPress={sendMessage} */}
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatroomChatboxScreen