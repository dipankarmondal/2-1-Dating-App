/**React Imports */
import { View, TextInput, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { HomeScreenStyles as styles } from './styles'
import { CommonStyles } from '../../common/CommonStyle'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors } from '../../../../utils/constant/Constant'
import { MessengerItems } from '../../../../components/common/helper'
import { createModalBtn, optionsData } from './helper'
import { GetPersonalConversationsList } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useSocket } from '../../../../utils/context/socket-context/SocketProvider'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import TopMenu from '../../../../components/top-menu'
import MessageList from '../../../../components/message-list/MessageList'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'
import ModalButtons from '../../../../components/modal/modal-content/modal-buttons/ModalButtons'
import ModalMultiSelecter from '../../../../components/modal/modal-content/modal-multi-selecter/ModalMultiSelecter'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Icons*/
import SearchIcon from '@svgs/search.svg'
import FilterIcon from '@svgs/filter.svg'

/** Liabary*/
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useIsFocused } from '@react-navigation/native'

type Props = {
    route?: any
}

/**Local Import*/
const MessengerScreen: React.FC<Props> = ({ route }) => {
    const [activeKey, setActiveKey] = useState("messenger");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [showTyping, setShowTyping] = useState(null);

    console.log("object", selectedChat?.otherParticipant?.username)

    const QueryInvalidater = useQueryClient();
    const isFocused = useIsFocused();

    const { Token } = useAuth();
    const { socket, socketConnected } = useSocket();

    const { key } = route.params || {}

    useEffect(() => {
        if (key) {
            setActiveKey(key);
        }
    }, [key, isFocused]);

    useEffect(() => {
        if (!socket || !socketConnected || !isFocused) return;
        const handleNewMessage = (message: any) => {
            QueryInvalidater.invalidateQueries({ queryKey: ['MessageUserList', activeKey] });
        };
        socket.on(activeKey === 'messenger' ? 'new_personal_message' : 'new_group_message', handleNewMessage);
        socket.on(activeKey === 'messenger' ? 'user_typing' : 'group_typing_start', (data: any) => {
            setShowTyping(data);
        });
        return () => {
            socket.off(activeKey === 'messenger' ? 'new_personal_message' : 'new_group_message', handleNewMessage);
        };
    }, [socket, socketConnected, isFocused]);

    const handleMorePress = (data: any) => {
        setSelectedChat(data);
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

    const URL = activeKey === "messenger" ? "/personal-messages/conversations" : "/group-messages/conversations";

    const { data: MessageUserList, isLoading, refetch: MessageUserListRefetch } = useQuery({
        queryKey: ['MessageUserList', activeKey],
        queryFn: () => GetPersonalConversationsList(Token, URL),
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
                onRefresh={MessageUserListRefetch}
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
                            isLoading ? (
                                <Loader />
                            ) : (
                                MessageUserList?.data?.length > 0 ? (
                                    MessageUserList?.data?.map((chat: any, index: number) => {
                                        return (
                                            <MessageList
                                                key={index}
                                                {...{
                                                    chat,
                                                    onMorePress: handleMorePress,
                                                    type: "single",
                                                    MessageData: MessageUserList,
                                                    showTyping,
                                                }}
                                            />
                                        )
                                    })
                                ) : (
                                    <NotFound
                                        {...{
                                            title: "No conversations available at the moment. Try sending a new message or checking your connections",
                                            photo: require("@images/notFound/message_not.png")
                                        }}
                                    />
                                )
                            )
                        ) : (
                            isLoading ? (
                                <Loader />
                            ) : (
                                MessageUserList?.data?.length > 0 ? (
                                    MessageUserList?.data?.map((chat: any, index: number) => {
                                        return (
                                            <MessageList
                                                key={index}
                                                {...{
                                                    chat,
                                                    onMorePress: handleMorePress,
                                                    type: "group",
                                                    MessageData: MessageUserList,
                                                    showTyping,
                                                }}
                                            />
                                        )
                                    })
                                ) : (
                                    <NotFound
                                        {...{
                                            title: "Currently, there are no groups to display. Please check again later or create one",
                                            photo: require("@images/notFound/groupchat_not.png")
                                        }}
                                    />
                                )
                            )
                        )

                    }
                </View>
            </ScrollContent>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText={activeKey === "messenger" ? `${selectedChat?.otherParticipant?.username}` : `${selectedChat?.group?.name}`}
            >
                <View style={styles.dt_buttons_wrapper}>
                    {createModalBtn(handlers, activeKey)?.map((item, index) => {
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
                headerText={`Delete chat with ${activeKey === "messenger" ? `${selectedChat?.otherParticipant?.username}` : `${selectedChat?.group?.name}`}?`}
            >
                <ModalContent
                    {...{
                        setModal: setShowDeleteModal,
                        title: `Do you want to delete this chat with ${activeKey === "messenger" ? `${selectedChat?.otherParticipant?.username}` : `${selectedChat?.group?.name}`}?`,
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
