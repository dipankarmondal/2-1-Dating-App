/**React Imports */
import { View, Text, KeyboardAvoidingView, Platform, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { use, useEffect, useRef, useState } from 'react'

/**Components */
import ChatHeader from '../../../../components/chat-header/ChatHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import RenderMessageItem from '../../../../components/render-message-item/RenderMessaheItem'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'

/**Local imports*/
import { ChatScreenStyles as styles } from './styles'
import { Colors } from '../../../../utils/constant/Constant'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'

/**Icons*/
import SendIcon from '@svgs/send.svg'
import MicIcon from '@svgs/mic.svg'
import PlusIcon from '@svgs/plus.svg'
import DeleteIcon from '@svgs/delete.svg'
import EditIcon from '@svgs/edit.svg'

/** Liabary*/
import { launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GetConversationWithUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useSocket } from '../../../../utils/context/socket-context/SocketProvider'
import { LoaderKitView } from 'react-native-loader-kit';

type Props = {
    route: any,
}
const ChatScreen: React.FC<Props> = ({ route }) => {

    const { Token } = useAuth()
    const { chat, type } = route.params;
    const { socket, socketConnected } = useSocket();
    const QueryInvalidater = useQueryClient();

    const isFocused = useIsFocused();
    const flatListRef = useRef<FlatList>(null);

    const [messages, setMessages] = useState<any>([]);
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editText, setEditText] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [showTyping, setShowTyping] = useState(null);

    const isTyping = showTyping?.userId === chat?.otherParticipant?._id && showTyping?.isTyping === true;

    useEffect(() => {
        if (isFocused && socket && socketConnected && chat?.otherParticipant?._id) {
            const otherUserId = chat.otherParticipant._id;
            socket.emit('join_conversation', {
                otherUserId: otherUserId
            });
            return () => {
                socket.emit('leave_conversation', {
                    otherUserId: otherUserId
                });
            }
        }
    }, [isFocused, socket, socketConnected, chat?.otherParticipant?._id]);


    useEffect(() => {
        if (!socket || !socketConnected || !chat?.otherParticipant?._id) return;

        const handleNewMessage = (message: any) => {
            QueryInvalidater.invalidateQueries({ queryKey: ['messages', chat?.otherParticipant?._id] });
        };
        const handleMessageSent = (message: any) => {
            QueryInvalidater.invalidateQueries({ queryKey: ['messages', chat?.otherParticipant?._id] });
        };
        socket.on('new_personal_message', handleNewMessage);
        socket.on('message_sent', handleMessageSent);
        socket.on('user_typing', (data: any) => {
            setShowTyping(data);
        });

        return () => {
            socket.off('new_personal_message', handleNewMessage);
            socket.off('message_sent', handleMessageSent);
            socket.off('user_typing');
        };
    }, [socket, socketConnected, chat?.otherParticipant?._id]);


    /** 🔹 Send text message */
    const sendMessage = () => {
        if (!inputText.trim()) return;
        if (socket && socketConnected && chat?.otherParticipant?._id) {
            const otherUserId = chat.otherParticipant._id;
            socket.emit('send_personal_message', {
                receiverId: otherUserId,
                content: inputText,
                messageType: 'text',
            });
            QueryInvalidater.invalidateQueries({ queryKey: ['MessageUserList'] });
        }
        setInputText('');
    };

    /** 🔹 Pick and send image */
    const handlePickImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                selectionLimit: 1,
            });

            if (result.assets?.length) {
                const file = result.assets[0];
                // setMessages(prev => [createMessage({ image: file.uri }), ...prev]);
            }
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };

    /** 🔹 Open modal on message long press */
    const handleLongPress = (item: any) => {
        setSelectedMessage(item);
        setModalVisible(true);
    };

    const DeleteBtnClick = () => {
        setModalVisible(false);
        setTimeout(() => setShowDeleteModal(true), 300);
    }
    const EditBtnClick = () => {
        setModalVisible(false);
        setTimeout(() => setShowEditModal(true), 300);
    }

    useEffect(() => {
        if (showEditModal && selectedMessage) {
            setEditText(selectedMessage.text || "");
        }
    }, [showEditModal, selectedMessage]);

    /** 🔹 Save Edited Message */
    const handleSaveEdit = () => {
        if (!editText.trim()) return;

        setMessages(prev =>
            prev.map(msg =>
                msg.id === selectedMessage.id ? { ...msg, text: editText } : msg
            )
        );

        setShowEditModal(false);
        setSelectedMessage(null);
        setEditText("");
    };

    /** 🔹 Render chat bubble */
    const renderItem = ({ item }: { item: any, }) => (
        <RenderMessageItem
            {...{
                styles,
                item,
                onLongPress: handleLongPress
            }}
        />
    );

    const { data: messadeData, isLoading } = useQuery({
        queryKey: ["messages", chat?.otherParticipant?._id],
        queryFn: () => GetConversationWithUser(Token, chat?.otherParticipant?._id, 100, 1),
        enabled: !!Token
    })

    return (
        <View style={styles.dt_container}>
            <ChatHeader
                {...{
                    chat: chat,
                    type,
                }}
            />
            <KeyboardAvoidingView
                style={styles.dt_message_container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                <FlatList
                    ref={flatListRef}
                    data={[...(messadeData?.data || [])].reverse()}
                    renderItem={renderItem}
                    keyExtractor={item => item?.id?.toString()}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    inverted
                />
                {
                    isTyping && (
                        <View style={[styles.dt_messageContainer, styles.dt_typing_Container]}>
                            <LoaderKitView
                                style={{ width: 20, height: 20 }}
                                name={'BallPulse'}
                                animationSpeedMultiplier={1.0}
                                color={Colors.dt_white}
                            />
                        </View>
                    )
                }

                {/* Input area */}
                <View style={styles.dt_inputContainer}>
                    <TouchableOpacity
                        style={[styles.dt_sendButton, { marginRight: 5 }]}
                        onPress={handlePickImage}
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
                    <TouchableOpacity style={styles.dt_sendButton} onPress={sendMessage}>
                        <SendIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.dt_sendButton}>
                        <MicIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                    </TouchableOpacity> */}
                </View>
            </KeyboardAvoidingView>

            {/* Modal */}
            <ModalAction
                isModalVisible={modalVisible}
                setModalVisible={setModalVisible}
                type="message"
            >
                <View >
                    <TouchableOpacity style={styles.dt_buttons} onPress={EditBtnClick}>
                        <EditIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                        <Text style={styles.dt_btn_text}>Edit Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dt_buttons} onPress={DeleteBtnClick}>
                        <DeleteIcon {...IconProps(ms(17))} fill={Colors.dt_error} />
                        <Text style={[styles.dt_btn_text, { color: Colors.dt_error }]}>Delete message</Text>
                    </TouchableOpacity>
                </View>
            </ModalAction>
            <ModalAction
                isModalVisible={showDeleteModal}
                setModalVisible={setShowDeleteModal}
                headerText="Delete Chat"
            >
                <ModalContent
                    {...{
                        setModal: setShowDeleteModal,
                        title: `Do you want to delete this message ?`,
                        successText: "Yes, Delete Chat",
                        cancelText: "No, Keep Chat",
                        onSuccess: () => {
                            setShowDeleteModal(false);
                        }
                    }}
                />
            </ModalAction>
            <ModalAction
                isModalVisible={showEditModal}
                setModalVisible={setShowEditModal}
                type="message"
            >
                <View style={styles.dt_modal_input_wrapper}>
                    <View style={styles.dt_modal_input_Container}>
                        <TextInput
                            value={editText}
                            onChangeText={setEditText}
                            placeholder="Edit message..."
                            style={styles.dt_input}
                            placeholderTextColor={Colors.dt_gray}
                            multiline
                            scrollEnabled
                        />

                        <TouchableOpacity style={[styles.dt_sendButton, { backgroundColor: Colors.dt_card_blue }]} onPress={handleSaveEdit}>
                            <SendIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalAction>

        </View>
    );
};

export default ChatScreen;