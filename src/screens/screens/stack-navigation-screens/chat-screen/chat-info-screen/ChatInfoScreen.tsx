/**React Imports */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ChatScreenStyles as styles } from '../styles'
import { CommonStyles as CommonStyles } from '../../../common/CommonStyle'
import { IconProps } from '../../../../../utils/helpers/Iconprops'
import { ms, toast } from '../../../../../utils/helpers/responsive'
import { DeleteGroup, GetGroupMembers, LeaveGroup } from '../../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../../utils/context/auth-context/AuthContext'
import { MemberItemProps } from '../../../../../utils/types/types'
import { Colors } from '../../../../../utils/constant/Constant'

/**Components */
import ScreenLayout from '../../../common/ScreenLayout'
import ModalAction from '../../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../../components/modal/modal-content/logout-content/ModalContent'
import ScrollContent from '../../../../../components/scrollcontent/ScrollContent'
import Loader from '../../../../../components/loader/Loader'

/**Icons*/
import LeaveIcon from '@svgs/user-logout.svg'
import DeleteIcon from '@svgs/cross.svg'

/** Liabary*/
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

type Props = {
    route: any
}

const ChatInfoScreen: React.FC<Props> = ({ route }) => {

    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { chat, type } = route.params || {}
    const { Token, user } = useAuth()
    const Navigation = useNavigation<any>()

    const { data: groupFriends, isLoading: groupFriendsLoading, refetch: groupFriendsRefetch } = useQuery({
        queryKey: ["single_group_friends"],
        queryFn: () => GetGroupMembers(Token, chat?.group?._id),
        enabled: !!Token
    })

    const LeavegroupMutation = useMutation({
        mutationFn: (id: any) => LeaveGroup(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                Navigation.navigate("DrawerNavigator", { screen: 'MessengerScreen', params: { key: "group_messenger" }, })
            }
        }
    })

    const DeletegroupMutation = useMutation({
        mutationFn: (id: any) => DeleteGroup(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                Navigation.navigate("DrawerNavigator", { screen: 'MessengerScreen', params: { key: "group_messenger" }, })
            }
        }
    })

    const CreaterData = groupFriends?.data?.members?.find((item: any) => item?.role === "creator")

    const isUser = user?.id === CreaterData?.user?._id

    const MemberItem: React.FC<MemberItemProps> = ({ name, isOnline, photo, id }) => {
        const isUser = user?.id === id
        const handleNavigation = () => {
            if (isUser) {
                Navigation.navigate("ProfileScreen")
            } else {
                Navigation.navigate("ProfileScreen", { userId: id, type: "friends" })
            }
        }

        return (
            <TouchableOpacity
                style={styles.dt_messenger_wrapper}
                activeOpacity={0.7}
                onPress={handleNavigation}
            >
                <View style={styles.dt_image_container}>
                    <Image source={photo ? { uri: photo } : require('@images/dummy.png')} style={styles.dt_image} />
                </View>
                <View style={styles.dt_text_container}>
                    {
                        isUser ? (
                            <View style={styles.dt_name_wrapper}>
                                <Text style={[styles.dt_name, { textTransform: "capitalize" }]}>You </Text>
                            </View>
                        ) : (
                            <>
                                <View style={styles.dt_name_wrapper}>
                                    <Text style={[styles.dt_name, { textTransform: "capitalize" }]}>{name} </Text>
                                </View>
                                <View style={styles.dt_location_wrapper}>
                                    <Text style={[styles.dt_text, { color: isOnline ? Colors.dt_success_green : Colors.dt_gray }]}>
                                        {isOnline ? "Online" : "Offline"}
                                    </Text>
                                </View>
                            </>
                        )
                    }

                </View>
            </TouchableOpacity>
        )
    };

    const HandleLeaveGroup = () => {
        setShowLeaveModal(false)
        LeavegroupMutation.mutate(chat?.group?._id)
    }

    const HandleDeleteGroup = () => {
        setShowDeleteModal(false)
        DeletegroupMutation.mutate(chat?.group?._id)
    }

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: chat?.name ?? "Chat Info",
                ...(type === "group" && {
                    headerChildren: (
                        <View style={styles.dt_menu_wrapper}>
                            {
                                !isUser && (
                                    <TouchableOpacity style={styles.dt_menu_container} onPress={() => setShowLeaveModal(true)}>
                                        <LeaveIcon {...IconProps(ms(18))} fill={Colors.dt_error} />
                                    </TouchableOpacity>
                                )
                            }
                            {
                                isUser && (
                                    <TouchableOpacity style={styles.dt_menu_container} onPress={() => setShowDeleteModal(true)}>
                                        <DeleteIcon {...IconProps(ms(25))} fill={Colors.dt_error} />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    ),
                })
            }}
        >
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={groupFriendsRefetch}
            >
                <View style={styles.dt_wrapper}>
                    <View style={styles.dt_group_image_container_wrapper}>
                        <View style={styles.dt_group_image_wrapper}>
                            <Image source={chat?.group?.coverImage ? { uri: chat?.group?.coverImage } : require('@images/dummy.png')} style={styles.dt_group_image} />
                        </View>
                    </View>
                    <View style={{ width: "80%", marginTop: ms(16) }}>
                        <Text style={[styles.dt_name, { textAlign: "center", lineHeight: ms(20) }]}>{chat?.group?.description}</Text>
                    </View>
                </View>
                {
                    groupFriendsLoading ? (
                        <Loader />
                    ) : (
                        <View style={CommonStyles.dt_container}>
                            <Text style={styles.dt_admin_text}>Admin</Text>
                            <MemberItem
                                {...{
                                    name: CreaterData?.user?.username ?? "--",
                                    isOnline: CreaterData?.user?.isOnline,
                                    photo: CreaterData?.user?.profile?.photos[0],
                                    id: CreaterData?.user?._id
                                }}
                            />

                            <View style={styles.dt_line} />
                            <Text style={styles.dt_admin_text}>Members ({groupFriends?.data?.members?.length})</Text>
                            <View style={{ gap: ms(16) }}>
                                {
                                    groupFriends?.data?.members?.map((item: any, index: number) => {

                                        if (item?.role === "creator") return null;

                                        return (
                                            <MemberItem
                                                key={index}
                                                {...{
                                                    name: item?.user?.username ?? "--",
                                                    isOnline: item?.user?.isOnline,
                                                    photo: item?.user?.profile?.photos[0],
                                                    id: item?.user?._id
                                                }}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </View>
                    )
                }
            </ScrollContent>
            <ModalAction
                isModalVisible={showDeleteModal}
                setModalVisible={setShowDeleteModal}
                headerText="Delete Group"
            >
                <ModalContent
                    {...{
                        setModal: setShowLeaveModal,
                        title: `Do you want to delete this group?`,
                        successText: "Yes, Delete Group",
                        cancelText: "No, Stay",
                        onSuccess: HandleDeleteGroup
                    }}
                />
            </ModalAction>
            <ModalAction
                isModalVisible={showLeaveModal}
                setModalVisible={setShowLeaveModal}
                headerText="Leave Group"
            >
                <ModalContent
                    {...{
                        setModal: setShowLeaveModal,
                        title: `Do you want to leave this group?`,
                        successText: "Yes, Leave Group",
                        cancelText: "No, Stay",
                        onSuccess: HandleLeaveGroup
                    }}
                />
            </ModalAction>
        </ScreenLayout >
    )
}

export default ChatInfoScreen