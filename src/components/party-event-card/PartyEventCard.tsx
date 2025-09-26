/**React Imports */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { PartyEventCardStyles as styles } from './styles'
import { Colors } from '../../utils/constant/Constant'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'

import { useNavigation } from '@react-navigation/native'
/**Icons*/
import LocationIcon from '@svgs/location.svg'
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'
import GroupIcon from '@svgs/group.svg'

/**Main export*/
const PartyEventCard: React.FC = () => {
    const Navigation = useNavigation<any>()
    return (
        <TouchableOpacity
            style={styles.dt_user_info_card}
            activeOpacity={0.8}
            onPress={() => Navigation.navigate("PartyEventDetailsScreen",{header: "SPLENDIDPARTYS"})}
        >
            <View style={styles.dt_image_container}>
                <Image source={require('@images/dummy.png')} style={styles.dt_image} />
            </View>
            <View style={styles.dt_info_container}>
                <Text style={styles.dt_event_text}>SUNSET VIBES & SINGLES</Text>
                <View>
                    <View style={styles.dt_name_container}>
                        <Text style={styles.dt_name_text}>Private Party</Text>
                        <Text style={styles.dt_name_text}>Mar 14,2025</Text>
                    </View>
                    <Text style={styles.dt_group_creater}>by
                        <Text style={{ color: Colors.dt_success_green }}> SPLENDIDPARTYS</Text>
                    </Text>
                    <View style={styles.dt_name_container}>
                        <View style={styles.dt_location_container}>
                            <LocationIcon {...IconProps(ms(11))} fill={Colors.dt_gray} />
                            <Text style={[styles.dt_name_text, { color: Colors.dt_gray }]}>Altedo, ITA | 4256 mi</Text>
                        </View>
                        <Text style={[styles.dt_name_text, { color: Colors.dt_gray }]}>1587 mi</Text>
                    </View>
                    <View style={styles.dt_name_container}>
                        <View style={styles.dt_location_container}>
                            <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                            <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                            <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                        </View>
                        <View style={styles.dt_location_container}>
                            <GroupIcon {...IconProps(ms(16))} fill={Colors.dt_gray} />
                            <Text style={[styles.dt_name_text, { color: Colors.dt_gray }]}>120</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PartyEventCard