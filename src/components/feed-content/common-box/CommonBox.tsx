import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FeedContentStyles as styles } from '../FeedContentStyle'
import { ms } from '../../../utils/helpers/responsive'
import { Colors } from '../../../utils/constant/Constant'
import CakeIcon from '@svgs/cake-birthday.svg'
import GlassIcon from '@svgs/glass-cheers.svg'
import LiveIcon from '@svgs/appicon/live.svg'
import { IconProps } from '../../../utils/helpers/Iconprops'

const CommonBox: React.FC<{ type?: string }> = ({ type }) => {
    return (
        <View style={[styles.dt_user_info_card, { marginTop: ms(15) }]}>
            {
                type === 'birthday' ? (
                    <View style={styles.dt_birthday_container}>
                        <View style={styles.dt_birthday_icon_container}>
                            <CakeIcon {...IconProps(ms(25))} fill={Colors.dt_white} />
                        </View>
                        <Text style={styles.dt_text}>birthday</Text>
                    </View>
                ) : type === 'hotdate' ?
                    (
                        <View style={styles.dt_birthday_container}>
                            <View style={styles.dt_birthday_icon_container}>
                                <GlassIcon {...IconProps(ms(25))} fill={Colors.dt_white} />
                            </View>
                            <Text style={styles.dt_text}>ANASDF2020 is posted a Hotdate</Text>
                        </View>
                    ) : type === 'livestream' ? (
                        <View style={styles.dt_birthday_container}>
                            <View style={styles.dt_birthday_icon_container}>
                                <LiveIcon {...IconProps(ms(25))} fill={Colors.dt_white} />
                            </View>
                            <Text style={styles.dt_text}>ANASDF2020 started livestream</Text>
                        </View>
                    ) :
                        (
                            <View style={styles.dt_event_button_container}>
                                <TouchableOpacity style={[styles.dt_event_button, styles.dt_accept_btn]}>
                                    <Text style={styles.dt_event_button_text}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.dt_event_button, styles.dt_deny_btn]}>
                                    <Text style={styles.dt_event_button_text}>Deny</Text>
                                </TouchableOpacity>
                            </View>
                        )
            }
        </View>
    )
}

export default CommonBox