/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ChatroomCard from '../../../../components/chatroom-card/ChatroomCard'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteChatRoom, GetRoom, LeaveChatRoom } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import TopMenu from '../../../../components/top-menu'
import { CgatRoomTabs } from '../../../../components/common/helper'
import SearchBox from '../../../../components/search-box/SearchBox'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'
import { toast } from '../../../../utils/helpers/responsive'

/**Main export*/
const ChatroomScreen: React.FC = () => {
    const Navigation = useNavigation<any>()
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();

    const [activeKey, setActiveKey] = useState("all_public_room");
    const [search, setSearch] = useState<string>("");
    const [chatroomDeteleModal, setChatroomDeteleModal] = useState(false);
    const [chatroomLeaveModal, setchatroomLeaveModal] = useState(false);
    const [modalSelectId, setModalSelectId] = useState<any>(null);

    const URL = activeKey === "all_public_room" ? "/chatrooms" : "/chatrooms/my"

    const { data: ChatRoomData, refetch, isLoading } = useQuery({
        queryKey: ['GetChatRoom', URL, activeKey, search],
        queryFn: () => GetRoom(Token, URL, search),
        enabled: !!Token
    })

    const DeleteChatroomMutation = useMutation({
        mutationFn: (id: string) => DeleteChatRoom(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GetChatRoom'] });
                setChatroomDeteleModal(false)
            }
        }
    })

    const LeaveChatroomMutation = useMutation({
        mutationFn: (id: string) => LeaveChatRoom(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                setchatroomLeaveModal(false)
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GetChatRoom'] });
            }
        }
    })

    const handleDeleteModal = (id: any) => {
        setModalSelectId(id)
        setChatroomDeteleModal(true)
    }
    const handleLeaveModal = (id: any) => {
        setModalSelectId(id)
        setchatroomLeaveModal(true)
    }
    const handleDeletechatroom = () => {
        DeleteChatroomMutation.mutate(modalSelectId)
    }
    const handleLeavechatroom = () => {
        LeaveChatroomMutation.mutate(modalSelectId)
    }

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Chatrooms</Text>
                <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("AddChatroomScreen") }}>
                    <Text style={CommonStyles.dt_speed_date_text}>Add Chatroom</Text>
                </TouchableOpacity>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch}
            >
                <TopMenu {...{
                    MenuData: CgatRoomTabs,
                    activeKey,
                    setActiveKey,
                    isTwoItem: true
                }} />

                <View style={CommonStyles.dt_container}>
                    <SearchBox
                        {...{
                            search,
                            setSearch,
                            placeholder: "Search chatrooms here...",
                        }}
                    />
                    {isLoading ? <Loader /> :
                        ChatRoomData?.data?.length > 0 ? (
                            ChatRoomData?.data
                                ?.slice()
                                ?.sort((a: any, b: any) => {
                                    if (a?.isParticipant === b?.isParticipant) return 0;
                                    return a?.isParticipant ? -1 : 1;
                                })
                                ?.map((item: any, index: number) => {
                                    return (
                                        <ChatroomCard
                                            key={index}
                                            {...{
                                                item,
                                                handleDeleteModal: () => handleDeleteModal(item?._id),
                                                handleLeaveModal: () => handleLeaveModal(item?._id),
                                                deleteLoader: DeleteChatroomMutation,
                                                leaveLoader: LeaveChatroomMutation
                                            }}
                                        />
                                    )
                                })
                        ) : (
                            <NotFound
                                {...{
                                    title: "No chatrooms found. Start a new conversation by creating a chatroom and invite friends to join your chatroom chat.",
                                    photo: require("@images/notFound/group_chat.png")
                                }}
                            />
                        )
                    }
                </View>
            </ScrollContent>
            <ModalAction
                isModalVisible={chatroomDeteleModal}
                setModalVisible={setChatroomDeteleModal}
                headerText="Delete chatroom"
                type="filters"
            >
                <ModalContent
                    {...{
                        setModal: setChatroomDeteleModal,
                        title: "Are you sure you want to delete this chatroom?",
                        successText: "Yes, Delete chatroom",
                        cancelText: "No, Cancel",
                        onSuccess: handleDeletechatroom
                    }}
                />
            </ModalAction>
            <ModalAction
                isModalVisible={chatroomLeaveModal}
                setModalVisible={setchatroomLeaveModal}
                headerText="Leave chatroom"
                type="filters"
            >
                <ModalContent
                    {...{
                        setModal: setchatroomLeaveModal,
                        title: "Are you sure you want to leave this chatroom?",
                        successText: "Yes, Leave chatroom",
                        cancelText: "No, Cancel",
                        onSuccess: handleLeavechatroom
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default ChatroomScreen

