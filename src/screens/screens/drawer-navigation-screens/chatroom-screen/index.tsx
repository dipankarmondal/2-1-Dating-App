import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { CommonStyles } from '../../common/CommonStyle'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors, Fonts } from '../../../../utils/constant/Constant'
import ChatroomCard from '../../../../components/chatroom-card/ChatroomCard'

const ChatroomScreen: React.FC = () => {
    return (
        <ScreenLayout>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={CommonStyles.dt_container}>
                    <ChatroomCard/>
                    <ChatroomCard/>
                    <ChatroomCard/>
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default ChatroomScreen

