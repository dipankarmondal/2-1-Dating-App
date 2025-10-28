/**React Imports */
import { View, TextInput, ScrollView, TouchableOpacity, } from 'react-native'
import React, { use, useEffect, useState } from 'react'

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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GetPersonalConversationsList } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import { useSocket } from '../../../../utils/context/socket-context/SocketProvider'
import { useIsFocused } from '@react-navigation/native'

/**Local Import*/
const MessengerScreen: React.FC = () => {
    const [activeKey, setActiveKey] = useState("messenger");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedChat, setSelectedChat] = useState<{ id: string; name: string } | null>(null);
    const [showTyping, setShowTyping] = useState(null);

    const QueryInvalidater = useQueryClient();

    const { Token } = useAuth();
    const { socket, socketConnected } = useSocket();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!socket || !socketConnected || !isFocused) return;

        const handleNewMessage = (message: any) => {
            QueryInvalidater.invalidateQueries({ queryKey: ['MessageUserList', activeKey] });
        };
        socket.on('new_personal_message', handleNewMessage);
        socket.on('user_typing', (data: any) => {
            setShowTyping(data);
        });

        return () => {
            socket.off('new_personal_message', handleNewMessage);
        };
    }, [socket, socketConnected, isFocused]);


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

    const { data: MessageUserList, isLoading, refetch: MessageUserListRefetch } = useQuery({
        queryKey: ['MessageUserList', activeKey],
        queryFn: () => GetPersonalConversationsList(Token),
        enabled: !!Token
    })

    return (
        <ScreenLayout>
            <TopMenu {...{
                MenuData: MessengerItems,
                activeKey,
                setActiveKey,
                isTwoItem: true
            }} />
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={MessageUserListRefetch} // just pass refetch here
            >
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
                            MessageUserList?.data?.map((chat: any, index: number) => {
                                return (
                                    <MessageList
                                        key={index}
                                        {...{
                                            chat,
                                            onMorePress: handleMorePress,
                                            type: "single",
                                            MessageData: MessageUserList,
                                            showTyping
                                        }}
                                    />
                                )
                            })
                        ) : (
                            groupMessages?.map((chat) => {
                                return (
                                    <MessageList
                                        key={chat.id}
                                        {...{
                                            chat,
                                            onMorePress: handleMorePress,
                                            type: "group",
                                            MessageData: MessageUserList,
                                            showTyping
                                        }}
                                    />
                                )
                            })
                        )

                    }
                </View>
            </ScrollContent>
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
