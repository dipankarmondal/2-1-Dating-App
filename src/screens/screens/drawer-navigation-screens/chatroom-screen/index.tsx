import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { CommonStyles } from '../../common/CommonStyle'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors, Fonts } from '../../../../utils/constant/Constant'
import ChatroomCard from '../../../../components/chatroom-card/ChatroomCard'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { useNavigation } from '@react-navigation/native'

const ChatroomScreen: React.FC = () => {
    const Navigation = useNavigation<any>()
    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Chatrooms</Text>
                <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("AddChatroomScreen") }}>
                    <Text style={CommonStyles.dt_speed_date_text}>Add Chatroom</Text>
                </TouchableOpacity>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={() => { }} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    <ChatroomCard />
                    <ChatroomCard />
                    <ChatroomCard />
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default ChatroomScreen

