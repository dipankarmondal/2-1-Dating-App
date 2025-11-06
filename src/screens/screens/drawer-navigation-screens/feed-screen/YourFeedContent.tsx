/**React Imports */
import { View, Text } from 'react-native'
import React from 'react'

/**Components */
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import GroupInfoCard from '../../../../components/feed-content/group-info-card/GroupInfoCard'
import FeedCardInfoHeader from '../../../../components/feed-card-info-header/FeedCardInfoHeader'
import EventCard from '../../../../components/feed-content/event-card/EventCard'
import CommonBox from '../../../../components/feed-content/common-box/CommonBox'

/**Local imports*/
import { ms } from '../../../../utils/helpers/responsive'

/**Icons*/
import GroupIcon from '@svgs/group.svg'
import LikeIcon from '@svgs/like.svg'
import FriendIcon from '@svgs/setting/friends.svg'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import { GetFeed, GetUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'
import { CommonStyles } from '../../common/CommonStyle'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

type Props = {
    activeKey: string
}

/**Main export*/
const YourFeedContent: React.FC<Props> = ({ activeKey }) => {

    const { Token } = useAuth()

    const feedData = [
        // {
        //     title: "CPLSUEPAUL has joined Georgia For Chocolate ??",
        //     subtext: "Dec 12, 2024 | 24 Members",
        //     components: [<UserInfoCard Icon={FriendIcon} isUserContent={true}/>, <GroupInfoCard />],
        // },
        // {
        //     title: "CLUBELATION would like you to join their event.",
        //     subtext: "Dec 12, 2024 | 24 Members",
        //     components: [<EventCard Icon={GroupIcon} />, <CommonBox />],
        // },
        // {
        //     title: "MEMB3RSONLY would like you to join their event.",
        //     subtext: "Dec 12, 2024 | 24 Members",
        //     components: [<EventCard />, <CommonBox />],
        // },
        // {
        //     title: "ANASDF2020 in your area has a birthday",
        //     subtext: "08 hours, 22 min",
        //     components: [<UserInfoCard isUserContent={true} />, <CommonBox type="birthday" />],
        // },
        // {
        //     title: "ANASDF2020 in your area has a birthday",
        //     subtext: "08 hours, 22 min",
        //     components: [
        //         <UserInfoCard Icon={LikeIcon} isUserContent={true} />,
        //         <UserInfoCard type="friend_request" isUserContent={true} />,
        //     ],
        // },
        // {
        //     title: "ANASDF2020 is posted a Hotdate",
        //     subtext: "08 hours, 22 min",
        //     components: [<UserInfoCard isUserContent={true} />, <CommonBox type="hotdate" />],
        // },
        // {
        //     title: "ANASDF2020 started livestream",
        //     subtext: "08 hours, 22 min",
        //     components: [<UserInfoCard isUserContent={true} />, <CommonBox type="livestream" />],
        // },
    ];

    const { data: FeedData, isLoading: feedloading, refetch } = useQuery({
        queryKey: ["FeedData", activeKey === "your_feeds"],
        queryFn: () => GetFeed(Token),
    })

    const { data, isLoading } = useQuery({
        queryKey: ['GetUser'],
        queryFn: () => GetUser(Token),
        enabled: !!Token,
    })

    const NewData = FeedData?.data?.filter((item: any) => item?.type === "friend_request") ?? [];

    return (
        <ScrollContent
            contentContainerStyle={{ flexGrow: 1, }}
            onRefresh={() => { }}
        >
            <View style={[CommonStyles.dt_container, { gap: ms(16), }]}>

                {
                    feedloading ? <Loader />
                        :
                        NewData?.length > 0 ? (
                            NewData.map((item: any, index: number) => {
                                const formattedTime = moment(item?.createdAt).format("HH [hours], mm [min]");
                                const photos = [item?.metadata?.profileImage]
                                return (
                                    <View key={index}>
                                        <FeedCardInfoHeader title={item.title} subtext={formattedTime} />
                                        <View style={{ gap: ms(12) }}>
                                            <UserInfoCard
                                                {...{
                                                    Icon: FriendIcon,
                                                    type: "user",
                                                    isMore: true,
                                                    isFilterOption: true,
                                                    isGallery: photos?.length > 0 ? true : false,
                                                    profileImages: item?.metadata?.profileImage,
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
                                            </UserInfoCard>,
                                        </View>
                                    </View>
                                )
                            })
                        ) : (
                            <NotFound
                                {...{
                                    title:"No feed found right now. Looks like things are quiet — check back later or try refreshing to discover new updates!",
                                    photo:require("@images/notFound/feed_not.png")
                                }}
                            />
                        )
                }
            </View>
        </ScrollContent>
    )
}

export default YourFeedContent