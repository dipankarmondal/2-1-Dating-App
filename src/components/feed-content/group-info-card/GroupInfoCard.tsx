import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {FeedContentStyles as styles} from '../FeedContentStyle'
import { ms } from '../../../utils/helpers/responsive'

const GroupInfoCard: React.FC = () => {
    return (
        <View style={[styles.dt_user_info_card, {marginTop: ms(15)}]}>
            <View style={styles.dt_header_container}>
                <View>
                    <Text style={styles.dt_intrest_text}>Location Based</Text>
                    <Text style={[styles.dt_location_text,{textAlign:"left", marginTop: ms(5)}]}>Athens, GA, USA</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.dt_apply_button}>
                        <Text style={styles.dt_apply_text}>Apply to join</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.dt_bio_container}>
                <Text style={[styles.dt_location_text,{textAlign:"left"}]}>This group for people who are in the swinging lifestyle for only ladies that is looking for chocolate in georgia. Also couples who have a hotwife looking for chocolate in georgia as well. Because I need to verify people before joining in. Only way to be approved to join the group you need to be located in georgia, also a lady</Text>
            </View>
        </View>
    )
}

export default GroupInfoCard