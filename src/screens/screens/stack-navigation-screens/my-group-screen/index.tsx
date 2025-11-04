/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { use, useState } from 'react'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import GroupCard from '../../../../components/group-card/GroupCard'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteGroup, GetMyGroups, LeaveGroup } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'
import { toast } from '../../../../utils/helpers/responsive'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Main export*/
const MyGroupScreen: React.FC = () => {

    const [groupLeaveModal, setGroupLeaveModal] = useState(false);
    const [modalSelectId, setModalSelectId] = useState<any>(null)
    const [groupDeteleModal, setGroupDeteleModal] = useState(false);

    const Navigation = useNavigation<any>()
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();

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

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "My Group",
            }}
        >
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>My Groups</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("CreateGroup") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.goBack() }}>
                        <Text style={CommonStyles.dt_speed_date_text}>All Groups</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch}
            >
                <View style={CommonStyles.dt_container}>
                    {isLoading ? <Loader /> :
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
                                            isMyGroup: true,
                                            item: item?.group
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

export default MyGroupScreen