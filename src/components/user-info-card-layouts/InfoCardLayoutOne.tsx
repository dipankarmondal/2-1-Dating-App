/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { InfoCardLayoutsStyles as styles } from './styles'
import { Colors, getAge } from '../../utils/constant/Constant'
import { NewMemberActions } from '../common/helper'
import { ms } from '../../utils/helpers/responsive'
import { IconProps } from '../../utils/helpers/Iconprops'
import { InfoCardLayoutOnetype } from '../../utils/types/types'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'
import LoaderKitView from 'react-native-loader-kit'

/**Main export*/
const InfoCardLayoutOne: React.FC<InfoCardLayoutOnetype> = ({ item = [], type, handleAcceptCall, handleDeclineCall, loader, selectionAction, selectedId, itemId, }) => {

    const Intrest = item?.viewedUserId?.profile?.interestedIn || item?.profile?.interestedIn || item?.targetUserId?.profile?.interestedIn || item?.receiverId?.profile?.interestedIn || item?.interestIn
    const Location = item?.viewedUserId?.profile?.address?.fullAddress || item?.profile?.address?.fullAddress || item?.targetUserId?.profile?.address?.fullAddress || item?.receiverId?.profile?.address?.fullAddress || item?.address?.fullAddress

    const Gender = item?.profile?.gender ?? item?.gender
    const PartnerAge = getAge(item?.profile?.partner?.dateOfBirth) ?? item?.partnerAge
    const Age = item?.profile?.age ?? item?.age

    return (
        <View>
            <View style={styles.dt_intrest}>
                <View style={[styles.dt_age_container, { marginTop: ms(10) }]}>
                    {Gender === "couple" ? (
                        <>
                            <View style={styles.dt_age}>
                                <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                <Text style={styles.dt_age_text}>{PartnerAge ? PartnerAge : "0"}</Text>
                            </View>
                            <View style={styles.dt_age}>
                                <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                <Text style={styles.dt_age_text}>{Age ? Age : "0"}</Text>
                            </View>
                        </>
                    ) : Gender === "female" ? (
                        <View style={styles.dt_age}>
                            <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                            <Text style={styles.dt_age_text}>{Age ? Age : "0"}</Text>
                        </View>
                    ) : (
                        <View style={styles.dt_age}>
                            <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                            <Text style={styles.dt_age_text}>{Age ? Age : "0"}</Text>
                        </View>
                    )}
                </View>
                {
                    type !== "like_and_dislike" && (
                        <View style={styles.dt_intrest_container}>
                            <Text style={styles.dt_intrest_text}>Interests</Text>
                            <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                                {Intrest?.includes('couple') && (
                                    <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                                )}
                                {Intrest?.includes('male') && (
                                    <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                )}
                                {Intrest?.includes('female') && (
                                    <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                )}
                                {!(
                                    Intrest?.includes('couple') ||
                                    Intrest?.includes('male') ||
                                    Intrest?.includes('female')
                                ) && (
                                        <Text style={[styles.dt_location_text, { textAlign: "left" }]}>
                                            Not specified
                                        </Text>
                                    )}
                            </View>
                        </View>
                    )
                }
            </View>
            <View style={[styles.dt_intrest, { flexDirection: "column" }]}>
                <View style={styles.dt_intrest_container}>
                    <Text style={styles.dt_intrest_text}>Location</Text>
                    <View style={[styles.dt_location_container]}>
                        <Text style={[styles.dt_location_text, { textAlign: "left" }]}>
                            {Location ?? "Not specified"}
                        </Text>
                    </View>
                </View>
            </View>
            {
                type === "friends_request" && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.rejectButton} onPress={handleDeclineCall}>
                            {loader && selectionAction === "decline" && itemId === selectedId ? (
                                <LoaderKitView
                                    style={{ width: 35, height: 35 }}
                                    name={'BallScaleMultiple'}
                                    animationSpeedMultiplier={1.0}
                                    color={Colors.dt_bg}
                                />
                            ) : (
                                <Text style={styles.buttonText}>Reject</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptCall} >
                            {loader && selectionAction === "accept" && itemId === selectedId ? (
                                <LoaderKitView
                                    style={{ width: 35, height: 35 }}
                                    name={'BallScaleMultiple'}
                                    animationSpeedMultiplier={1.0}
                                    color={Colors.dt_bg}
                                />
                            ) : (
                                <Text style={styles.buttonText}>Accept</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )
            }
            <View style={[styles.dt_profile_content, { marginTop: ms(10) }]}>
                {NewMemberActions(item).map(({ id, icon: Icon, size, count }) => (
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

export default InfoCardLayoutOne