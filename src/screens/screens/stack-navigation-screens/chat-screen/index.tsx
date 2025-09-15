/**React Imports */
import { View, Text, KeyboardAvoidingView, Platform, FlatList, TextInput, TouchableOpacity } from 'react-native'
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

/**Icons*/
import SendIcon from '@svgs/send.svg'
import MicIcon from '@svgs/mic.svg'
import PlusIcon from '@svgs/plus.svg'
import DeleteIcon from '@svgs/delete.svg'
import EditIcon from '@svgs/edit.svg'

/** Liabary*/
import { launchImageLibrary } from 'react-native-image-picker';

type Props = {
    route: any
}
const ChatScreen: React.FC<Props> = ({ route }) => {
    const { chat } = route.params;

    const [messages, setMessages] = useState<any>([]);
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editText, setEditText] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    const flatListRef = useRef<FlatList>(null);

    /** 🔹 Create new message */
    const createMessage = (msg: Partial<any>): any => ({
        id: Date.now().toString(),
        sender: 'me',
        timestamp: new Date().toISOString(),
        ...msg,
    });

    /** 🔹 Send text message */
    const sendMessage = () => {
        if (!inputText.trim()) return;
        setMessages(prev => [createMessage({ text: inputText }), ...prev]);
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
                setMessages(prev => [createMessage({ image: file.uri }), ...prev]);
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

    return (
        <View style={styles.dt_container}>
            <ChatHeader chat={chat} />
            <KeyboardAvoidingView
                style={styles.dt_message_container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    inverted
                    contentContainerStyle={{ paddingVertical: 10 }}
                />

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

                    <TouchableOpacity style={styles.dt_sendButton}>
                        <MicIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
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