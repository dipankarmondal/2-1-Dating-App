/**React Imports */
import { View, Text } from 'react-native'
import React from 'react'

/**Components */
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import FeedCardInfoHeader from '../../../../components/feed-card-info-header/FeedCardInfoHeader'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Local imports*/
import { ms } from '../../../../utils/helpers/responsive'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { GetFeed, GetUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { CommonStyles } from '../../common/CommonStyle'

/**Icons*/
import FriendIcon from '@svgs/setting/friends.svg'

/** Liabary*/
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import GroupInfoCard from '../../../../components/feed-content/group-info-card/GroupInfoCard'

type Props = {
    activeKey: string
}

/**Main export*/
const YourFeedContent: React.FC<Props> = ({ activeKey }) => {

    const { Token } = useAuth() 


    const { data: FeedData, isLoading: feedloading, refetch } = useQuery({
        queryKey: ["FeedData", activeKey === "your_feeds"],
        queryFn: () => GetFeed(Token),
    })

    const { data, isLoading } = useQuery({
        queryKey: ['GetUser'],
        queryFn: () => GetUser(Token),
        enabled: !!Token,
    })

    const FriendRequestData = FeedData?.data?.filter((item: any) =>
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
            <View style={[CommonStyles.dt_container, { gap: ms(16), }]}>

                {
                    feedloading ? <Loader />
                        :
                        FriendRequestData?.length > 0 ? (
                            FriendRequestData?.map((item: any, index: number) => {
                                const formattedTime = moment(item?.createdAt).format("HH [hours], mm [min]");
                                const photos = [item?.metadata?.profileImage]

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
                                                                isGallery: photos?.length > 0 ? true : false,
                                                                profileImages: item?.metadata?.profileImage,
                                                                UserName: item?.metadata?.username,
                                                                userId: item?.relatedUserId?._id,
                                                            }}
                                                        >
                                                            <InfoCardLayoutOne
                                                                {...{
                                                                    item: item?.metadata,
                                                                }}
                                                            />
                                                        </UserInfoCard>
                                                        <UserInfoCard
                                                            {...{
                                                                type: "user",
                                                                isMore: true,
                                                                isFilterOption: true,
                                                                isGallery: data?.data?.profile?.photos?.length > 0 ? true : false,
                                                                profileImages: data?.data?.profile?.photos,
                                                                UserName: data?.data?.username,
                                                                userId: data?.data?._id,
                                                            }}
                                                        >
                                                            <InfoCardLayoutOne
                                                                {...{
                                                                    item: data?.data,
                                                                }}
                                                            />
                                                        </UserInfoCard>
                                                    </>
                                                ) : item?.type === "profile_view" ? (
                                                    <UserInfoCard
                                                        {...{
                                                            type: "user",
                                                            isMore: true,
                                                            isFilterOption: true,
                                                            isGallery: photos?.length > 0 ? true : false,
                                                            profileImages: photos,
                                                            UserName: item?.metadata?.username,
                                                            userId: item?.metadata?.senderId,
                                                        }}
                                                    >
                                                        <InfoCardLayoutOne
                                                            {...{
                                                                item: item?.metadata,
                                                            }}
                                                        />
                                                    </UserInfoCard>
                                                ) : item?.type === "group_joined" ? (
                                                    <GroupInfoCard
                                                        {...{
                                                            Data: item
                                                        }}
                                                    />
                                                ) : item?.type === "friend_request_accepted" ? (
                                                    <UserInfoCard
                                                        {...{
                                                            type: "user",
                                                            isMore: true,
                                                            isFilterOption: true,
                                                            isGallery: photos?.length > 0 ? true : false,
                                                            profileImages: photos,
                                                            UserName: item?.metadata?.username,
                                                            userId: item?.metadata?.accepterId,
                                                        }}
                                                    >
                                                        <InfoCardLayoutOne
                                                            {...{
                                                                item: item?.metadata,
                                                            }}
                                                        />
                                                    </UserInfoCard>
                                                ) : null
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        ) : (
                            <NotFound
                                {...{
                                    title: "No feed found right now. Looks like things are quiet — check back later or try refreshing to discover new updates!",
                                    photo: require("@images/notFound/feed_not.png")
                                }}
                            />
                        )
                }
            </View>
        </ScrollContent>
    )
}

export default YourFeedContent