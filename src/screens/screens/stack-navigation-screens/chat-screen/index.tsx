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
import { launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LoaderKitView } from 'react-native-loader-kit';
import { pick, types } from '@react-native-documents/picker'

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

    const documentType = document?.mediaRecord?.type
    const isUser = selectedMessage?.senderId?._id === user?.id
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
            setImageModal(false);
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

    const uploadMeadiaMutation = useMutation({
        mutationFn: async (data: any) => UploadMessageMedia(Token, data),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                openImageModal(res?.data?.files)
            }
        }
    })

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

    const EditBtnClick = () => {
        setModalVisible(false);
        setTimeout(() => setShowEditModal(true), 300);
    }

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
            }}
        />
    );

    const { data: messadeData, isLoading } = useQuery({
        queryKey: ["messages", chat?.otherParticipant?._id],
        queryFn: () => GetConversationWithUser(Token, chat?.otherParticipant?._id, 100, 1),
        enabled: !!Token
    })

    const DeleteMessageMutation = useMutation({
        mutationFn: (id: any) => DeletePersonalMessage(Token, id),
        onSuccess: (res) => {
            if (res?.success === true) {
                setShowDeleteModal(false);
                QueryInvalidater.invalidateQueries({ queryKey: ['messages'] });
            }
        }
    })

    const DeleteBtnClick = () => {
        setModalVisible(false);
        setTimeout(() => setShowDeleteModal(true), 300);
    }

    const handleDeleteChat = () => {
        DeleteMessageMutation.mutate(selectedMessage?._id);
    }

    const EditChatMutation = useMutation({
        mutationFn: ({ id, data }: { id: any; data: any }) => EditPersonalMessage(Token, id, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                setShowEditModal(false);
                setSelectedMessage(null);
                setEditText("");
                QueryInvalidater.invalidateQueries({ queryKey: ['messages', chat?.otherParticipant?._id] });
            }
        },
    });

    /** 🔹 Save Edited Message */
    const handleSaveEdit = () => {
        if (!editText.trim()) return;
        EditChatMutation.mutate({ id: selectedMessage?._id, data: { content: editText } });
    };

    const openImageModal = (data: any) => {
        setDocument(data);
    }

    const sendImageMessage = () => {
        if (!imageInput.trim()) return;
        if (socket && socketConnected && chat?.otherParticipant?._id) {
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
                <FlatList
                    ref={flatListRef}
                    data={[...(messadeData?.data || [])].reverse()}
                    renderItem={renderItem}
                    keyExtractor={item => item?._id}
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