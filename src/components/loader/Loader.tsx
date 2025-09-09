import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { LoaderStyles as styles } from './styles'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'

const Loader: React.FC = () => {
    return (
        <View style={styles.dt_loading}>
            <ActivityIndicator size={ms(13)} color={Colors.dt_white} />
            <Text style={styles.dt_loading_text}>Loading...</Text>
        </View>
    )
}

export default Loader