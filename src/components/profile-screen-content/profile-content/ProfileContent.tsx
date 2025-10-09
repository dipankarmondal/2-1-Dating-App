/**React Imports */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { ProfileContentStyles as styles } from './styles'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/responsive'
import { Colors, getAge } from '../../../utils/constant/Constant'
import { profileButtons } from './helper'
import { ProfileExtraMenuItems } from '../../common/helper'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import LocationIcon from '@svgs/location.svg'

/**Components */
import MulteImage from '../../multeimage/MulteImage'
import ComparisonTable from './ProfileDatiles'
import TopMenu from '../../top-menu'
import Certifications from './profile-extra-menu/Certifications'

type Props = {
    data: any
}

/**Main export*/
const ProfileContent: React.FC<Props> = ({ data }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeKey, setActiveKey] = useState("groups");

    const images = [
        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
        "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"
    ];

    const GenderInfo = ({ Icon, color, age }: { Icon: any; color: string; age: number }) => (
        <View style={styles.dt_edit_container}>
            <Icon {...IconProps(ms(17))} fill={color} />
            <Text style={styles.dt_edit_text}>{getAge(age)}</Text>
        </View>
    );

    return (
        <>
            <View style={styles.dt_container}>
                <View style={styles.dt_profile_card_container}>
                    <View style={styles.dt_profile_header}>
                        <Text style={styles.dt_profile_header_text}>{data?.username}</Text>
                        <View style={styles.dt_profile_right_content}>
                            {data?.profile?.gender === "male" && (
                                <GenderInfo Icon={MaleIcon} color={Colors.dt_card_blue} age={data?.profile?.dateOfBirth} />
                            )}
                            {data?.profile?.gender === "female" && (
                                <GenderInfo Icon={FemaleIcon} color={Colors.dt_error} age={data?.profile?.dateOfBirth} />
                            )}
                            {data?.profile?.gender === "couple" && (
                                <>
                                    <GenderInfo Icon={MaleIcon} color={Colors.dt_card_blue} age={data?.profile?.dateOfBirth} />
                                    <GenderInfo Icon={FemaleIcon} color={Colors.dt_error} age={data?.profile?.dateOfBirth} />
                                </>
                            )}
                        </View>
                    </View>
                    <View style={styles.dt_location_container}>
                        <LocationIcon {...IconProps(ms(17))} fill={Colors.dt_gray} />
                        <Text style={styles.dt_location_text}>{data?.profile?.address?.fullAddress}</Text>
                    </View>
                    <View style={styles.dt_image_container}>
                        <Image source={{ uri: data?.profile?.photos[currentIndex] ?? images[currentIndex] }} style={styles.dt_image} />
                        <MulteImage
                            {...{
                                currentIndex,
                                setCurrentIndex,
                                image: data?.profile?.photos ?? images,
                                isOption: false
                            }}
                        />
                    </View>
                    <View style={styles.dt_profile_content}>
                        {profileButtons.map(({ id, label, icon: Icon, onPress, size }) => (
                            <TouchableOpacity key={id} style={styles.dt_button_two} onPress={onPress}>
                                <Icon {...IconProps(ms(size))} fill={Colors.dt_card_blue} />
                                <Text style={styles.dt_button_text}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {["male", "female", "couple"].includes(data?.profile?.gender) && (
                    <ComparisonTable type={data?.profile?.gender} />
                )}

            </View>
            <TopMenu {...{
                MenuData: ProfileExtraMenuItems,
                activeKey,
                setActiveKey,
                isTwoItem: true
            }} />

            <Certifications activeKey = {activeKey}/>
        </>
    )
}

export default ProfileContent

