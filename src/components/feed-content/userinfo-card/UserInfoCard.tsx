/**React Imports */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { FeedContentStyles as styles } from '../FeedContentStyle'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/responsive'
import { Colors } from '../../../utils/constant/Constant'
import { getProfileActions } from '../../common/helper'
import { UserInfoCardProps } from '../../../utils/types/types'

/**Icons*/
import TvIcon from '@svgs/tv.svg'
import MessageIcon from '@svgs/messages.svg'
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'
import ClockIcon from '@svgs/appicon/clock.svg'
import ViewIcon from '@svgs/setting/views.svg'
import TimeIcon from '@svgs/setting/time.svg'
import CalendarIcon from '@svgs/drawericon/calendar.svg'

/**Components */
import ModalAction from '../../modal/modal-action/ModalAction'
import Information from '../../modal/modal-content/information/Information'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import MulteImage from '../../multeimage/MulteImage'

const UserInfoCard: React.FC<UserInfoCardProps> = ({ type, Icon, isMore, item, isOption, isUserContent }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [DropdownType, setDropdownType] = useState('');
    console.log("fasdfasd", DropdownType)


    const Navigation = useNavigation<any>()
    const images = [
        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
        "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"
    ];

    return (
        <View style={[styles.dt_user_info_card, { marginTop: type === "friend_request" ? ms(15) : ms(0) }]}>
            <View style={styles.dt_image_container}>
                <Image
                    source={{
                        uri:
                            item?.profile?.photos?.length > 0
                                ? item?.profile?.photos[currentIndex]
                                : images[currentIndex],
                    }}
                    // source={{ uri:item?.profile?.photos[currentIndex]}}
                    style={styles.dt_image}
                />
                {
                    isMore && (
                        <MulteImage
                            {...{
                                currentIndex,
                                setCurrentIndex,
                                image: item?.profile?.photos ?? images,
                                isOption,
                                type
                            }}
                        />
                    )
                }
            </View>
            <View style={styles.dt_info_container}>
                <View style={styles.dt_name_container}>
                    <Text style={styles.dt_name}>{item?.username ?? "TestUser"}</Text>
                    <View style={styles.dt_button_container}>
                        <TouchableOpacity style={styles.dt_button} onPress={() => { setShowDropdown(true), setDropdownType("info") }}>
                            <TvIcon {...IconProps(ms(17))} fill={Colors.dt_card_blue} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dt_button} onPress={() => Navigation.navigate("MessengerScreen")}>
                            <MessageIcon {...IconProps(ms(16))} fill={Colors.dt_card_blue} />
                        </TouchableOpacity>
                        {
                            type === "hotdate" && (
                                <>
                                    <TouchableOpacity style={styles.dt_button} onPress={() => { setShowDropdown(true), setDropdownType("speed_date") }}>
                                        <ClockIcon {...IconProps(ms(17))} fill={Colors.dt_card_blue} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dt_button} onPress={() => { setShowDropdown(true), setDropdownType("travel_time") }}>
                                        <CalendarIcon {...IconProps(ms(16))} fill={Colors.dt_card_blue} />
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View>
                </View>
                <View style={styles.dt_bio_container}>
                    <View style={styles.dt_age_container}>
                        {
                            item?.profile?.gender === "couple" && (
                                <View style={styles.dt_age}>
                                    <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                    <Text style={styles.dt_age_text}>{item?.profile?.age ?? "0"}</Text>
                                </View>
                            )
                        }
                        <View style={styles.dt_age}>
                            <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                            <Text style={styles.dt_age_text}>{item?.profile?.age ?? "0"}</Text>
                        </View>
                    </View>
                    <View style={styles.dt_intrest}>
                        {
                            type === "livestream" ? (
                                <View style={[styles.dt_age_container, { marginTop: ms(5), gap: ms(8) }]}>
                                    <View style={styles.dt_live_info_container}>
                                        <ViewIcon {...IconProps(ms(20))} fill={Colors.dt_gray} />
                                        <Text style={styles.dt_location_text}>56</Text>
                                    </View>
                                    <View style={styles.dt_live_info_container}>
                                        <TimeIcon {...IconProps(ms(16))} fill={Colors.dt_gray} />
                                        <Text style={styles.dt_location_text}>55 min</Text>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.dt_intrest_container}>
                                    <Text style={styles.dt_intrest_text}>Interestes</Text>
                                    <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                                        {item?.profile?.interestedIn && item.profile.interestedIn.length > 0 ? (
                                            <>
                                                {item.profile.interestedIn.includes("couple") && (
                                                    <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                                                )}
                                                {item.profile.interestedIn.includes("male") && (
                                                    <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                                )}
                                                {item.profile.interestedIn.includes("female") && (
                                                    <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                                )}
                                            </>
                                        ) : (
                                            <Text style={styles.dt_intrest_text_empty}>Not specified</Text>
                                        )}
                                    </View>
                                </View>
                            )
                        }
                        <View style={styles.dt_intrest_container}>
                            <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                            <View style={[styles.dt_age_container, styles.dt_location_container]}>
                                <Text style={styles.dt_location_text}>{item?.profile?.address?.fullAddress ?? "Not specified"}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        type === "hotdate" && (
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
                                    <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Private Place</Text>
                                    <View style={[styles.dt_age_container, styles.dt_location_container]}>
                                        <Text style={styles.dt_location_text}>Mar 08, 2025 - Mar 09, 2025 - Mar 15, 2025 - Mar 16, 2025</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </View>
                {
                    isUserContent && (
                        <View style={styles.dt_bio_container}>
                            <View style={styles.dt_profile_content}>
                                {getProfileActions(item).map(({ id, icon: Icon, size, count }) => (
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
                    )
                }
            </View>

            {Icon ? (
                <View style={styles.dt_overlay}>
                    <Icon {...IconProps(ms(15))} fill={Colors.dt_white} />
                </View>
            ) : null}
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText={DropdownType === "speed_date" ? "Speed Date" : DropdownType === "travel_time" ? "Travel Time" : "Information"}
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

export default UserInfoCard