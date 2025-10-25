/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ProfileContentStyles as styles } from '../styles'
import { ms, toast } from '../../../../utils/helpers/responsive'
import { ProfileExtraMenuItems, ProfileUserMenuItems } from '../../../common/helper'

/**Components */
import UserInfoCard from '../../../feed-content/userinfo-card/UserInfoCard'
import GroupCard from '../../../group-card/GroupCard'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteGroup, GetMyFriendsList, GetMyGroups, LeaveGroup } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import NotFound from '../../../notfound/NotFound'
import Loader from '../../../loader/Loader'
import { useNavigation } from '@react-navigation/native'
import ModalAction from '../../../modal/modal-action/ModalAction'
import ModalContent from '../../../modal/modal-content/logout-content/ModalContent'
import { Colors } from '../../../../utils/constant/Constant'

type Props = {
    activeKey: string,
    userType?: string
}
/**Main export*/
const ProfileTabContent: React.FC<Props> = ({ activeKey, userType }) => {

    const { Token } = useAuth()
    const Navigation = useNavigation()
    const QueryInvalidater = useQueryClient();

    const [groupLeaveModal, setGroupLeaveModal] = useState(false);
    const [modalSelectId, setModalSelectId] = useState<any>(null)
    const [groupDeteleModal, setGroupDeteleModal] = useState(false);

    const menuItems = userType ? ProfileUserMenuItems : ProfileExtraMenuItems
    const activeItem = menuItems.find(item => item.key === activeKey)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["my_groups"],
        queryFn: () => GetMyGroups(Token),
        enabled: !!Token
    })

    const DeleteGroupMutation = useMutation({
        mutationFn: (id: any) => DeleteGroup(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
                Navigation.goBack();
            }
        }
    })

    const LeaveGroupMutation = useMutation({
        mutationFn: (id: any) => LeaveGroup(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['my_groups'] });
            }
        }
    })

    const handleDeleteGroup = () => {
        setGroupDeteleModal(false),
            DeleteGroupMutation.mutate(modalSelectId)
    }

    const handleLeaveGroup = () => {
        setGroupLeaveModal(false)
        LeaveGroupMutation.mutate(modalSelectId)
    }

    // const { data: friendData, isLoading: friendLoading, refetch: friendRefetch } = useQuery({
    //     queryKey: ["my_all_friends"],
    //     queryFn: () => GetMyFriendsList(Token),
    //     enabled: !!Token
    // })

    // console.log("object", friendData)

    return (
        <View style={styles.dt_container}>
            <View style={[styles.dt_profile_header, { marginBottom: ms(10) }]}>
                <Text style={styles.dt_view_all_header_text}>{activeItem?.label}</Text>
                <TouchableOpacity style={styles.dt_view_all}>
                    <Text style={styles.dt_view_all_text}>View All</Text>
                </TouchableOpacity>
            </View>
            {/* {
                activeItem?.key === "groups" ?
                    <GroupCard /> :
                    <UserInfoCard />
            } */}
            <View style={{gap: ms(16), marginVertical:data?.data?.groups?.length > 0 ? ms(0) : ms(30)}}>
                {
                    activeKey === "groups" ? (
                        isLoading ? <Loader /> :
                            data?.data?.groups?.length > 0 ? (
                                data?.data?.groups?.map((item: any, index: number) => {
                                    const GroupData = {
                                        name: item?.group?.name,
                                        coverImage: item?.group?.coverImage,
                                        location: item?.group?.location,
                                        id: item?.group?._id,
                                        userName: item?.group?.creator?.username,
                                        memberCount: item?.group?.memberCount,
                                        createDate: item?.createdAt,
                                        createdId: item?.group?.creator?._id,
                                        isUserJoined: item?.status,
                                        groupId: item?.group?._id
                                    }
        
                                    return (
                                        <GroupCard
                                            key={index}
                                            {...{
                                                GroupData,
                                                isDeleteModal: setGroupDeteleModal,
                                                isLeaveModal: setGroupLeaveModal,
                                                ModalSelectData: setModalSelectId,
                                                isMyGroup: true
                                            }}
                                        />
                                    )
                                })
                            ) : (
                                <NotFound
                                    {...{
                                        title: "We couldn’t find any groups. Please refresh the page or create your first group",
                                        photo: require("@images/notFound/group_create.png")
                                    }}
                                />
                            )
                        
                    ) : (
                        <Text style={{color: Colors.dt_white}}>Work in progress...</Text>
                    )
                }
            </View>
            <ModalAction
                isModalVisible={groupDeteleModal}
                setModalVisible={setGroupDeteleModal}
                headerText="Delete Group"
                type="filters"
            >
                <ModalContent
                    {...{
                        setModal: setGroupDeteleModal,
                        title: "Are you sure you want to delete this group?",
                        successText: "Yes, Delete Group",
                        cancelText: "No, Cancel",
                        onSuccess: handleDeleteGroup
                    }}
                />
            </ModalAction>
            <ModalAction
                isModalVisible={groupLeaveModal}
                setModalVisible={setGroupLeaveModal}
                headerText="Leave Group"
                type="filters"
            >
                <ModalContent
                    {...{
                        setModal: setGroupLeaveModal,
                        title: "Are you sure you want to leave this group?",
                        successText: "Yes, Leave Group",
                        cancelText: "No, Cancel",
                        onSuccess: handleLeaveGroup
                    }}
                />
            </ModalAction>
        </View>
    )
}

export default ProfileTabContent