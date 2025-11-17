/**React Imports */
import { View, KeyboardAvoidingView, Platform, FlatList, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

/**Local imports*/
import { ChatroomChatboxScreenStyles as styles } from './styles'
import { Colors } from '../../../../utils/constant/Constant'
import { ms, showToast } from '../../../../utils/helpers/responsive'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import {GetRoomMessages, UploadMessageMedia } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useSocket } from '../../../../utils/context/socket-context/SocketProvider'

/**Components */
import ChatHeader from '../../../../components/chat-header/ChatHeader'
import Loader from '../../../../components/loader/Loader'
import RenderMessageItem from '../../../../components/render-message-item/RenderMessaheItem'
import LoaderKitView from 'react-native-loader-kit'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'

/**Icons*/
import SendIcon from '@svgs/send.svg'
import PlusIcon from '@svgs/plus.svg'

/** Liabary*/
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useIsFocused } from '@react-navigation/native'
import { pick, types } from '@react-native-documents/picker'

type Props = {
    route: any
}

/**Main export*/
const ChatroomChatboxScreen: React.FC<Props> = ({ route }) => {

    const flatListRef = useRef<FlatList>(null)
    const { Token } = useAuth()
    const { RoomData } = route.params || {}
    const { socket, socketConnected } = useSocket();
    const isFocused = useIsFocused();
    const QueryInvalidater = useQueryClient();

    const [inputText, setInputText] = useState('');
    const [imageModal, setImageModal] = useState(false);
    const [document, setDocument] = useState(null);
    const [imageInput, setImageInput] = useState(null);

    const conversationId = RoomData?._id
    const documentType = document?.mediaRecord?.type

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
                setImageModal(false);
            };

            socket.on(eventNewMessage, handleNewMessage);
            socket.on(eventSendMessage, handleMessageSent);

            return () => {
                socket.off(eventNewMessage, handleNewMessage);
                socket.off(eventSendMessage, handleMessageSent);
            };
        }
    }, [isFocused, socket, socketConnected, conversationId]);

    //* 🔹 Open image modal
    const openImageModal = (data: any) => {
        setDocument(data);
    }

    //* 🔹 Send media message */
    const uploadMeadiaMutation = useMutation({
        mutationFn: async (data: any) => UploadMessageMedia(Token, data),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                openImageModal(res?.data?.files)
            }
        },
        onError: (err: any) => {
            if (err?.response) {
                if(err.response.status === 413){
                    setImageModal(false);
                }
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
                formData.append("optimize", true);
                formData.append("createThumbnail", true)

                setImageModal(true);

                uploadMeadiaMutation.mutate(formData);
            }
        } catch (err) {
            console.log(err);
        }
    };

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
        queryFn: () => GetRoomMessages(Token, RoomData?._id, 200),
        enabled: !!Token,
    })

    //* 🔹 Send image message
    const sendImageMessage = () => {
        if (!imageInput || !imageInput.trim()) {
            showToast("info", "Please add a message or image before sending.");
            return;
        }

        if (socket && socketConnected && conversationId) {
            const otherUserId = conversationId;
            socket.emit('send_room_message', {
                roomId: otherUserId,
                ...(imageInput && { content: imageInput }),
                messageType: documentType,
                mediaUrl: document?.mediaRecord?.url
            });
            QueryInvalidater.invalidateQueries({ queryKey: ['chatroom_message'] });
        }
        setImageInput('');
    };

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
                    <TouchableOpacity style={styles.dt_sendButton} onPress={sendMessage} >
                        <SendIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
    )
}

export default ChatroomChatboxScreen