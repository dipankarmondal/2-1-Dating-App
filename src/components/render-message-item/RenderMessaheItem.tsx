import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'


type Message = {
    id: string;
    text?: string;
    image?: string;
    sender: 'me' | 'other';
    timestamp: string;
};

type Props = {
    item: Message;
    onLongPress: (item: Message) => void;
    styles: any
};


const RenderMessageItem: React.FC<Props> = ({ item, onLongPress, styles }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onLongPress={() => onLongPress(item)}
            style={[
                styles.dt_messageContainer,
                item.sender === 'me' ? styles.dt_myMessage : styles.dt_otherMessage,
            ]}
        >
            {item.image ? (
                <Image
                    source={{ uri: item.image }}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                    resizeMode="cover"
                />
            ) : (
                <Text style={styles.dt_messageText}>{item.text}</Text>
            )}
            <Text style={styles.dt_timestamp}>
                {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
        </TouchableOpacity>
    )
}

export default RenderMessageItem