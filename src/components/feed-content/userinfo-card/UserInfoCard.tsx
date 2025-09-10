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

/**Components */
import ModalAction from '../../modal/modal-action/ModalAction'
import Information from '../../modal/modal-content/information/Information'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import MulteImage from '../../multeimage/MulteImage'

const UserInfoCard: React.FC<UserInfoCardProps> = ({ type, Icon, isMore, item }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);

    const Navigation = useNavigation<any>()
    const images = [
        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
        "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"
    ];

    console.log("asdfasdf", item?.profile?.photos?.length)

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
                                image: item?.profile?.photos ?? images
                            }}
                        />
                    )
                }
            </View>
            <View style={styles.dt_info_container}>
                <View style={styles.dt_name_container}>
                    <Text style={styles.dt_name}>{item?.username ?? "--"}</Text>
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
                        {
                            item?.profile?.gender === "couple" && (
                                <View style={styles.dt_age}>
                                    <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                    <Text style={styles.dt_age_text}>{item?.profile?.age ?? "--"}</Text>
                                </View>
                            )
                        }
                        <View style={styles.dt_age}>
                            <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                            <Text style={styles.dt_age_text}>{item?.profile?.age ?? "--"}</Text>
                        </View>
                    </View>
                    <View style={styles.dt_intrest}>
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
                        <View style={styles.dt_intrest_container}>
                            <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                            <View style={[styles.dt_age_container, styles.dt_location_container]}>
                                <Text style={styles.dt_location_text}>{item?.profile?.address?.fullAddress}</Text>
                            </View>
                        </View>
                    </View>
                </View>
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