import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { GroupCardStyles as styles } from './styles'
import { Colors } from '../../utils/constant/Constant'
import GroupIcon from '@svgs/group.svg'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'

const GroupCard: React.FC = () => {
    return (
        <View style={styles.dt_user_info_card}>
            <View style={styles.dt_image_container}>
                <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                <TouchableOpacity style={styles.dt_overlay}>
                    <Text style={styles.dt_join_text}>Join</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.dt_name}>Erotic Parties & Clubs</Text>
            <View style={styles.dt_age_container}>
                <Text style={styles.dt_intrest_text}>by <Text style={{ color: Colors.dt_primary_green }}>testuser1</Text></Text>
                <View style={[styles.dt_intrest_container]}>
                    <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                    <View style={[styles.dt_location_container]}>
                        <Text style={styles.dt_location_text}>Not specified</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                <Text style={styles.dt_location_text}>Not specified</Text>
                <View style={styles.dt_member_box}>
                    <GroupIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                    <Text style={styles.dt_member_text}>2</Text>
                </View>
            </View>
            <Text style={[styles.dt_location_text, {textAlign:"left", marginTop: ms(5),color: Colors.dt_error }]}>Since Sep 25, 2025</Text>
        </View>
    )
}

export default GroupCard