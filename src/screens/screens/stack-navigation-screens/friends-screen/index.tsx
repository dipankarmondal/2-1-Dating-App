/**React Imports */
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'

/** Liabary*/
import { useIsFocused } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { friendsfilterOptions, TABS } from '../../../../components/common/helper'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { ms, toast } from '../../../../utils/helpers/responsive'
import { FriendsStyles as styles } from './styles'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { FriendRequestAction, GetFriendRequests, GetMyFriendsList, SendBroadcastMessage } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'

/**Icons*/
import SendIcon from '@svgs/send.svg'
import SearchBox from '../../../../components/search-box/SearchBox'

/**Main export*/
const FriendsScreen: React.FC = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState("");
    const [activeTab, setActiveTab] = useState("all_friends");
    const [selectionAction, setSelectionAction] = useState(null);
    const [selectedId, setSelectedId] = useState<any>(null);
    const [selectedFriendsIds, setselectedFriendsIds] = useState<string[]>([]);
    const [modalBroadcast, setModalBroadcast] = useState(false);
    const [broadcastMessage, setBroadcastMessage] = useState("");
    const [search, setSearch] = useState("");

    const isFocused = useIsFocused();
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();

    useEffect(() => {
        if (isFocused) setSelected("");
    }, [isFocused]);

    const { data: friendData, isLoading: friendLoading, refetch: friendRefetch } = useQuery({
        queryKey: ["my_all_friends", search],
        queryFn: () => GetMyFriendsList(Token,search),
        enabled: !!Token
    })
    console.log("object", friendData)
    const { data: friendRequestData, isLoading: friendRequestLoading, refetch: friendRequstRefetch } = useQuery({
        queryKey: ["my_friends_requests"],
        queryFn: () => GetFriendRequests(Token, "received", "pending"),
        enabled: !!Token
    })

    const handleFriendRequest = useMutation({
        mutationFn: ({ id, data }: { id: any; data: any }) => FriendRequestAction(Token, id, data),
        onSuccess: (res, data) => {
            setSelectionAction(null); // reset after success
            setSelectedId(null);
            toast("success", { title: "Action successfully" });
            QueryInvalidater.invalidateQueries({ queryKey: ['my_friends_requests'] });
            QueryInvalidater.invalidateQueries({ queryKey: ['my_all_friends'] });
        },
    })

    const handleAccept = (id: any) => {
        setSelectionAction("accept");
        setSelectedId(id);
        const payload = { action: "accept", }
        handleFriendRequest.mutate({ id, data: payload });
    }
    const handleDecline = (id: any) => {
        setSelectionAction("decline");
        setSelectedId(id);
        const payload = { action: "decline" }
        handleFriendRequest.mutate({ id, data: payload });
    }

    const handleBroadcast = (id: string) => {
        // setIsChecked((prev) => !prev);
        setselectedFriendsIds((prevSelected) => {
            if (prevSelected.includes(id)) {
                // Remove if already selected
                return prevSelected.filter((itemId) => itemId !== id);
            } else {
                // Add if not selected
                return [...prevSelected, id];
            }
        });
    };

    const BroadcastMutation = useMutation({
        mutationFn: (data: any) => SendBroadcastMessage(Token, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                setselectedFriendsIds([]);
                setBroadcastMessage("");
                setModalBroadcast(false);
                toast("success", { title: "Broadcast successfully" });
            }

        },
    })

    const SendBroadcast = () => {
        const payload = {
            friendIds: selectedFriendsIds,
            messageType: "text",
            content: broadcastMessage,
        }
        BroadcastMutation.mutate(payload);
    }

    const handleOpenModal = () => {
        if (selectedFriendsIds.length > 0) {
            setModalBroadcast(true);
        } else {
            toast("error", { title: "Please select at least one friend" });
        }
    };

    return (
        <ScreenLayout type="stack" title="Friends">
            <ScreenHeader>
                <View style={CommonStyles.dt_filter_container_btn}>
                    {TABS.map(({ key, label }) => {
                        const isActive = activeTab === key;
                        return (
                            <TouchableOpacity
                                key={key}
                                style={[
                                    CommonStyles.dt_tab_btn,
                                    isActive && {
                                        backgroundColor: Colors.dt_card_blue,
                                        borderColor: Colors.dt_card_blue,
                                    },
                                ]}
                                onPress={() => setActiveTab(key)}
                            >
                                <Text
                                    style={[
                                        CommonStyles.dt_tab_btn_text,
                                        isActive && { color: Colors.dt_white },
                                    ]}
                                >
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity
                        style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]}
                        onPress={() => setShowDropdown((prev) => !prev)}
                    >
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>
                            Filter
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    activeTab === "all_friends" && (
                        <TouchableOpacity
                            style={[CommonStyles.dt_speed_date, { backgroundColor: Colors.dt_success_green }]}
                            onPress={handleOpenModal}
                        >
                            <Text style={CommonStyles.dt_speed_date_text}>Broadcast</Text>
                        </TouchableOpacity>
                    )
                }
            </ScreenHeader>

            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={async () => {
                    await Promise.all([friendRefetch(), friendRequstRefetch()]);
                }}
            >
                <View style={CommonStyles.dt_container}>
                    {
                        activeTab === "all_friends" && (
                            <SearchBox
                                {...{
                                    search,
                                    setSearch
                                }}
                            />
                        )
                    }
                    {
                        activeTab === "all_friends" && (
                            friendLoading ? (
                                <Loader />
                            ) : (
                                friendData?.data?.friends?.length > 0 ?
                                    friendData?.data?.friends?.map((item: any, index: number) => {
                                        const isFriendsChecked = selectedFriendsIds.includes(item?.id);
                                        return (
                                            <UserInfoCard
                                                key={index}
                                                type="user"
                                                item={item}
                                                isMore
                                                isUserContent={false}
                                                isFilterOption={false}
                                                isGallery={item?.profile?.photos?.length > 0 ? true : false}
                                                isChecked={isFriendsChecked}
                                                handleBroadcast={() => handleBroadcast(item?.id)}
                                                UserName={item?.username}
                                                profileImages={item?.profile?.photos}
                                                isBroadcastCheck={true}
                                            >
                                                <InfoCardLayoutOne
                                                    {...{
                                                        item
                                                    }}
                                                />
                                            </UserInfoCard>
                                        )
                                    }) : (
                                        <NotFound
                                            {...{
                                                title: "You don't have any friends yet. Invite people, follow others, or refresh to find connections",
                                                photo: require('@images/notFound/no_friends.png')
                                            }}
                                        />
                                    )
                            )
                        )
                    }
                    {
                        activeTab === "friends_request" && (
                            friendRequestLoading ? (
                                <Loader />
                            ) : (
                                friendRequestData?.data?.length > 0 ?
                                    friendRequestData?.data?.map((item: any, index: number) => {

                                        return (
                                            <UserInfoCard
                                                key={index}
                                                type="user"
                                                item={item?.senderId}
                                                isMore
                                                isUserContent={false}
                                                isFilterOption={false}
                                                isGallery={item?.senderId?.profile?.photos?.length > 0 ? true : false}
                                                UserName={item?.senderId?.username}
                                                profileImages={item?.senderId?.profile?.photos}
                                            >
                                                <InfoCardLayoutOne
                                                    {...{
                                                        item: item?.senderId,
                                                        type: "friends_request",
                                                        handleAcceptCall: () => handleAccept(item?._id),
                                                        handleDeclineCall: () => handleDecline(item?._id),
                                                        loader: handleFriendRequest.isPending,
                                                        selectionAction: selectionAction,
                                                        selectedId,
                                                        itemId: item?._id
                                                    }}
                                                />
                                            </UserInfoCard>
                                        )
                                    }) : (
                                        <NotFound
                                            {...{
                                                title: "You don't have any friends yet. Invite people, follow others, or refresh to find connections",
                                                photo: require('@images/notFound/no_friends.png')
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
                headerText="Filters"
                type="filters"
                onModalClick={() => setShowDropdown(false)}
                selected={selected}
                setSelected={setSelected}
            >
                <ModalSelectContent
                    filterData={friendsfilterOptions}
                    setModalVisible={setShowDropdown}
                    selected={selected}
                    setSelected={setSelected}
                />
            </ModalAction>
            <ModalAction
                isModalVisible={modalBroadcast}
                setModalVisible={setModalBroadcast}
                headerText="Start Broadcast"
                type="filters"
                onModalClick={() => setModalBroadcast(false)}
            >
                <View style={styles.dt_input_container}>
                    <TextInput
                        style={styles.dt_input}
                        placeholder="Enter Broadcast Message"
                        placeholderTextColor={Colors.dt_gray}
                        multiline
                        textAlignVertical="center"
                        scrollEnabled={false}
                        value={broadcastMessage}
                        onChangeText={(text) => setBroadcastMessage(text)}
                    />
                    <TouchableOpacity style={styles.dt_sendButton} onPress={SendBroadcast}>
                        {
                            BroadcastMutation.isPending ? (
                                <ActivityIndicator size={ms(28)} color={Colors.dt_white} />
                            ) : (
                                <SendIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                            )
                        }
                    </TouchableOpacity>
                </View>
            </ModalAction>
        </ScreenLayout>
    );
};

export default FriendsScreen;