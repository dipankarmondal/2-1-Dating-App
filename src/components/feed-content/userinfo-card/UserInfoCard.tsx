/**React Imports */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { FeedContentStyles as styles } from '../FeedContentStyle'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/responsive'
import { Colors } from '../../../utils/constant/Constant'
import { UserInfoCardProps } from '../../../utils/types/types'

/**Icons*/
import TvIcon from '@svgs/tv.svg'
import MessageIcon from '@svgs/messages.svg'
import ClockIcon from '@svgs/appicon/clock.svg'
import CalendarIcon from '@svgs/drawericon/calendar.svg'
import CheckIcon from '@svgs/check.svg'

/**Components */
import ModalAction from '../../modal/modal-action/ModalAction'
import Information from '../../modal/modal-content/information/Information'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import MulteImage from '../../multeimage/MulteImage'
import GalleryModal from '../../modal/gallery-modal/GalleryModal'

const UserInfoCard: React.FC<UserInfoCardProps> = ({ type, Icon, isMore, item, isOption, isUserContent, isFilterOption, isGallery, isChecked, setIsChecked, children, profileImages = [], UserName,isBroadcastCheck,handleBroadcast,userId,menuData }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [DropdownType, setDropdownType] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    const Navigation = useNavigation<any>()


    const UserInfoContent = () => {
        return (
            <>
                <View style={styles.dt_image_container}>
                    <Image
                        source={
                            profileImages?.[currentIndex]
                                ? { uri: profileImages[currentIndex] }
                                : require('@images/dummy.png')
                        }
                        style={styles.dt_image}
                    />
                    {
                        isMore && (
                            <MulteImage
                                {...{
                                    currentIndex,
                                    setCurrentIndex,
                                    image: profileImages,
                                    isOption,
                                    type,
                                    isFilterOption,
                                    isGallery,
                                    setVisible,
                                    menuData,
                                }}
                            />
                        )
                    }
                </View>
                <View style={styles.dt_info_container}>
                    <View style={styles.dt_name_container}>
                        <Text style={styles.dt_name}>{UserName}</Text>
                        <View style={styles.dt_button_container}>
                            <TouchableOpacity style={styles.dt_button} onPress={() => { setShowDropdown(true), setDropdownType("info") }}>
                                <TvIcon {...IconProps(ms(17))} fill={Colors.dt_card_blue} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.dt_button} onPress={() => Navigation.navigate("DrawerNavigator","MessengerScreen")}>
                                <MessageIcon {...IconProps(ms(16))} fill={Colors.dt_card_blue} />
                            </TouchableOpacity> */}
                            {
                                (type === "hotdate" || type === "travel") && (
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
                            {
                                isBroadcastCheck === true && (
                                    <TouchableOpacity
                                        style={[styles.dt_check_button, isChecked && { backgroundColor: Colors.dt_primary_green }]}
                                        onPress={handleBroadcast}
                                    >
                                        {isChecked && <CheckIcon {...IconProps(ms(18))} fill={"#fff"} />}
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                    {/* <View style={styles.dt_bio_container}>
                    <View style={[styles.dt_age_container, { justifyContent: "space-between" }]}>
                        <View style={styles.dt_age_container}>
                            <View style={styles.dt_age}>
                                <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                <Text style={styles.dt_age_text}>{item?.profile?.age ?? "0"}</Text>
                            </View>
                            <View style={styles.dt_age}>
                                <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                <Text style={styles.dt_age_text}>{item?.profile?.age ?? "0"}</Text>
                            </View>
                        </View>
                        <View style={[styles.dt_intrest_container, { alignItems: "flex-end" }]}>
                            <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                            <View style={[styles.dt_location_container]}>
                                <Text style={styles.dt_location_text}>{item?.profile?.address?.fullAddress ?? "Not specified"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dt_intrest}>
                        {
                            type === "livestream" && (
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
                            )
                        }

                    </View>
                    {
                        type === "hotdate" || type === "travel" && (
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
                                    {
                                        type === "travel" ?
                                            <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Travel date</Text> :
                                            <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Private Place</Text>
                                    }
                                    <View style={[styles.dt_age_container, styles.dt_location_container]}>
                                        <Text style={styles.dt_location_text}>Mar 08, 2025 - Mar 09, 2025 - Mar 15, 2025 - Mar 16, 2025</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                    {
                        type === "travel" && (
                            <>
                                <Text style={styles.dt_travel_text}>Travelling to Hyderabad for one day , genuine singles can, more </Text>
                                <Text style={styles.dt_travel_time_text}>8h 4m</Text>
                            </>
                        )
                    }
                    {
                        type === "certifications" && (
                            <>
                                <Text style={styles.dt_travel_text}>male half visiting Hyderabad from US and has a Sexy and ...</Text>
                                <Text style={styles.dt_travel_time_text}>by FOR2MORE Feb 08, 2025</Text>
                            </>
                        )
                    }
                    {
                        type === "member" && (
                            <View style={[styles.dt_profile_content, { marginTop: ms(10) }]}>
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
                        )
                    }
                    {
                        type === "friends_request" && (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.rejectButton} >
                                    <Text style={styles.buttonText}>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.acceptButton} >
                                    <Text style={styles.buttonText}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    {
                        type === "view" && (
                            <Text style={styles.dt_travel_time_text}>9 Sept 2025, 11:27 pm</Text>
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
                } */}
                    {children}
                </View>

                {Icon ? (
                    <View style={styles.dt_overlay}>
                        <Icon {...IconProps(ms(15))} fill={Colors.dt_white} />
                    </View>
                ) : null}
            </>
        )
    }

    return (
        <View>
            {
                type === "user" ? (
                    <TouchableOpacity
                        style={styles.dt_user_info_card}
                        onPress={() => Navigation.navigate("ProfileScreen", { userId: item?._id ? item?._id : userId, type: "friends" })}
                        activeOpacity={0.5}
                    >
                        <UserInfoContent />
                        <ModalAction
                            isModalVisible={showDropdown}
                            setModalVisible={setShowDropdown}
                            headerText={DropdownType === "speed_date" ? "Speed Date" : DropdownType === "travel_time" ? "Travel Time" : "Information"}
                        >
                            <Information
                                {...{
                                    type: DropdownType
                                }}
                            />
                        </ModalAction>
                        <GalleryModal
                            {...{
                                visible: visible,
                                setVisible: setVisible,
                                photos: profileImages
                            }}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={[styles.dt_user_info_card, { marginTop: type === "friend_request" ? ms(15) : ms(0) }]}>
                        <UserInfoContent />
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
                        <GalleryModal
                            {...{
                                visible: visible,
                                setVisible: setVisible,
                                photos: profileImages
                            }}
                        />
                    </View>
                )
            }

        </View>
    )
}

export default UserInfoCard