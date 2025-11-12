/**React Imports */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { LivestreamScreenStyles as styles } from './styles'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors } from '../../../../utils/constant/Constant'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import ViewIcon from '@svgs/setting/views.svg'
import TimeIcon from '@svgs/setting/time.svg'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { GetAllLiveStreams } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { NewMemberActions, StreamStats } from '../../../../components/common/helper'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Main export*/
const LivestreamScreen: React.FC = () => {
    const Navigation = useNavigation<any>();
    const { Token } = useAuth()

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ['getAllLiveStreams'],
        queryFn: ({ pageParam = 1 }) => GetAllLiveStreams(Token, pageParam, 5),
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.pagination;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1,
    });

    const allStreams = data?.pages?.flatMap(page => page.streams) ?? [];

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
                <Text style={CommonStyles.dt_header_title}>Live Stream</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => Navigation.navigate("StreamScreen")}>
                        <Text style={CommonStyles.dt_speed_date_text}>Create Stream</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch}
                onScroll={handleScroll}
            >
                <View style={CommonStyles.dt_container}>
                    {
                        isLoading ? <Loader /> :
                            allStreams.length > 0 ? (
                                allStreams.map((item: any, index: number) => {
                                    return (
                                        <UserInfoCard
                                            key={index}
                                            {...{
                                                type: "user",
                                                UserName: item?.streamerId?.username,
                                                isStream: true,
                                            }}
                                        >
                                            <View>

                                                <View style={[styles.dt_view_content,]}>
                                                    <ViewIcon {...IconProps(ms(15))} fill={Colors.dt_gray} />
                                                    <Text style={styles.dt_view_text}>{item?.currentViewerCount}</Text>
                                                    <View style={[styles.dt_live_status, { backgroundColor: item?.isLive ? "#b1ffb1" : Colors.dt_gray }]} >
                                                        <View style={[styles.dt_live_status_dot, { backgroundColor: item?.isLive ? Colors.dt_success_green : Colors.dt_gray }]} />
                                                    </View>
                                                </View>
                                                <View style={styles.dt_stream_info}>
                                                    <Text style={styles.dt_stream_title}>{item?.title ?? "--"}</Text>
                                                    <Text style={styles.dt_stream_description}>{item?.description ?? "--"}</Text>
                                                </View>
                                                <View style={styles.dt_stream_info}>
                                                    <Text style={styles.dt_stream_title}>Tags:</Text>
                                                    <View style={styles.dt_stream_tags}>
                                                        {
                                                            item?.tags?.map((t: any, tIndex: number) => {
                                                                return (
                                                                    <View key={tIndex} style={styles.dt_stream_tag_item}>
                                                                        <Text style={styles.dt_stream_tag_text}>{t} </Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                                <View style={[styles.dt_profile_content, { marginTop: ms(10) }]}>
                                                    {StreamStats(item).map(({ id, icon: Icon, size, count }) => (
                                                        <TouchableOpacity
                                                            key={id}
                                                            style={[styles.dt_button_two, { backgroundColor: Colors.dt_gray + '33' }]}
                                                        >
                                                            <Icon {...IconProps(size)} fill={Colors.dt_card_blue} />
                                                            <Text style={styles.dt_profile_text}>{count}</Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                            </View>
                                        </UserInfoCard>

                                    )
                                })
                            ) : (
                                <NotFound
                                    {...{
                                        title: "Oops! No live streams are available right now. Please check back later or explore other exciting content nearby.",
                                        photo: require("@images/notFound/live_not.png")
                                    }}
                                />
                            )
                    }

                    {isFetchingNextPage &&
                        <View style={{ marginVertical: 16 }}>
                            <Loader />
                        </View>
                    }
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default LivestreamScreen