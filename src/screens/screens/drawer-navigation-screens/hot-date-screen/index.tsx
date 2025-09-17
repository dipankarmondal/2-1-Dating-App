/**React Imports */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'

/**Main export*/
const HotDateScreen: React.FC = () => {
    return (
        <ScreenLayout>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={CommonStyles.dt_container}>
                    <UserInfoCard
                        {...{
                            type: "hotdate",
                            isMore: true,
                            isOption: true,
                            isUserContent: false,
                            isFilterOption: true,
                            isGallery: true
                        }}
                    />
                    <UserInfoCard
                        {...{
                            type: "hotdate",
                            isMore: true,
                            isOption: true,
                            isUserContent: false,
                            isFilterOption: true,
                            isGallery: true
                        }}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default HotDateScreen