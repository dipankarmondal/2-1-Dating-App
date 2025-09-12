import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { CommonStyles } from '../../common/CommonStyle'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'

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
                            isFilterOption: true
                        }}
                    />
                    <UserInfoCard 
                        {...{
                            type: "hotdate",
                            isMore: true,
                            isOption: true,
                            isUserContent: false,
                            isFilterOption: true
                        }}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default HotDateScreen