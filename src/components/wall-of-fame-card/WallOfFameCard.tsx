/**React Imports */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { WallOfFameCardstyles as styles } from './styles'
import { Colors } from '../../utils/constant/Constant'
import { IconProps } from '../../utils/helpers/Iconprops'
import { WellfameActions } from '../common/helper'
import { ms } from '../../utils/helpers/responsive'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import TvIcon from '@svgs/tv.svg'
import MessageIcon from '@svgs/messages.svg'
import CalendarIcon from '@svgs/drawericon/calendar.svg'
import CoupleIcon from '@svgs/couple.svg'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

/**Components */
import ModalAction from '../modal/modal-action/ModalAction'
import Information from '../modal/modal-content/information/Information'

const WallOfFameCard: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [DropdownType, setDropdownType] = useState('');

    const Navigation = useNavigation<any>()
    return (
        <View style={styles.dt_user_info_card}>
            <View style={styles.dt_image_container}>
                <Image source={require('@images/dummy.png')} style={styles.dt_image} />
            </View>

            <View style={styles.dt_bio_container}>
                <View style={styles.dt_profile_content}>
                    {WellfameActions.map(({ id, icon: Icon, size, count }) => ( 
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
            <View style={styles.dt_name_container}>
                <Text style={styles.dt_name}>TestUser</Text>
                <View style={styles.dt_button_container}>
                    <TouchableOpacity style={styles.dt_button} onPress={() => { setShowDropdown(true), setDropdownType("info") }}>
                        <TvIcon {...IconProps(ms(17))} fill={Colors.dt_card_blue} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dt_button} onPress={() => Navigation.navigate("MessengerScreen")}>
                        <MessageIcon {...IconProps(ms(16))} fill={Colors.dt_card_blue} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dt_button} onPress={() => { setShowDropdown(true), setDropdownType("travel_time") }}>
                        <CalendarIcon {...IconProps(ms(16))} fill={Colors.dt_card_blue} />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={[styles.dt_age_container, { justifyContent: "space-between" }]}>
                <View style={styles.dt_age_container}>
                    <View style={styles.dt_age}>
                        <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                        <Text style={styles.dt_age_text}>0</Text>
                    </View>
                    <View style={styles.dt_age}>
                        <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                        <Text style={styles.dt_age_text}>0</Text>
                    </View>
                </View>
                <View style={[styles.dt_intrest_container, { alignItems: "flex-end" }]}>
                    <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                    <View style={[styles.dt_location_container]}>
                        <Text style={styles.dt_location_text}>Not specified</Text>
                    </View>
                </View>
            </View>
            <View style={styles.dt_intrest_container}>
                <Text style={styles.dt_intrest_text}>Interestes</Text>
                <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                    <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                    <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                    <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                </View>
            </View>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText={DropdownType === "travel_time" ? "Travel Time" : "Information"}
                type="logout"
            >
                <Information
                    {...{
                        type: DropdownType
                    }}
                />
            </ModalAction>
        </View>
    )
}

export default WallOfFameCard