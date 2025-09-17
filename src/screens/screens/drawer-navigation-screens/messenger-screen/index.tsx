/**React Imports */
import { View, TextInput, ScrollView, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { HomeScreenStyles as styles } from './styles'
import { CommonStyles } from '../../common/CommonStyle'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors } from '../../../../utils/constant/Constant'
import { MessengerItems } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import TopMenu from '../../../../components/top-menu'
import MessageList from '../../../../components/message-list/MessageList'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'

/**Icons*/
import SearchIcon from '@svgs/search.svg'
import FilterIcon from '@svgs/filter.svg'
import ModalButtons from '../../../../components/modal/modal-content/modal-buttons/ModalButtons'
import { chats, createModalBtn, groupMessages, optionsData } from './helper'
import ModalMultiSelecter from '../../../../components/modal/modal-content/modal-multi-selecter/ModalMultiSelecter'

/**Local Import*/
const MessengerScreen: React.FC = () => {
    const [activeKey, setActiveKey] = useState("messenger");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedChat, setSelectedChat] = useState<{ id: string; name: string } | null>(null);

    const handleMorePress = (id: string, name: string) => {
        setSelectedChat({ id, name });
        setShowDropdown(true);
    };

    const DeleteBtnClick = () => {
        setShowDropdown(false);
        setTimeout(() => setShowDeleteModal(true), 300);
    }

    const handlers: Record<string, () => void> = {
        "Pin": () => console.log("Pin Clicked"),
        "Unread": () => console.log("Unread Clicked"),
        "Mute": () => console.log("Mute Clicked"),
        "Archive": () => console.log("Archive Clicked"),
        "Move to Folder": () => console.log("Move to Folder Clicked"),
        "View Profile": () => console.log("View Profile Clicked"),
        "Delete Chat": () => DeleteBtnClick(),
        "Block": () => console.log("Block Clicked"),
        "Report": () => console.log("Report Clicked"),
    };
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
                        <TouchableOpacity style={styles.dt_filter_wrapper} onPress={() => setShowFilterModal(true)}>
                            <FilterIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                        </TouchableOpacity>
                    </View>
                    {
                        activeKey === "messenger" ? (
                            chats.map((chat) => (
                                <MessageList
                                    key={chat.id}
                                    {...{
                                        chat,
                                        onMorePress: handleMorePress,
                                        type:"single"
                                    }}
                                />
                            ))
                        ) : (
                            groupMessages?.map((chat) => (
                                <MessageList
                                    key={chat.id}
                                    {...{
                                        chat,
                                        onMorePress: handleMorePress,
                                        type:"group"
                                    }}
                                />
                            ))
                        )

                    }
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText={`${selectedChat?.name}` || "--"}
            >
                <View style={styles.dt_buttons_wrapper}>
                    {createModalBtn(handlers)?.map((item, index) => {
                        return (
                            <ModalButtons
                                key={index}
                                {...{
                                    item
                                }}
                            />
                        )
                    })}
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
            <ModalAction
                isModalVisible={showFilterModal}
                setModalVisible={setShowFilterModal}
                type="message"
            >
                <View style={styles.dt_buttons_wrapper}>
                    {
                        optionsData?.map((item, index) => {
                            return (
                                <ModalMultiSelecter
                                    key={index}
                                    {...{
                                        item
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </ModalAction>
        </ScreenLayout>
    )
}

export default MessengerScreen
