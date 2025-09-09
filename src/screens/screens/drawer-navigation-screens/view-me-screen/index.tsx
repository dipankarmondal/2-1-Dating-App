import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { ViewMeScreenStyles as styles } from './styles'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'

const ViewMeScreen: React.FC = () => {
    return (
        <ScreenLayout>
            <ScreenHeader
                {...{
                    isHeader: true,
                    headerText: "View Me"
                }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={commonstyle.dt_container}>
                    <UserInfoCard
                        {...{
                            isMore: true
                        }}
                    />
                    <UserInfoCard
                        {...{
                            isMore: true
                        }}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default ViewMeScreen 