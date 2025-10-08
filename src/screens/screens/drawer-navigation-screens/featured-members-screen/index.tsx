import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { CommonStyles } from '../../common/CommonStyle'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import { useNavigation } from '@react-navigation/native'

const FeaturedMembersScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Featured Members</Text>
                <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { navigation.navigate("FeaturedMembersAddScreen") }}>
                    <Text style={CommonStyles.dt_speed_date_text}>+ Add Me</Text>
                </TouchableOpacity>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={() => { }}
            >
                <View style={CommonStyles.dt_container}>
                    <UserInfoCard
                        {...{
                            type: "member",
                            isMore: true,
                            isOption: true,
                            isUserContent: false,
                            isFilterOption: false,
                            isGallery: true
                        }}
                    />
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default FeaturedMembersScreen 