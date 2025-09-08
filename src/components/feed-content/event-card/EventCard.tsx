import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FeedContentStyles as styles } from '../FeedContentStyle'
import { Colors } from '../../../utils/constant/Constant'
import { ms } from '../../../utils/helpers/responsive'
import { IconProps } from '../../../utils/helpers/Iconprops'

const EventCard: React.FC<{ Icon?: React.FC<React.SVGProps<SVGSVGElement>> }> = ({ Icon }) => {
    return (
        <View style={styles.dt_user_info_card}>
            <View style={styles.dt_event_container}>
                <View style={styles.dt_event_image_container}>
                    <Image source={require('@images/banner.png')} style={styles.dt_image} />
                </View>
                <View style={{ width: "48%" }}>
                    <Text style={styles.dt_event_text}>Erotic Parties & Clubs</Text>
                    <Text style={styles.dt_event_location_text}>94555, CA, USA</Text>
                </View>
            </View>
            <View style={styles.dt_event_info_container}>
                <View style={styles.dt_event_header}>
                    <Text style={styles.dt_intrest_text}>CPLSUEPAUL</Text>
                    <Text style={[styles.dt_location_text, { color: Colors.dt_gray }]}>Dec 12, 2024 | 24 Members</Text>
                </View>
                <Text style={[styles.dt_profile_text, { marginTop: ms(10) }]}>
                    Club Elation is the newest and most progressive club for 21 years of age and over which is designed around the desires of its members. Your host and hostess Eric and Cynthia have over 40 years in the ENM Lifestyle.
                </Text>
            </View>
            <TouchableOpacity style={styles.dt_event_button}>
                <Text style={styles.dt_event_button_text}>Pending</Text>
            </TouchableOpacity>

            {Icon ? (
                <View style={styles.dt_overlay}>
                    <Icon {...IconProps(ms(15))} fill={Colors.dt_white} />
                </View>
            ) : null}
        </View>
    )
}

export default EventCard