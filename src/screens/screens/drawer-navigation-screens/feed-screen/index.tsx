import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { HeaderBtn } from '../../../../components/common/helper'
import { ScrollView, Text, View } from 'react-native'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import GroupInfoCard from '../../../../components/feed-content/group-info-card/GroupInfoCard'
import GobalFeedContent from './GobalFeedContent'

const FeedScreen: React.FC = () => {
    const [activeKey, setActiveKey] = React.useState("feed");

    return (
        <ScreenLayout>
            <ScreenHeader
                {...{
                    activeKey,
                    setActiveKey,
                    Header: HeaderBtn
                }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={commonstyle.dt_container}>
                    <GobalFeedContent />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default FeedScreen