import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FeedContentStyles as styles } from '../FeedContentStyle'
import TvIcon from '@svgs/tv.svg'
import MessageIcon from '@svgs/messages.svg'
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/responsive'
import { Colors } from '../../../utils/constant/Constant'
import { profileActions } from '../../common/helper'
import ModalAction from '../../modal/modal-action/ModalAction'
import Information from '../../modal/modal-content/information/Information'
import { useNavigation } from '@react-navigation/native'

type Props = {
    type?: string,
    Icon?: React.ComponentType<any>
}

const UserInfoCard: React.FC<Props> = ({ type, Icon }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const Navigation = useNavigation<any>()

    return (
        <View style={[styles.dt_user_info_card, { marginTop: type === "friend_request" ? ms(15) : ms(0) }]}>
            <View style={styles.dt_image_container}>
                <Image source={require('@images/dummy.png')} style={styles.dt_image} />
            </View>
            <View style={styles.dt_info_container}>
                <View style={styles.dt_name_container}>
                    <Text style={styles.dt_name}>CPLSUEPAUl</Text>
                    <View style={styles.dt_button_container}>
                        <TouchableOpacity style={styles.dt_button} onPress={() => setShowDropdown(true)}>
                            <TvIcon {...IconProps(ms(17))} fill={Colors.dt_card_blue} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dt_button} onPress={() => Navigation.navigate("MessengerScreen")}>
                            <MessageIcon {...IconProps(ms(16))} fill={Colors.dt_card_blue} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dt_bio_container}>
                    <View style={styles.dt_age_container}>
                        <View style={styles.dt_age}>
                            <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                            <Text style={styles.dt_age_text}>15</Text>
                        </View>
                        <View style={styles.dt_age}>
                            <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                            <Text style={styles.dt_age_text}>15</Text>
                        </View>
                    </View>
                    <View style={styles.dt_intrest}>
                        <View style={styles.dt_intrest_container}>
                            <Text style={styles.dt_intrest_text}>Interestes</Text>
                            <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                                <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                                <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                            </View>
                        </View>
                        <View style={styles.dt_intrest_container}>
                            <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                            <View style={[styles.dt_age_container, styles.dt_location_container]}>
                                <Text style={styles.dt_location_text}>94555, CA, USA 8424 mi </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.dt_bio_container}>
                    <View style={styles.dt_profile_content}>
                        {profileActions.map(({ id, icon: Icon, size, count }) => (
                            <TouchableOpacity
                                key={id}
                                style={[styles.dt_button_two, { backgroundColor: Colors.dt_gray + '33' }]}
                            >
                                <Icon {...IconProps(size)} fill={Colors.dt_card_blue} />
                                <Text style={styles.dt_profile_text}>{count}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            {Icon ? (
                <View style={styles.dt_overlay}>
                    <Icon {...IconProps(ms(15))} fill={Colors.dt_white} />
                </View>
            ) : null}
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Information"
                type="logout"
            >
                <Information />
            </ModalAction>
        </View>
    )
}

export default UserInfoCard