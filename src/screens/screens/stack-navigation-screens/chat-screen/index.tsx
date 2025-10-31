/**React Imports */
import { View, Text, KeyboardAvoidingView, Platform, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

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
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { DeletePersonalMessage, EditPersonalMessage, GetConversationWithUser, UploadMessageMedia } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useSocket } from '../../../../utils/context/socket-context/SocketProvider'

/**Icons*/
import SendIcon from '@svgs/send.svg'
import PlusIcon from '@svgs/plus.svg'
import DeleteIcon from '@svgs/delete.svg'
import EditIcon from '@svgs/edit.svg'

/** Liabary*/
import { useIsFocused } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LoaderKitView } from 'react-native-loader-kit';
import { pick, types } from '@react-native-documents/picker'
import Loader from '../../../../components/loader/Loader'

type Props = {
    route: any,
}

const ChatScreen: React.FC<Props> = ({ route }) => {

    const { Token, user } = useAuth()
    const { chat, type } = route.params;
    const { socket, socketConnected } = useSocket();
    const QueryInvalidater = useQueryClient();

    const isFocused = useIsFocused();
    const flatListRef = useRef<FlatList>(null);

    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editText, setEditText] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [showTyping, setShowTyping] = useState(null);
    const [imageModal, setImageModal] = useState(false);
    const [document, setDocument] = useState(null);
    const [imageInput, setImageInput] = useState(null);

    const chatType = type === 'single'
    const conversationId = chatType ? chat?.otherParticipant._id : chat?.group?._id;
    const documentType = document?.mediaRecord?.type
    const isUser = chatType ? selectedMessage?.senderId?._id === user?.id : selectedMessage?.sender?._id === user?.id
    const isTyping = showTyping?.userId === conversationId && showTyping?.isTyping === true;

    // Socket Connection
    useEffect(() => {
        if (isFocused && socket && socketConnected && conversationId) {
            const eventJoin = type === 'single' ? 'join_conversation' : 'join_group';
            const eventLeave = type === 'single' ? 'leave_conversation' : 'leave_group';
            const payload = type === 'single'
                ? { otherUserId: conversationId }
                : { groupId: conversationId };

            socket.emit(eventJoin, payload);

            return () => {
                socket.emit(eventLeave, payload);
            };
        }
    }, [isFocused, socket, socketConnected, conversationId, type]);

    // Socket Listeners
    useEffect(() => {
        if (!socket || !socketConnected || !conversationId) return;

        const messageEvent = chatType ? 'new_personal_message' : 'new_group_message';
        const sentEvent = chatType ? 'message_sent' : 'group_message_sent';
        const typingEvent = chatType ? 'user_typing' : 'group_typing_start';

        const invalidateMessages = () => {
            QueryInvalidater.invalidateQueries({ queryKey: ['messages', conversationId] });
        };

        const handleNewMessage = (message: any) => {
            invalidateMessages();
        };

        const handleMessageSent = (message: any) => {
            invalidateMessages();
            setImageModal(false);
        };

        const handleTyping = (data: any) => {
            setShowTyping(data);
        };

        socket.on(messageEvent, handleNewMessage);
        socket.on(sentEvent, handleMessageSent);
        socket.on(typingEvent, handleTyping);

        return () => {
            socket.off(messageEvent, handleNewMessage);
            socket.off(sentEvent, handleMessageSent);
            socket.off(typingEvent, handleTyping);
        };
    }, [socket, socketConnected, conversationId, chatType]);

    /** 🔹 Send text message */
    const sendMessage = () => {
        if (socket && socketConnected && conversationId) {
            socket.emit(chatType ? 'send_personal_message' : 'send_group_message', {
                [chatType ? 'receiverId' : 'groupId']: conversationId,
                content: inputText,
                messageType: 'text',
            });
            QueryInvalidater.invalidateQueries({ queryKey: ['MessageUserList'] });
        }
        setInputText('');
    };

    //* 🔹 Send media message */
    const uploadMeadiaMutation = useMutation({
        mutationFn: async (data: any) => UploadMessageMedia(Token, data),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                openImageModal(res?.data?.files)
            }
        }
    })

    //* 🔹 Send media message */
    const handlePickMedia = async () => {
        try {
            const result = await pick({
                type: [types.images, types.video], // allow both image and video
                allowMultiSelection: false,
                mode: 'open',
                quality: 1
            });

            if (result?.length) {
                const file = result[0];

                const formData = new FormData();
                formData.append('media', {
                    uri: file.uri,
                    type: file.type,
                    name: file.name || 'media',
                });
                formData.append("optimize", true);
                formData.append("createThumbnail", true)

                setImageModal(true);

                uploadMeadiaMutation.mutate(formData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    /** 🔹 Open modal on message long press */
    const handleLongPress = (item: any) => {
        setSelectedMessage(item);
        setModalVisible(true);
    };

    //* 🔹 Edit message
    const EditBtnClick = () => {
        setModalVisible(false);
        setTimeout(() => setShowEditModal(true), 300);
    }

    //* 🔹 Edit message
    useEffect(() => {
        if (showEditModal && selectedMessage) {
            setEditText(selectedMessage.content || "");
        }
    }, [showEditModal, selectedMessage]);

    /** 🔹 Render chat bubble */
    const renderItem = ({ item }: { item: any, }) => (
        <RenderMessageItem
            {...{
                styles,
                item,
                onLongPress: handleLongPress,
                type
            }}
        />
    );

    //* 🔹 Get messages
    const { data: messadeData, isLoading } = useQuery({
        queryKey: ["messages", conversationId],
        queryFn: () => GetConversationWithUser(Token, conversationId, 100, 1, type),
        enabled: !!Token
    })

    //* 🔹 Delete message
    const DeleteMessageMutation = useMutation({
        mutationFn: (id: any) => DeletePersonalMessage(Token, id, type),
        onSuccess: (res) => {
            if (res?.success === true) {
                setShowDeleteModal(false);
                QueryInvalidater.invalidateQueries({ queryKey: ['messages'] });
            }
        }
    })

    //* 🔹 Delete message
    const DeleteBtnClick = () => {
        setModalVisible(false);
        setTimeout(() => setShowDeleteModal(true), 300);
    }

    //* 🔹 Delete message
    const handleDeleteChat = () => {
        DeleteMessageMutation.mutate(selectedMessage?._id);
    }

    //* 🔹 Edit message
    const EditChatMutation = useMutation({
        mutationFn: ({ id, data }: { id: any; data: any }) => EditPersonalMessage(Token, id, data, type),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                setShowEditModal(false);
                setSelectedMessage(null);
                setEditText("");
                QueryInvalidater.invalidateQueries({ queryKey: ['messages', conversationId] });
            }
        },
    });

    /** 🔹 Save Edited Message */
    const handleSaveEdit = () => {
        if (!editText.trim()) return;
        EditChatMutation.mutate({ id: selectedMessage?._id, data: { content: editText } });
    };

    //* 🔹 Open image modal
    const openImageModal = (data: any) => {
        setDocument(data);
    }

    //* 🔹 Send image message
    const sendImageMessage = () => {
        if (!imageInput.trim()) return;
        if (socket && socketConnected && conversationId) {
            const otherUserId = chat.otherParticipant._id;
            socket.emit('send_personal_message', {
                receiverId: otherUserId,
                content: imageInput ?? '',
                messageType: documentType,
                mediaUrl: document?.mediaRecord?.url
            });
            QueryInvalidater.invalidateQueries({ queryKey: ['MessageUserList'] });
        }
        setImageInput('');
    };

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
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <FlatList
                            ref={flatListRef}
                            data={[...(messadeData?.data || [])].reverse()}
                            renderItem={renderItem}
                            keyExtractor={item => item?._id}
                            contentContainerStyle={{ paddingVertical: 10 }}
                            inverted
                        />

                        {isTyping && (
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
                        )}

                        {/* Input area */}
                    </>
                )}
                <View style={styles.dt_inputContainer}>
                    <TouchableOpacity
                        style={[styles.dt_sendButton]}
                        onPress={handlePickMedia}
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
                </View>
            </KeyboardAvoidingView>


            {/* Modal */}
            <ModalAction
                isModalVisible={modalVisible}
                setModalVisible={setModalVisible}
                type="message"
            >
                <View >
                    {
                        isUser && (
                            <TouchableOpacity style={styles.dt_buttons} onPress={EditBtnClick}>
                                <EditIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                                <Text style={styles.dt_btn_text}>Edit Chat</Text>
                            </TouchableOpacity>
                        )
                    }
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
                        onSuccess: handleDeleteChat
                    }}
                />
            </ModalAction>
            <ModalAction
                isModalVisible={showEditModal}
                setModalVisible={setShowEditModal}
                headerText='Edit Chat'
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
                            {
                                EditChatMutation?.isPending ?
                                    <ActivityIndicator size={ms(22)} color={Colors.dt_white} /> :
                                    <SendIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalAction>
            <ModalAction
                isModalVisible={imageModal}
                setModalVisible={setImageModal}
                type="message"
            >
                <View style={styles.dt_modal_input_wrapper}>
                    {
                        uploadMeadiaMutation?.isPending ?
                            <LoaderKitView
                                style={{ width: ms(55), height: ms(55) }}
                                name={'BallScaleMultiple'}
                                animationSpeedMultiplier={1.0}
                                color={Colors.dt_white}
                            />

                            : (
                                <>
                                    <View style={styles.dt_image_Container}>
                                        <Image
                                            source={documentType === "video" ? require('@images/play.png') : { uri: document?.mediaRecord?.thumbnailUrl }}
                                            style={[styles.dt_image_modal, { resizeMode: documentType === "video" ? "contain" : "cover" }]}
                                        />
                                    </View>
                                    <View style={styles.dt_modal_input_Container}>
                                        <TextInput
                                            value={imageInput}
                                            onChangeText={setImageInput}
                                            placeholder="Type a message..."
                                            style={styles.dt_input}
                                            placeholderTextColor={Colors.dt_gray}
                                            multiline
                                            scrollEnabled
                                        />
                                        <TouchableOpacity style={[styles.dt_sendButton, { backgroundColor: Colors.dt_card_blue }]} onPress={sendImageMessage}>
                                            <SendIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )
                    }
                </View>
            </ModalAction>
        </View>
    );
};

export default ChatScreen;