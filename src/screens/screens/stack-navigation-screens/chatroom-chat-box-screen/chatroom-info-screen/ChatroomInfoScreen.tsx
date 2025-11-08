/**React Imports */
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

/** Liabary*/
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

/**Local imports*/
import { DeleteChatRoom, GetRoomDetails, LeaveChatRoom, ReportChatroom } from '../../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../../utils/context/auth-context/AuthContext'
import ScrollContent from '../../../../../components/scrollcontent/ScrollContent'
import { ChatroomChatboxScreenStyles as styles } from '../styles'
import { ms, toast } from '../../../../../utils/helpers/responsive'
import { Colors } from '../../../../../utils/constant/Constant'
import { CommonStyles } from '../../../common/CommonStyle'
import { IconProps } from '../../../../../utils/helpers/Iconprops'

/**Components */
import ScreenLayout from '../../../common/ScreenLayout'
import ModalContent from '../../../../../components/modal/modal-content/logout-content/ModalContent'
import ModalAction from '../../../../../components/modal/modal-action/ModalAction'

/**Icons*/
import LeaveIcon from '@svgs/user-logout.svg'
import DeleteIcon from '@svgs/cross.svg'
import ReportIcon from '@svgs/report.svg'
import { useForm } from 'react-hook-form'
import { ChatroomReport, LoginBuilder } from '../../../../../utils/builders'
import CustomInput from '../../../../../components/form-utils/custom-input'
import SubmitButton from '../../../../../components/submit-button'
import DropdownInput from '../../../../../components/form-utils/dropdown-input'

type Props = {
    route: any
}

