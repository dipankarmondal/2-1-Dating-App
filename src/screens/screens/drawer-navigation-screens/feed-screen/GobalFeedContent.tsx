import { View, Text } from 'react-native'
import React from 'react'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import GroupInfoCard from '../../../../components/feed-content/group-info-card/GroupInfoCard'
import FeedCardInfoHeader from '../../../../components/feed-card-info-header/FeedCardInfoHeader'
import { ms } from '../../../../utils/helpers/responsive'
import EventCard from '../../../../components/feed-content/event-card/EventCard'
import CommonBox from '../../../../components/feed-content/common-box/CommonBox'
import GroupIcon from '@svgs/group.svg'
import LikeIcon from '@svgs/like.svg'
import FriendIcon from '@svgs/setting/friends.svg'

const GobalFeedContent: React.FC = () => {

    const feedData = [
        {
            title: "CPLSUEPAUL has joined Georgia For Chocolate ??",
            subtext: "Dec 12, 2024 | 24 Members",
            components: [<UserInfoCard Icon={FriendIcon} isUserContent={true}/>, <GroupInfoCard />],
        },
        {
            title: "CLUBELATION would like you to join their event.",
            subtext: "Dec 12, 2024 | 24 Members",
            components: [<EventCard Icon={GroupIcon} />, <CommonBox />],
        },
        {
            title: "MEMB3RSONLY would like you to join their event.",
            subtext: "Dec 12, 2024 | 24 Members",
            components: [<EventCard />, <CommonBox />],
        },
        {
            title: "ANASDF2020 in your area has a birthday",
            subtext: "08 hours, 22 min",
            components: [<UserInfoCard isUserContent={true} />, <CommonBox type="birthday" />],
        },
        {
            title: "ANASDF2020 in your area has a birthday",
            subtext: "08 hours, 22 min",
            components: [
                <UserInfoCard Icon={LikeIcon} isUserContent={true} />,
                <UserInfoCard type="friend_request" isUserContent={true} />,
            ],
        },
        {
            title: "ANASDF2020 is posted a Hotdate",
            subtext: "08 hours, 22 min",
            components: [<UserInfoCard isUserContent={true} />, <CommonBox type="hotdate" />],
        },
        {
            title: "ANASDF2020 started livestream",
            subtext: "08 hours, 22 min",
            components: [<UserInfoCard isUserContent={true} />, <CommonBox type="livestream" />],
        },
    ];

    return (
        <View style={{ gap: ms(15) }}>
            {feedData.map((item, index) => (
                <View key={index}>
                    <FeedCardInfoHeader title={item.title} subtext={item.subtext} />
                    {item.components.map((Comp, i) => (
                        <React.Fragment key={i}>{Comp}</React.Fragment>
                    ))}
                </View>
            ))}
        </View>
    )
}

export default GobalFeedContent