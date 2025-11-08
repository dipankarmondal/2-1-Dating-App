/**React Imports */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { DeleteChatRoom, GetRoom, LeaveChatRoom } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { ms, toast } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ChatroomCard from '../../../../components/chatroom-card/ChatroomCard'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import TopMenu from '../../../../components/top-menu'
import { CgatRoomTabs, ChatroomFilterOptions, TravelOptions } from '../../../../components/common/helper'
import SearchBox from '../../../../components/search-box/SearchBox'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'

/** Liabary*/
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import ToggleSwitch from '../../../../components/toggle-switch'
import { Colors, Fonts } from '../../../../utils/constant/Constant'

/**Main export*/
const ChatroomScreen: React.FC = () => {
    const Navigation = useNavigation<any>()
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();
    const isFocused = useIsFocused();

    const [activeKey, setActiveKey] = useState("all_public_room");
    const [search, setSearch] = useState<string>("");
    const [chatroomDeteleModal, setChatroomDeteleModal] = useState(false);
    const [chatroomLeaveModal, setchatroomLeaveModal] = useState(false);
    const [modalSelectId, setModalSelectId] = useState<any>(null);
    const [filterModal, setSetFilterModal] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [showBlock, setShowBlock] = useState(false);

    useEffect(() => {
        if (isFocused) {
            setSelected("");
            setShowBlock(false);
        }
    }, [isFocused]);

    const URL = activeKey === "all_public_room" ? "/chatrooms" : "/chatrooms/my"

    const { data: ChatRoomData, refetch, isLoading } = useQuery({
        queryKey: ['GetChatRoom', URL, activeKey, search, selected, showBlock],
        queryFn: () => GetRoom(Token, URL, search, selected, showBlock),
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
    const OnModalFormClick = () => {
        setSelected("");
        setSetFilterModal(false);
        setShowBlock(false);

    };

    const Refresh = () => {
        refetch()
        setSelected("");
        setShowBlock(false);
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
                onRefresh={Refresh}
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
                            isFilter: activeKey === "all_public_room" && true,
                            setSetFilterModal
                        }}
                    />
                    { isLoading ? <Loader /> :
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
            <ModalAction
                isModalVisible={filterModal}
                setModalVisible={setSetFilterModal}
                headerText="Filters"
                type="filters"
                onModalClick={OnModalFormClick}
                selected={selected}
                setSelected={setSelected}
            >
                <ModalSelectContent
                    {...{
                        filterData: ChatroomFilterOptions,
                        setModalVisible: setSetFilterModal,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
                <View style={styles.dt_filter_box}>
                    <Text style={styles.dt_filter_text}>Show blocked single males</Text>
                    <ToggleSwitch
                        isActive={showBlock}
                        onToggle={() => setShowBlock(!showBlock)}
                    />
                </View>
            </ModalAction>
        </ScreenLayout>
    )
}

export default ChatroomScreen

const styles = StyleSheet.create({
    dt_filter_box: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: ms(15),
        backgroundColor: Colors.dt_gray + "33",
        paddingVertical: ms(10),
        paddingHorizontal: ms(10),
        borderRadius: ms(8)
    },
    dt_filter_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(14),
        color: Colors.dt_white
    }
})