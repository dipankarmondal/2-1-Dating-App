/**React Imports */
import { View, Text } from 'react-native'
import React from 'react'

/**Local imports*/
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { GetGlobalFeed, GetUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { CommonStyles } from '../../common/CommonStyle'
import { ms } from '../../../../utils/helpers/responsive'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'

/**Components */
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import GroupInfoCard from '../../../../components/feed-content/group-info-card/GroupInfoCard'
import FeedCardInfoHeader from '../../../../components/feed-card-info-header/FeedCardInfoHeader'

/**Icons*/
import FriendIcon from '@svgs/setting/friends.svg'

type Props = {
    activeKey: string
}

/**Main export*/
const GlobalFeedContent: React.FC<Props> = ({ activeKey }) => {
    const { Token } = useAuth()

    const { data, isLoading } = useQuery({
        queryKey: ['GetUser'],
        queryFn: () => GetUser(Token),
        enabled: !!Token,
    })
    const { data: GlobalFeedData, isLoading: globalLiader, refetch } = useQuery({
        queryKey: ['global_feed', activeKey === "global_feeds"],
        queryFn: () => GetGlobalFeed(Token),
        enabled: !!Token,
    })

    const GlobalFeedDataSet = GlobalFeedData?.data?.filter((item: any) =>
        item?.type === "friend_request" ||
        item?.type === "profile_view" ||
        item?.type === "group_joined" ||
        item?.type === "friend_request_accepted"
    ) ?? [];

    return (
        <ScrollContent
            contentContainerStyle={{ flexGrow: 1, }}
            onRefresh={refetch}
        >
            <View style={[CommonStyles.dt_container, { gap: ms(16) }]}>
                {
                    globalLiader ? (
                        <Loader />
                    ) : GlobalFeedDataSet?.length > 0 ? (
                        GlobalFeedDataSet.map((item: any, index: number) => {
                            const formattedTime = moment(item?.createdAt).format("HH [hours], mm [min]");
                            const photos = [item?.metadata?.profileImage];

                            return (
                                <View key={index}>
                                    {
                                        item?.type === "friend_request" ? (
                                            <FeedCardInfoHeader title={item.title} subtext={formattedTime} />
                                        ) : item?.type === "profile_view" ? (
                                            <FeedCardInfoHeader title={item.title} subtext={formattedTime} />
                                        ) : item?.type === "group_joined" ? (
                                            <FeedCardInfoHeader title={item.title} subtext={formattedTime} />
                                        ) : item?.type === "friend_request_accepted" ? (
                                            <FeedCardInfoHeader title={item.title} subtext={formattedTime} />
                                        ) : null
                                    }

                                    <View style={{ gap: ms(12) }}>
                                        {
                                            item?.type === "friend_request" ? (
                                                <>
                                                    <UserInfoCard
                                                        {...{
                                                            Icon: FriendIcon,
                                                            type: "user",
                                                            isMore: true,
                                                            isFilterOption: true,
                                                            isGallery: photos?.length > 0,
                                                            profileImages: item?.metadata?.profileImage,
                                                            UserName: item?.metadata?.username,
                                                            userId: item?.relatedUserId?._id,
                                                        }}
                                                    >
                                                        <InfoCardLayoutOne item={item?.metadata} />
                                                    </UserInfoCard>

                                                    <UserInfoCard
                                                        {...{
                                                            type: "user",
                                                            isMore: true,
                                                            isFilterOption: true,
                                                            isGallery: data?.data?.profile?.photos?.length > 0,
                                                            profileImages: data?.data?.profile?.photos,
                                                            UserName: data?.data?.username,
                                                            userId: data?.data?._id,
                                                        }}
                                                    >
                                                        <InfoCardLayoutOne item={data?.data} />
                                                    </UserInfoCard>
                                                </>
                                            ) : item?.type === "profile_view" ? (
                                                <UserInfoCard
                                                    {...{
                                                        type: "user",
                                                        isMore: true,
                                                        isFilterOption: true,
                                                        isGallery: photos?.length > 0,
                                                        profileImages: photos,
                                                        UserName: item?.metadata?.username,
                                                        userId: item?.metadata?.senderId,
                                                    }}
                                                >
                                                    <InfoCardLayoutOne item={item?.metadata} />
                                                </UserInfoCard>
                                            ) : item?.type === "group_joined" ? (
                                                <GroupInfoCard Data={item} />
                                            ) : item?.type === "friend_request_accepted" ? (
                                                <UserInfoCard
                                                    {...{
                                                        type: "user",
                                                        isMore: true,
                                                        isFilterOption: true,
                                                        isGallery: photos?.length > 0,
                                                        profileImages: photos,
                                                        UserName: item?.metadata?.username,
                                                        userId: item?.metadata?.accepterId,
                                                    }}
                                                >
                                                    <InfoCardLayoutOne item={item?.metadata} />
                                                </UserInfoCard>
                                            ) : null
                                        }
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <NotFound
                            title="No feed found right now. Looks like things are quiet — check back later or try refreshing to discover new updates!"
                            photo={require("@images/notFound/feed_not.png")}
                        />
                    )
                }
            </View>

        </ScrollContent>
    )
}

export default GlobalFeedContent