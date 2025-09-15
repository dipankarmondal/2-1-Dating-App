/**React Imports */
import { View, Text, TextInput, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { HomeScreenStyles as styles } from './styles'
import { CommonStyles } from '../../common/CommonStyle'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors } from '../../../../utils/constant/Constant'
import { chats, MessengerItems } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import TopMenu from '../../../../components/top-menu'
import MessageList from '../../../../components/message-list/MessageList'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'

/**Icons*/
import SearchIcon from '@svgs/search.svg'
import DeleteIcon from '@svgs/delete.svg'
import ViewIcon from '@svgs/setting/views.svg'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'

/**Local Import*/
const MessengerScreen: React.FC = () => {
    const [activeKey, setActiveKey] = useState("messenger");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedChat, setSelectedChat] = useState<{ id: string; name: string } | null>(null);

    const handleMorePress = (id: string, name: string) => {
        setSelectedChat({ id, name });
        setShowDropdown(true);
    };

    const DeleteBtnClick = () => {
        setShowDropdown(false);
        setTimeout(() => setShowDeleteModal(true), 300);
    }
    return (
        <ScreenLayout>
            <TopMenu {...{
                MenuData: MessengerItems,
                activeKey,
                setActiveKey,
                isTwoItem: true
            }} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={CommonStyles.dt_container}>
                    <View style={styles.dt_search_wrapper}>
                        <SearchIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                        <TextInput placeholder='Search...'
                            placeholderTextColor={Colors.dt_gray}
                            style={styles.dt_search_input}
                            selectionColor={Colors.dt_white}
                        />
                    </View>
                    {chats.map((chat) => (
                        <MessageList
                            key={chat.id}
                            {...{
                                chat,
                                onMorePress: handleMorePress
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText={`${selectedChat?.name}` || "--"}
            >
                <View style={styles.dt_buttons_wrapper}>
                    <TouchableOpacity style={styles.dt_buttons}>
                        <ViewIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                        <Text style={[styles.dt_btn_text, { color: Colors.dt_white }]}>View Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dt_buttons} onPress={DeleteBtnClick}>
                        <DeleteIcon {...IconProps(ms(17))} fill={Colors.dt_error} />
                        <Text style={[styles.dt_btn_text, { color: Colors.dt_error }]}>Delete Chat</Text>
                    </TouchableOpacity>
                </View>
            </ModalAction>
            <ModalAction
                isModalVisible={showDeleteModal}
                setModalVisible={setShowDeleteModal}
                headerText={`Delete chat with ${selectedChat?.name}?`}
            >
                <ModalContent
                    {...{
                        setModal: setShowDeleteModal,
                        title: `Do you want to delete this chat with ${selectedChat?.name}?`,
                        successText: "Yes, Delete Chat",
                        cancelText: "No, Keep Chat",
                        onSuccess: () => {
                            setShowDeleteModal(false);
                            setSelectedChat(null);
                        }
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default MessengerScreen
