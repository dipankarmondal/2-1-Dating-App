import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChatroomCardStyles as styles } from './styles'

const ChatroomCard: React.FC = () => {
    return (
        <View style={styles.dt_room_container}>
            <View style={styles.dt_room_image}>
                <Image source={require('@images/chatroom.png')} style={styles.dt_image} />
            </View>
            <View style={styles.dt_room_info}>
                <View>
                    <Text style={styles.dt_room_name}>Chatroom</Text>
                    <Text style={styles.dt_room_member}>74 member</Text>
                </View>
                <TouchableOpacity style={styles.dt_button}>
                    <Text style={styles.dt_button_text}>Join Chatroom</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatroomCard