import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ChatHeader from '../../../../components/chat-header/ChatHeader'
import { ChatScreenStyles as styles } from './styles'
type Props = {
    route: any
}
const ChatScreen: React.FC<Props> = ({ route }) => {
    const { chat } = route.params;

    return (
        <View style={styles.dt_container}>
            <ChatHeader chat={chat} />
        </View>
    );
};

export default ChatScreen;