/**Main export*/
const ChatroomInfoScreen: React.FC<Props> = ({ route }) => {

    const { ID } = route.params || {}
    const { Token, user } = useAuth()
    const Navigation = useNavigation<any>()
    const QueryInvalidater = useQueryClient();

    const [chatroomDeteleModal, setChatroomDeteleModal] = useState(false);
    const [chatroomLeaveModal, setChatroomLeaveModal] = useState(false);
    const [ReportchatroomModal, setReportchatroomModal] = useState(false);

    const { control, handleSubmit, } = useForm()

    const { data: GetRoomDetailsData, isLoading: GetRoomDetailsLoading, refetch } = useQuery({
        queryKey: ["chatroom_details", ID],
        queryFn: () => GetRoomDetails(Token, ID),
    })

    const isUser = user?.id === GetRoomDetailsData?.data?.createdBy?._id

    const MemberItem: React.FC<any> = ({ name, photo, id }) => {

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
                            </>
                        )
                    }

                </View>
            </TouchableOpacity>
        )
    };

    const DeleteChatroomMutation = useMutation({
        mutationFn: (id: string) => DeleteChatRoom(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                Navigation.navigate("DrawerNavigator", { screen: 'ChatroomScreen' })
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
                Navigation.navigate("DrawerNavigator", { screen: 'ChatroomScreen' })
                setChatroomLeaveModal(false)
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GetChatRoom'] });
            }
        }
    })

    const ReportChatroomMutation = useMutation({
        mutationFn: (data: any) => ReportChatroom(Token, ID, data),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                setReportchatroomModal(false)
                Navigation.navigate("DrawerNavigator", { screen: 'ChatroomScreen' })
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GetChatRoom'] });
            }
        }
    })

    const handleDeletechatroom = () => {
        DeleteChatroomMutation.mutate(ID)
    }
    const handleLeavechatroom = () => {
        LeaveChatroomMutation.mutate(ID)
    }

    const ReportSubmit = (data: any) => {
        const payload = {
            reportType: data?.reason,
            description: data?.description,
        }
        ReportChatroomMutation.mutate(payload)
    }

    return (
        <ScreenLayout
            {...{
                title: GetRoomDetailsData?.data?.name ?? "Chatroom Info",
                type: "stack",
            }}
        >
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch}
            >
                <View style={styles.dt_wrapper}>
                    <View style={styles.dt_group_image_container_wrapper}>
                        <View style={styles.dt_group_image_wrapper}>
                            <Image source={GetRoomDetailsData?.data?.coverImage ? { uri: GetRoomDetailsData?.data?.coverImage } : require('@images/dummy.png')} style={styles.dt_group_image} />
                        </View>
                    </View>
                </View>
                <View style={CommonStyles.dt_container}>
                    <View style={styles.dt_messenger_wrapper}>
                        <View style={styles.dt_action_container}>
                            {
                                isUser ? (
                                    <TouchableOpacity style={styles.dt_btn_wrapper} onPress={() => setChatroomDeteleModal(true)}>
                                        <View style={styles.dt_menu_container} >
                                            {
                                                DeleteChatroomMutation?.isPending ?
                                                    <ActivityIndicator size={ms(15)} color={Colors.dt_white} />
                                                    :
                                                    <DeleteIcon {...IconProps(ms(23))} fill={Colors.dt_error} />
                                            }
                                        </View>
                                        <Text style={styles.dt_btn_text}>Delete Room</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.dt_btn_wrapper} onPress={() => setChatroomLeaveModal(true)}>
                                        <View style={styles.dt_menu_container} >
                                            {
                                                LeaveChatroomMutation?.isPending ?
                                                    <ActivityIndicator size={ms(15)} color={Colors.dt_white} />
                                                    :
                                                    <LeaveIcon {...IconProps(ms(18))} fill={Colors.dt_error} />
                                            }
                                        </View>
                                        <Text style={styles.dt_btn_text}>Leave Room</Text>
                                    </TouchableOpacity>

                                )
                            }
                            {
                                !isUser && (
                                    <TouchableOpacity style={styles.dt_btn_wrapper} onPress={() => setReportchatroomModal(true)}>
                                        <View style={styles.dt_menu_container} >
                                            <ReportIcon {...IconProps(ms(18))} fill={Colors.dt_error} />
                                        </View>
                                        <Text style={styles.dt_btn_text}>Report Room</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                    <Text style={styles.dt_admin_text}>Admin</Text>
                    <MemberItem
                        {...{
                            name: GetRoomDetailsData?.data?.createdBy?.username ?? "--",
                            photo: GetRoomDetailsData?.data?.createdBy?.profile?.photos[0],
                            id: GetRoomDetailsData?.data?.createdBy?._id
                        }}
                    />
                    <View style={styles.dt_line} />
                    <Text style={styles.dt_admin_text}>Members ({GetRoomDetailsData?.data?.participants?.length})</Text>
                    <View style={{ gap: ms(16) }}>
                        {
                            GetRoomDetailsData?.data?.participants?.map((item: any, index: number) => {
                                return (
                                    <MemberItem
                                        key={index}
                                        {...{
                                            name: item?.username ?? "--",
                                            photo: item?.profile?.photos[0],
                                            id: item?._id
                                        }}
                                    />
                                )
                            })
                        }
                    </View>
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
                setModalVisible={setChatroomLeaveModal}
                headerText="Leave chatroom"
                type="filters"
            >
                <ModalContent
                    {...{
                        setModal: setChatroomLeaveModal,
                        title: "Are you sure you want to leave this chatroom?",
                        successText: "Yes, Leave",
                        cancelText: "No, Cancel",
                        onSuccess: handleLeavechatroom
                    }}
                />
            </ModalAction>
            <ModalAction
                isModalVisible={ReportchatroomModal}
                setModalVisible={setReportchatroomModal}
                headerText="Report Chatroom"
                type="filters"
            >
                {ChatroomReport(control).map((item, index) => {
                    if (item.type === 'text' || item.type === 'textarea') {
                        return <CustomInput key={index} {...item} />;
                    } else if (item?.type === "dropdown") {
                        return <DropdownInput key={index} {...item} />;
                    }
                })}
                <View style={{ height: ms(150) }} />
                <View style={{ marginBottom: ms(20) }}>
                    <SubmitButton
                        {...{
                            text: "Report",
                            loading: ReportChatroomMutation?.isPending,
                            onPress: handleSubmit(ReportSubmit)
                        }}
                    />
                </View>
            </ModalAction>
        </ScreenLayout>
    )
}

export default ChatroomInfoScreen