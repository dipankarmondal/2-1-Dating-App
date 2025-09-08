import { View, Text } from 'react-native'
import React from 'react'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import GroupInfoCard from '../../../../components/feed-content/group-info-card/GroupInfoCard'
import { CommonStyles as styles } from '../../common/CommonStyle'
import FeedCardInfoHeader from '../../../../components/feed-card-info-header/FeedCardInfoHeader'
import { ms } from '../../../../utils/helpers/responsive'
import EventCard from '../../../../components/feed-content/event-card/EventCard'
import CommonBox from '../../../../components/feed-content/common-box/CommonBox'
import GroupIcon from '@svgs/group.svg'
import LikeIcon from '@svgs/like.svg'
import FriendIcon from '@svgs/setting/friends.svg'

const GobalFeedContent: React.FC = () => {
    return (
        <View style={{ gap: ms(15) }}>
            <View>
                <FeedCardInfoHeader
                    {...{
                        title: "CPLSUEPAUL has joined Georgia For Chocolate ??",
                        subtext: "Dec 12, 2024 | 24 Members"
                    }}
                />
                <UserInfoCard
                    {...{
                        Icon: FriendIcon
                    }}
                />
                <GroupInfoCard />
            </View>
            <View>
                <FeedCardInfoHeader
                    {...{
                        title: "CLUBELATION would like you to join their event.",
                        subtext: "Dec 12, 2024 | 24 Members"
                    }}
                />
                <EventCard
                    {...{
                        Icon: GroupIcon
                    }}
                />
                <CommonBox />
            </View>
            <View>
                <FeedCardInfoHeader
                    {...{
                        title: "MEMB3RSONLY would like you to join their event.",
                        subtext: "Dec 12, 2024 | 24 Members"
                    }}
                />
                <EventCard />
                <CommonBox />
            </View>
            <View>
                <FeedCardInfoHeader
                    {...{
                        title: "ANASDF2020 in your area has a birthday",
                        subtext: "08 hours, 22 min"
                    }}
                />
                <UserInfoCard />
                <CommonBox type="birthday" />
            </View>
            <View>
                <FeedCardInfoHeader
                    {...{
                        title: "ANASDF2020 in your area has a birthday",
                        subtext: "08 hours, 22 min"
                    }}
                />
                <UserInfoCard
                    {...{
                        Icon: LikeIcon
                    }}
                />
                <UserInfoCard
                    {...{
                        type: "friend_request"
                    }}
                />
            </View>
            <View>
                <FeedCardInfoHeader
                    {...{
                        title: "ANASDF2020 is posted a Hotdate",
                        subtext: "08 hours, 22 min"
                    }}
                />
                <UserInfoCard />
                <CommonBox type="hotdate" />
            </View>
            <View>
                <FeedCardInfoHeader
                    {...{
                        title: "ANASDF2020 started livestream",
                        subtext: "08 hours, 22 min"
                    }}
                />
                <UserInfoCard />
                <CommonBox type="livestream" />
            </View>
        </View>
    )
}

export default GobalFeedContent