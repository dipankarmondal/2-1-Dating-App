/**React Imports */
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ChatScreenStyles as styles } from '../styles'
import { CommonStyles as CommonStyles } from '../../../common/CommonStyle'
import { IconProps } from '../../../../../utils/helpers/Iconprops'
import { ms } from '../../../../../utils/helpers/responsive'
import { Colors } from '../../../../../utils/constant/Constant'

/**Components */
import ScreenLayout from '../../../common/ScreenLayout'
import ModalAction from '../../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../../components/modal/modal-content/logout-content/ModalContent'

/**Icons*/
import MuteIcon from '@svgs/mute.svg'
import LeaveIcon from '@svgs/user-logout.svg'
import LocationIcon from '@svgs/location.svg'
import { GetGroupMembers } from '../../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../../../../utils/context/auth-context/AuthContext'
import { useNavigation } from '@react-navigation/native'

type Props = {
    route: any
}

type MemberItemProps = {
    name: string;
    isOnline?: boolean,
    photo?: string,
    id: string
};

const ChatInfoScreen: React.FC<Props> = ({ route }) => {

    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const { chat, type } = route.params || {}
    const { Token, user } = useAuth()
    const Navigation = useNavigation<any>()

    const { data: groupFriends, isLoading: groupFriendsLoading, refetch: groupFriendsRefetch } = useQuery({
        queryKey: ["single_group_friends"],
        queryFn: () => GetGroupMembers(Token, chat?.group?._id),
        enabled: !!Token
    })

    console.log("object", chat )

    const CreaterData = groupFriends?.data?.members?.find((item: any) => item?.user?._id === chat?.group?.creator)

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

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: chat?.name ?? "Chat Info",
                ...(type === "group" && {
                    headerChildren: (
                        <View style={styles.dt_menu_wrapper}>
                            <TouchableOpacity style={styles.dt_menu_container}>
                                <MuteIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dt_menu_container} onPress={() => setShowLeaveModal(true)}>
                                <LeaveIcon {...IconProps(ms(16))} fill={Colors.dt_error} />
                            </TouchableOpacity>
                        </View>
                    ),
                })
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            </ScrollView>
            <ModalAction
                isModalVisible={showLeaveModal}
                setModalVisible={setShowLeaveModal}
                headerText="Delete Chat"
            >
                <ModalContent
                    {...{
                        setModal: setShowLeaveModal,
                        title: `Do you want to leave this group?`,
                        successText: "Yes, Leave Group",
                        cancelText: "No, Stay",
                        onSuccess: () => {
                            setShowLeaveModal(false);
                        }
                    }}
                />
            </ModalAction>
        </ScreenLayout >
    )
}

export default ChatInfoScreen