/**React Imports */
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { use, useState } from 'react'

/**Local imports*/
import { ProfileContentStyles as styles } from './styles'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/responsive'
import { Colors, getAge } from '../../../utils/constant/Constant'
import { profileButtons } from './helper'
import { ProfileExtraMenuItems } from '../../common/helper'
import { GetMediaLibrary } from '../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import LocationIcon from '@svgs/location.svg'

/**Components */
import MulteImage from '../../multeimage/MulteImage'
import ComparisonTable from './ProfileDatiles'
import TopMenu from '../../top-menu'
import Certifications from './profile-extra-menu/Certifications'
import GalleryModal from '../../modal/gallery-modal/GalleryModal'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'

type Props = {
    data: any
}

/**Main export*/
const ProfileContent: React.FC<Props> = ({ data }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeKey, setActiveKey] = useState("groups");
    const [visible, setVisible] = useState(false);

    const { Token, user } = useAuth()


    const { data: userPhotoLiabary } = useQuery({
        queryKey: ["userPhotoLiabary"],
        queryFn: () => GetMediaLibrary(Token, user?.id, null, "profile", null, null),
        enabled: !!Token
    })

    const ProfilePhotos = userPhotoLiabary?.data?.media?.map((item) => item.url) || [];

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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

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
                    <Text style={styles.dt_profile_bio}>{data?.profile?.bio}</Text>
                    <View style={styles.dt_location_container}>
                        <LocationIcon {...IconProps(ms(17))} fill={Colors.dt_gray} />
                        <Text style={styles.dt_location_text}>{data?.profile?.address?.fullAddress}</Text>
                    </View>
                    <View style={styles.dt_image_container}>
                        <Image source={{ uri: ProfilePhotos[currentIndex] ?? images[currentIndex] }} style={styles.dt_image} />
                        <MulteImage
                            {...{
                                currentIndex,
                                setCurrentIndex,
                                image: ProfilePhotos ?? images,
                                isOption: false,
                                isGallery: true,
                                setVisible
                            }}
                        />
                    </View>
                    <View style={styles.dt_profile_content}>
                        {profileButtons(data?.friendCount).map(({ id, label, icon: Icon, onPress, size }) => (
                            <TouchableOpacity key={id} style={styles.dt_button_two} onPress={onPress}>
                                <Icon {...IconProps(ms(size))} fill={Colors.dt_white} />
                                <Text style={styles.dt_button_text}>{label}</Text>
                                {
                                    label !== "Share" && (
                                        <View style={styles.dt_count_container}>
                                            <Text style={[styles.dt_button_text, { fontSize: ms(10) }]}>{0}</Text>
                                        </View>
                                    )
                                }
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {["male", "female", "couple"].includes(data?.profile?.gender) && (
                    <ComparisonTable
                        {...{
                            type: data?.profile?.gender,
                            profile: data?.profile
                        }}
                    />
                )}

            </View>
            <TopMenu {...{
                MenuData: ProfileExtraMenuItems,
                activeKey,
                setActiveKey,
                isTwoItem: true
            }} />

            <Certifications activeKey={activeKey} />
            <GalleryModal
                {...{
                    visible: visible,
                    setVisible: setVisible,
                    photos: ProfilePhotos ?? images
                }}
            />
        </ScrollView>

    )
}

export default ProfileContent

