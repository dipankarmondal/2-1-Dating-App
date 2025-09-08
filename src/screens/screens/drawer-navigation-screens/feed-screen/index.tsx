import React, { useEffect } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { HeaderBtn } from '../../../../components/common/helper'
import { ScrollView, Text, View } from 'react-native'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import GroupInfoCard from '../../../../components/feed-content/group-info-card/GroupInfoCard'
import GobalFeedContent from './GobalFeedContent'
import Notification from './Notification'

const FeedScreen: React.FC<{ route: any }> = ({ route }) => {
    const [activeKey, setActiveKey] = React.useState("feed");
    const [updateKey, setUpdateKey] = React.useState(null);

    console.log("Asdfasd", updateKey)
    const { key } = route.params || {}
    useEffect(() => {
        if (key) {
            setActiveKey(key);
        }
    }, [key]);

    useEffect(() => {
        if (updateKey) {
            setActiveKey(updateKey);
        }
    }, [updateKey]);

    return (
        <ScreenLayout
            {...{
                setUpdateKey,
                type: "feed"
            }}
        >
            <ScreenHeader
                {...{
                    activeKey,
                    setActiveKey,
                    Header: HeaderBtn
                }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={commonstyle.dt_container}>
                    {
                        activeKey === "feed" ?
                            <GobalFeedContent /> :
                            <Notification />
                    }
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default FeedScreen