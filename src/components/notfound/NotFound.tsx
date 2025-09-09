import { View, Text } from 'react-native'
import React from 'react'
import { NotFoundStyles as styles } from './styles'

const NotFound: React.FC = () => {
    return (
        <View style={styles.dt_container}>
            <Text style={styles.dt_text}>No result found</Text>
        </View>
    )
}

export default NotFound