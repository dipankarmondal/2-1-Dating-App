import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { CommonStyles } from '../../common/CommonStyle'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { useNavigation } from '@react-navigation/native'

const LivestreamScreen: React.FC = () => {
    const Navigation = useNavigation<any>();

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Live Stream</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} >
                        <Text style={CommonStyles.dt_speed_date_text}>Stream</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={CommonStyles.dt_container}>
                    <UserInfoCard
                        {...{
                            type: "livestream",
                            isMore: true,
                            isOption: true,
                            isFilterOption: true,
                        }}
                    /> 
                    <UserInfoCard
                        {...{
                            type: "livestream",
                            isMore: true, 
                            isOption: true,
                            isFilterOption: true,
                        }}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default LivestreamScreen