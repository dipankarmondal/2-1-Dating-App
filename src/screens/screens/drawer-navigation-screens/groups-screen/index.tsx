/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { TravelOptions } from '../../../../components/common/helper'
import { DeleteGroup, GetAllGroups, LeaveGroup } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { ms, toast } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import GroupCard from '../../../../components/group-card/GroupCard'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'
import SearchBox from '../../../../components/search-box/SearchBox'

/** Liabary*/
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { GroupFilter } from '../../../../utils/builders'
import DropdownInput from '../../../../components/form-utils/dropdown-input'
import SubmitButton from '../../../../components/submit-button'

/**Main export*/
const GroupsScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [groupDeteleModal, setGroupDeteleModal] = useState(false);
    const [groupLeaveModal, setGroupLeaveModal] = useState(false);
    const [modalSelectId, setModalSelectId] = useState<any>(null)
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(null);

    const Navigation = useNavigation<any>()
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();

    const { control, handleSubmit, reset } = useForm()

    const onFilter = (data: any) =>{
        setFilter(data)
        setShowDropdown(false)
        reset()
    }

    const {
        data: GroupAllData,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["GroupAllData", search,filter],
        queryFn: ({ pageParam = 1 }) => GetAllGroups(Token, search, 5, pageParam,filter),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.data?.pagination;
            if (pagination?.hasNext) {
                // increment current page
                return Number(pagination.page) + 1;
            }
            return undefined; // stop fetching when no more pages
        },
        enabled: !!Token,
    });

    const GroupsData = GroupAllData?.pages?.flatMap((page) => page?.data?.groups) || [];

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

    const handleScrollToEnd = (nativeEvent: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

        const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

        if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const RefreshCall = () =>{
        refetch()
        setFilter(null)
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
                onRefresh={RefreshCall}
                onScroll={({ nativeEvent }) => handleScrollToEnd(nativeEvent)}
                scrollEventThrottle={400}
            >
                <View style={CommonStyles.dt_container}>
                    <SearchBox
                        {...{
                            search,
                            setSearch,
                            placeholder: "Search group name, description, and tags..",
                        }}
                    />
                    {isLoading ? <Loader /> :
                        GroupsData?.length > 0 ? (
                            GroupsData?.map((item: any, index: number) => {
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
                                            item
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
                    {isFetchingNextPage && (
                        <View style={{ marginVertical: ms(10) }}>
                            <Loader />
                        </View>
                    )}
                </View>
            </ScrollContent>

            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Filters"
                type="filters"
            >
                {
                    GroupFilter(control).map((item, index) => {
                        if (item.type === "dropdown") {
                            return <DropdownInput key={index} {...item} />;
                        }
                    })
                }
                <View style={{ marginVertical: ms(40) }} />
                <View style={{marginBottom: ms(10)}}>
                    <SubmitButton
                        {...{
                            text: "Submit",
                            loading: false,
                            onPress: handleSubmit(onFilter),
                        }}
                    />
                </View>
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