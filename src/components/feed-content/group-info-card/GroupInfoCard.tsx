import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FeedContentStyles as styles } from '../FeedContentStyle'
import { ms } from '../../../utils/helpers/responsive'
import { Colors } from '../../../utils/constant/Constant'

type Props = {
    Data: any
}

const GroupInfoCard: React.FC<Props> = ({Data}) => {
    return (
        <View style={styles.dt_user_info_card}>
            <View style={styles.dt_image_container}>
                <Image
                    source={require('@images/banner.png')}
                    style={{ width: "100%", height: "100%"}}
                />
            </View>
            <View style={[styles.dt_name_container,{marginTop:ms(10)}]}>
                <Text style={[styles.dt_name,{color:Colors.dt_primary_green}]}>{Data?.metadata?.roomName}</Text>
            </View>
        </View>
    )
}

export default GroupInfoCard