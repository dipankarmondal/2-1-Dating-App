/**React Imports */
import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'

/**Local imports*/
import { HeaderBtn } from '../../../../components/common/helper'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import GobalFeedContent from './GobalFeedContent'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import Notification from './Notification'

/**Main export*/
const FeedScreen: React.FC<{ route: any }> = ({ route }) => {
    const [activeKey, setActiveKey] = React.useState("feed");

    const { key } = route.params || {}

    useEffect(() => {
        if (key) {
            setActiveKey(key);
        }
    }, [key]);

    return (
        <ScreenLayout
            {...{
                setUpdateKey: setActiveKey,
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