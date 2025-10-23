/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors, getAge } from '../../../../utils/constant/Constant'
import { NewMemberActions, OnlineOptions } from '../../../../components/common/helper'
import { NewMemberScreenStyles as styles } from './styles'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { ListAllUsers } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import Loader from '../../../../components/loader/Loader'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import NotFound from '../../../../components/notfound/NotFound'

/** Liabary*/
import { useIsFocused } from '@react-navigation/native'
import { useInfiniteQuery } from '@tanstack/react-query'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'

/**Main export*/
const NewMemberScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");

    const isFocused = useIsFocused();
    const { Token } = useAuth()

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
        queryKey: ["list_all_user"],
        queryFn: ({ pageParam = 1 }) => ListAllUsers(Token, pageParam, 10),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.meta?.pagination;
            return pagination?.hasNext ? pagination.page + 1 : undefined;
        },
        enabled: isFocused && !!Token,
    });

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
                onRefresh={refetch} // just pass refetch here
                onScroll={handleScroll}
            >
                <View style={CommonStyles.dt_container}>
                    {isLoading ? <Loader /> :
                        allUsers?.length > 0 ? (
                            allUsers?.map((item: any, index: number) => {
                                return (
                                    <UserInfoCard
                                        key={index}
                                        {...{
                                            isMore: true,
                                            isOption: true,
                                            isFilterOption: true,
                                            isGallery: item?.profile?.photos?.length > 0 ? true : false,
                                            profileImages: item?.profile?.photos,
                                            UserName: item?.username,
                                        }}
                                    >
                                        <View style={styles.dt_intrest}>
                                            <View style={[styles.dt_age_container, { marginTop: ms(10) }]}>
                                                {item?.profile?.gender === "couple" ? (
                                                    <>
                                                        <View style={styles.dt_age}>
                                                            <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                                            <Text style={styles.dt_age_text}>{getAge(item?.profile?.partner?.dateOfBirth)}</Text>
                                                        </View>
                                                        <View style={styles.dt_age}>
                                                            <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                                            <Text style={styles.dt_age_text}>{item?.profile?.age}</Text>
                                                        </View>
                                                    </>
                                                ) : item?.profile?.gender === "female" ? (
                                                    <View style={styles.dt_age}>
                                                        <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                                        <Text style={styles.dt_age_text}>{item?.profile?.age}</Text>
                                                    </View>
                                                ) : (
                                                    <View style={styles.dt_age}>
                                                        <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                                        <Text style={styles.dt_age_text}>{item?.profile?.age}</Text>
                                                    </View>
                                                )}
                                            </View>
                                            <View style={styles.dt_intrest_container}>
                                                <Text style={styles.dt_intrest_text}>Interests</Text>
                                                <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                                                    {item?.profile?.interestedIn.includes('couple') && (
                                                        <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                                                    )}
                                                    {item?.profile?.interestedIn.includes('male') && (
                                                        <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                                    )}
                                                    {item?.profile?.interestedIn.includes('female') && (
                                                        <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                                    )}
                                                </View> 
                                            </View>
                                        </View>
                                        <View style={styles.dt_intrest}>
                                            <View style={styles.dt_intrest_container}>
                                                <Text style={styles.dt_intrest_text}>Location</Text>
                                                <View style={[styles.dt_location_container]}>
                                                    <Text style={[styles.dt_location_text, { textAlign: "left" }]}>
                                                        {item?.profile?.address?.fullAddress ?? "Not specified"}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[styles.dt_profile_content, { marginTop: ms(10) }]}>
                                            {NewMemberActions(item).map(({ id, icon: Icon, size, count }) => (
                                                <TouchableOpacity
                                                    key={id}
                                                    style={[styles.dt_button_two, { backgroundColor: Colors.dt_gray + '33' }]}
                                                >
                                                    <Icon {...IconProps(size)} fill={Colors.dt_card_blue} />
                                                    <Text style={styles.dt_profile_text}>{count}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
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