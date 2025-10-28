import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useAuth } from '../../utils/context/auth-context/AuthContext';

const RenderMessageItem: React.FC<any> = ({ item, onLongPress, styles }) => {
    const {user} = useAuth()
    const isUser = item?.senderId?._id === user?.id

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onLongPress={() => onLongPress(item)}
            style={[
                styles.dt_messageContainer,
                isUser ? styles.dt_myMessage : styles.dt_otherMessage,
            ]}
        >
            {item.image ? (
                <Image
                    source={{ uri: item.image }}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                    resizeMode="cover"
                />
            ) : (
                <Text style={styles.dt_messageText}>{item?.content}</Text>
            )}
            <Text style={styles.dt_timestamp}>
                {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
        </TouchableOpacity>
    )
}

export default RenderMessageItem