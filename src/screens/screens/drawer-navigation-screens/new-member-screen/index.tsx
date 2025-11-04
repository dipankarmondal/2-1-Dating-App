/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { OnlineOptions } from '../../../../components/common/helper'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { CreateInteraction, ListAllUsers, SendFriendRequest, SendRememberMe } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { showToast } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import Loader from '../../../../components/loader/Loader'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import NotFound from '../../../../components/notfound/NotFound'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'

/** Liabary*/
import { useIsFocused } from '@react-navigation/native'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

/**Icons*/
import LikeIcon from '@svgs/like.svg'
import DislikeIcon from '@svgs/dislike.svg'
import InviteFrindIcon from '@svgs/setting/invite.svg'
import BellIcon from '@svgs/bell.svg'
import SearchBox from '../../../../components/search-box/SearchBox'

/**Main export*/
const NewMemberScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [search, setSearch] = useState("");

    const isFocused = useIsFocused();
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
        console.log("clicked")
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["list_all_user",search],
        queryFn: ({ pageParam = 1 }) => ListAllUsers(Token, pageParam, 10,search),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.meta?.pagination;
            return pagination?.hasNext ? pagination.page + 1 : undefined;
        },
        enabled: isFocused && !!Token ,
    });

    // here also add tags for like, isFreind, dislike 

    const allUsers = data?.pages?.flatMap((page) => page?.data) || [];

    const handleScroll = useCallback(
        ({ nativeEvent }: any) => {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const isCloseToBottom =
                layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
            if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [hasNextPage, isFetchingNextPage]
    );

    const UserInteractionMutation = useMutation({
        mutationFn: (data: any) => CreateInteraction(Token, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                showToast("success", res?.message);
                QueryInvalidater.invalidateQueries({ queryKey: ['list_all_user'] });
            }
        },
        onError: (error: any) => {
            showToast("error", error?.response?.data?.message);
        }
    })
    const SendFriendRequestMutation = useMutation({
        mutationFn: (data: any) => SendFriendRequest(Token, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                showToast("success", res?.message);
                QueryInvalidater.invalidateQueries({ queryKey: ['list_all_user'] });
            }
        },
        onError: (error: any) => {
            showToast("error", error?.response?.data?.message);
        }
    })
    const SendRememberMutation = useMutation({
        mutationFn: (data: any) => SendRememberMe(Token, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                showToast("success", res?.message);
                QueryInvalidater.invalidateQueries({ queryKey: ['list_all_user'] });
            }
        },
        onError: (error: any) => {
            showToast("error", error?.response?.data?.message);
        }
    })

    const handleClick = (id: string, type: string) => {
        if (type === "friend") {
            const payload = {
                receiverId: id,
            }
            SendFriendRequestMutation.mutate(payload)
        } else if (type === "remember") {
            const payload = {
                receiverId: id,
            }
            SendRememberMutation.mutate(payload)
        } else {
            const payload = {
                targetUserId: id,
                interactionType: type
            }
            UserInteractionMutation.mutate(payload)
        }
    };

    const mainMenuItems = (id: any) => [
        { key: "friend", label: "Friend request", Icon: InviteFrindIcon, onClick: () => handleClick(id, "friend") },
        { key: "remember", label: "Remember", Icon: BellIcon, onClick: () => handleClick(id, "remember") },
        { key: "like", label: "Like", Icon: LikeIcon, onClick: () => handleClick(id, "like") },
        { key: "dislike", label: "Not intrested", Icon: DislikeIcon, onClick: () => handleClick(id, "dislike") },
    ];

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>New Members</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity
                        style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]}
                        onPress={() => {
                            setShowDropdown((prev) => !prev);
                        }}
                    >
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch}
                onScroll={handleScroll}
            >
                <View style={CommonStyles.dt_container}>
                    <SearchBox
                        {...{
                            search,
                            setSearch
                        }}
                    />
                    {isLoading ? <Loader /> :
                        allUsers?.length > 0 ? (
                            allUsers?.map((item: any, index: number) => {
                                return (
                                    <UserInfoCard
                                        key={index}
                                        {...{
                                            type: "user",
                                            isMore: true,
                                            isOption: true,
                                            isFilterOption: true,
                                            isGallery: item?.profile?.photos?.length > 0 ? true : false,
                                            profileImages: item?.profile?.photos,
                                            UserName: item?.username,
                                            userId: item?._id,
                                            menuData: mainMenuItems(item?._id),
                                        }}
                                    >
                                        <InfoCardLayoutOne
                                            {...{
                                                item,
                                            }}
                                        />
                                    </UserInfoCard>
                                )
                            })
                        ) : (
                            <NotFound
                                {...{
                                    title: "We couldn’t find any members. Try adjusting your search or wait a bit for more people to join.",
                                    photo: require("@images/notFound/new_members.png"),
                                }}
                            />
                        )
                    }
                </View>
                {isFetchingNextPage &&
                    <View style={{ marginVertical: 16 }}>
                        <Loader />
                    </View>
                }
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
                        filterData: OnlineOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default NewMemberScreen