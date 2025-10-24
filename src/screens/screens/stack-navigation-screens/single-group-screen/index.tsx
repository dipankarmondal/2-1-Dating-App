/**React Imports */
import { View } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { DeleteGroup, GetGroupMembers, GetSingleGroup, LeaveGroup } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { SingleGroupMenuItems } from '../../../../components/common/helper'
import { ms, toast } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import TopMenu from '../../../../components/top-menu'
import MembersTab from './group-tab-content/MembersTab'
import GroupCard from '../../../../components/group-card/GroupCard'

/** Liabary*/
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Loader from '../../../../components/loader/Loader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'
import { useNavigation } from '@react-navigation/native'

type Props = {
    route: any
}

/**Main export*/
const SingleGroupScreen: React.FC<Props> = ({ route }) => {

    const [activeKey, setActiveKey] = useState("members");
    const [groupDeteleModal, setGroupDeteleModal] = useState(false);
    const [groupLeaveModal, setGroupLeaveModal] = useState(false);
    const [modalSelectId, setModalSelectId] = useState<any>(null)

    const { groupName, groupId,isMyGroup } = route?.params || {}
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();
    const Navigation = useNavigation<any>()

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["single_group"],
        queryFn: () => GetSingleGroup(Token, groupId),
        enabled: !!Token
    })

    const { data: groupFriends, isLoading: groupFriendsLoading,refetch: groupFriendsRefetch } = useQuery({
        queryKey: ["single_group_friends"],
        queryFn: () => GetGroupMembers(Token, groupId),
        enabled: !!Token
    })

    const GroupData = {
        name: data?.data?.group?.name,
        coverImage: data?.data?.group?.coverImage,
        location: data?.data?.group?.location,
        id: data?.data?.group?._id,
        userName: data?.data?.group?.creator?.username,
        memberCount: data?.data?.group?.memberCount,
        createDate: data?.data?.group?.createdAt,
        createdId: data?.data?.group?.creator?._id,
        isUserJoined: data?.data?.group?.userMembership?.status,
        groupId: data?.data?.group?._id
    }

    const DeleteGroupMutation = useMutation({
        mutationFn: (id: any) => DeleteGroup(Token, id),
        onSuccess: (res: any) => {
            if(res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
                Navigation.goBack();
            }
        }
    }) 
    
    const LeaveGroupMutation = useMutation({
        mutationFn: (id: any) => LeaveGroup(Token, id),
        onSuccess: (res: any) => {
            if(res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['single_group'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['my_groups'] });
                if(isMyGroup === true){
                    Navigation.goBack();
                }
            }
        }
    })

    const handleDeleteGroup = () => {
        console.log("object", "action")
        setGroupDeteleModal(false),
        DeleteGroupMutation.mutate(modalSelectId)
    }
    const handleLeaveGroup = () => {
        setGroupLeaveModal(false)
        LeaveGroupMutation.mutate(modalSelectId)
    }

    return (
        <ScreenLayout type="stack" title={groupName ?? "group"}>
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={refetch}>
                <View style={CommonStyles.dt_container}>
                    {
                        isLoading || groupFriendsLoading ? <Loader /> : (
                            <>
                                <GroupCard
                                    {...{
                                        type: "single_group",
                                        GroupData,
                                        isDeleteModal: setGroupDeteleModal,
                                        isLeaveModal: setGroupLeaveModal,
                                        ModalSelectData: setModalSelectId,
                                    }}
                                />
                                <View style={{ borderRadius: ms(5), overflow: "hidden" }}>
                                    <TopMenu {...{
                                        MenuData: SingleGroupMenuItems,
                                        activeKey,
                                        setActiveKey,
                                    }} />
                                </View>
                                {
                                    activeKey === "members" ? <MembersTab Data={groupFriends?.data?.members} /> : null
                                }
                            </>
                        )
                    }

                </View>
            </ScrollContent>
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
        </ScreenLayout>
    )
}

export default SingleGroupScreen