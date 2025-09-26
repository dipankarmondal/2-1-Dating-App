import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { PartyEventDetailsScreenStyles as styles } from './styles'
import ScreenLayout from '../../common/ScreenLayout'
import { ms } from '../../../../utils/helpers/responsive'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { Colors } from '../../../../utils/constant/Constant'
import LocationIcon from '@svgs/location.svg'
import ActionIcon from '@svgs/dots-vertical.svg'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import { Buttons } from './helper'
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'
import DateIcon from '@svgs/date.svg'
import MessagesIcon from '@svgs/messages.svg'

type Props = {
    route: any
}

const PartyEventDetailsScreen: React.FC<Props> = ({ route }) => {
    const { header } = route.params || {}

    const [showModal, setShowModal] = React.useState(false)


    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: header
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: ms(50) }}>
                <View style={styles.dt_container}>
                    <View style={styles.dt_header_container}>
                        <Text style={styles.dt_header_text}>RED HOT LOVERS & SECRET CANDLELIT ✨ saasdasd</Text>
                    </View>
                    <View style={styles.dt_user_info_card}>
                        <View style={styles.dt_image_container}>
                            <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                            <TouchableOpacity style={styles.dt_action_overlay} onPress={() => setShowModal(!showModal)}>
                                <ActionIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dt_info_container}>
                            <View style={styles.dt_name_container}>
                                <Text style={styles.dt_name_text}>Private Party</Text>
                                <View style={styles.dt_location_container}>
                                    <LocationIcon {...IconProps(ms(11))} fill={Colors.dt_gray} />
                                    <Text style={[styles.dt_name_text, { color: Colors.dt_gray }]}>Altedo, ITA | 4256 mi</Text>
                                </View>
                            </View>
                            <View style={styles.dt_name_container}>
                                <View>
                                    <Text style={[styles.dt_inner_header_text, { textAlign: "left" }]}>Start Date</Text>
                                    <Text style={styles.dt_inner_sub_text}>Mar 14 2025 from 10:00PM</Text>
                                </View>
                                <View>
                                    <Text style={[styles.dt_inner_header_text, { textAlign: "right" }]}>End Date</Text>
                                    <Text style={styles.dt_inner_sub_text}>Mar 14 2025 from 10:00PM</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dt_organize_container}>
                        <Text style={styles.dt_organize_title}>Information</Text>
                        <Text style={styles.dt_organize_title}>Organizer: {header}</Text>
                    </View>
                    <View style={styles.dt_organize_info}>
                        <View style={styles.dt_organize_info_container}>
                            <View style={styles.dt_inner}>
                                <Text style={styles.dt_inner_header_text}>Welcomeing</Text>
                                <View style={styles.dt_inner_container}>
                                    <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                                    <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                    <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                </View>
                            </View>
                            <View style={styles.dt_inner}>
                                <Text style={styles.dt_inner_header_text}>Guest List</Text>
                                <Text style={styles.dt_inner_approval_text}>Approval Only</Text>
                            </View>
                            <View style={styles.dt_inner}>
                                <Text style={[styles.dt_inner_header_text, { textAlign: "right" }]}>Location</Text>
                                <View style={styles.dt_inner_container}>
                                    <LocationIcon {...IconProps(ms(11))} fill={Colors.dt_gray} />
                                    <Text style={styles.dt_inner_sub_text}>Altedo, ITA | 4256 mi</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dt_organize_buttons}>
                            <TouchableOpacity style={[styles.dt_button, { borderColor: Colors.dt_error }]}>
                                <DateIcon {...IconProps(ms(15))} fill={Colors.dt_error} />
                                <Text style={[styles.dt_button_text,{ color: Colors.dt_error}]}>Add to calendar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dt_button}>
                                <MessagesIcon {...IconProps(ms(15))} fill={Colors.dt_card_blue} />
                                <Text style={styles.dt_button_text}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dt_line}/>
                    </View>
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showModal}
                setModalVisible={setShowModal}
                headerText="Actions"
                type="events"
            >
                <View style={{ gap: ms(16) }}>
                    {
                        Buttons?.map((item, index) => {
                            const Icon = item?.icon
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dt_action_container}
                                    onPress={item?.onPress}
                                >
                                    <Icon {...IconProps(item?.size)} fill={Colors.dt_white} />
                                    <Text style={styles.dt_action_text}>{item?.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ModalAction>
        </ScreenLayout>
    )
}

export default PartyEventDetailsScreen 