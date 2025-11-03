/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { TravelOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import GroupCard from '../../../../components/group-card/GroupCard'

/** Liabary*/
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteGroup, GetAllGroups, JoinGroup, LeaveGroup } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'
import { toast } from '../../../../utils/helpers/responsive'
import SearchBox from '../../../../components/search-box/SearchBox'

/**Main export*/
const GroupsScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [selected, setSelected] = useState<string>("");
    const [groupDeteleModal, setGroupDeteleModal] = useState(false);
    const [groupLeaveModal, setGroupLeaveModal] = useState(false);
    const [modalSelectId, setModalSelectId] = useState<any>(null)
    const [search, setSearch] = useState("");

    const isFocused = useIsFocused();
    const Navigation = useNavigation<any>()
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
    };

    const { data: GroupAllData, isLoading, refetch } = useQuery({
        queryKey: ["GroupAllData",search],
        queryFn: () => GetAllGroups(Token,search),
        enabled: !!Token,
    })
    console.log("object",search)

    const DeleteGroupMutation = useMutation({
        mutationFn: (id: any) => DeleteGroup(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
            }
        }
    })

    const LeaveGroupMutation = useMutation({
        mutationFn: (id: any) => LeaveGroup(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
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
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Groups</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("CreateGroup") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("MyGroupScreen") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>My Groups</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]} onPress={() => { setShowDropdown((prev) => !prev); }}>
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>

            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    <SearchBox 
                        {...{
                            search,
                            setSearch
                        }}
                    />
                    {isLoading ? <Loader /> :
                        GroupAllData?.data?.groups?.length > 0 ? (
                            GroupAllData?.data?.groups?.map((item: any, index: number) => {
                                const GroupData = {
                                    name: item?.name,
                                    coverImage: item?.coverImage,
                                    location: item?.location,
                                    id: item?._id,
                                    userName: item?.creator?.username,
                                    memberCount: item?.memberCount,
                                    createDate: item?.createdAt,
                                    createdId: item?.creator?._id,
                                    isUserJoined: item?.userMembership?.status,
                                    groupId: item?._id
                                }

                                return (
                                    <GroupCard
                                        key={index}
                                        {...{
                                            GroupData,
                                            isDeleteModal: setGroupDeteleModal,
                                            isLeaveModal: setGroupLeaveModal,
                                            ModalSelectData: setModalSelectId,
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
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Filters"
                type="filters"
                onModalClick={OnModalFormClick}
                selected={selected}
                setSelected={setSelected}
            >
                <ModalSelectContent
                    {...{
                        filterData: TravelOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
            </ModalAction>
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

export default GroupsScreen 