/**React Imports */
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { use, useState } from 'react'

/**Local imports*/
import { ProfileContentStyles as styles } from './styles'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms, showToast } from '../../../utils/helpers/responsive'
import { Colors, getAge } from '../../../utils/constant/Constant'
import { profileButtons } from './helper'
import { ProfileExtraMenuItems, ProfileUserMenuItems } from '../../common/helper'
import { CreateInteraction, GetMediaLibrary } from '../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import LocationIcon from '@svgs/location.svg'
import BanIcon from '@svgs/ban.svg'
import ReportUserIcon from '@svgs/report_user.svg'
import LikeIcon from '@svgs/like.svg'
import InviteFrindIcon from '@svgs/setting/invite.svg'
import BellIcon from '@svgs/bell.svg'

/**Components */
import MulteImage from '../../multeimage/MulteImage'
import ComparisonTable from './ProfileDatiles'
import TopMenu from '../../top-menu'
import GalleryModal from '../../modal/gallery-modal/GalleryModal'

/** Liabary*/
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Loader from '../../loader/Loader'
import ProfileTabContent from './profile-extra-menu/ProfileTabContent'
import MenuBox from '../../menu-box/MenuBox'
import { useNavigation } from '@react-navigation/native'

type Props = {
    data: any,
    type?: string,
    setTopMenuKey?: any
}

/**Main export*/
const ProfileContent: React.FC<Props> = ({ data, type, setTopMenuKey }) => {

    const userType = type === "friends" && "friend"
    const { Token, user } = useAuth()
    const QueryInvalidater = useQueryClient();
    const isUser = user?._id === data?.id
    const Navigation = useNavigation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeKey, setActiveKey] = useState(userType ? "groups" : "groups");
    const [visible, setVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [Counts, setCounts] = useState({ friends: 0, groups: 0, });

    const { data: userPhotoLiabary, isLoading } = useQuery({
        queryKey: ["userPhotoLiabary"],
        queryFn: () => GetMediaLibrary(Token, user?.id, null, "profile", null, null),
        enabled: !!Token
    })

    const ProfilePhotos = type === "friends" ? data?.profile?.photos : userPhotoLiabary?.data?.media?.map((item) => item.url);

    const images = [
        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
        "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"
    ];

    //**Menu Items*/
    const mainMenuItems = [
        data?.isFriend && {
            key: "block",
            label: "Block User",
            Icon: BanIcon,
            onClick: () => handleClick(data?.id, "block"),
        },
        {
            key: "report",
            label: "Report User",
            Icon: ReportUserIcon,
            onClick: () => handleClick(data?.id, "report"),
        },
    ].filter(Boolean);

    const GenderInfo = ({ Icon, color, age }: { Icon: any; color: string; age: number }) => (
        <View style={styles.dt_edit_container}>
            <Icon {...IconProps(ms(17))} fill={color} />
            <Text style={styles.dt_edit_text}>{getAge(age)}</Text>
        </View>
    );

    const handleClick = (id: string, type: string) => {
        const payload = {
            targetUserId: id,
            interactionType: type
        }
        UserInteractionMutation.mutate(payload)
    };


    const UserInteractionMutation = useMutation({
        mutationFn: (data: any) => CreateInteraction(Token, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                showToast("success", res?.message);
                setIsVisible(false);
                QueryInvalidater.invalidateQueries({ queryKey: ['userSinleProfile'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['userPhotoLiabary'] });
            }
        },
        onError: (error: any) => {
            showToast("error", error?.response?.data?.message);
        }
    })

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
                            {
                                !isUser && (
                                    <MenuBox
                                        {...{
                                            MenuData: mainMenuItems,
                                            isVisible: isVisible,
                                            setIsVisible: setIsVisible
                                        }}
                                    />
                                )
                            }
                        </View>
                    </View>
                    <Text style={styles.dt_profile_bio}>{data?.profile?.bio}</Text>
                    <View style={styles.dt_location_container}>
                        <LocationIcon {...IconProps(ms(17))} fill={Colors.dt_gray} />
                        <Text style={styles.dt_location_text}>{data?.profile?.address?.fullAddress}</Text>
                    </View>
                    <View style={styles.dt_image_container}>
                        {
                            isLoading ? <Loader /> :
                                <Image source={{ uri: ProfilePhotos[currentIndex] ?? images[currentIndex] }} style={styles.dt_image} />
                        }
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
                        {profileButtons(data, isUser, Navigation, setTopMenuKey).map(({ id, label, icon: Icon, onPress, size, count }) => (
                            <TouchableOpacity key={id} style={styles.dt_button_two} onPress={onPress}>
                                <Icon {...IconProps(ms(size))} fill={Colors.dt_white} />
                                <Text style={styles.dt_button_text}>{label}</Text>

                                {
                                    count !== null && (
                                        <View style={styles.dt_count_container}>
                                            <Text style={[styles.dt_button_text, { fontSize: ms(10) }]}>{count}</Text>
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
                MenuData: userType ? ProfileUserMenuItems(Counts) : ProfileExtraMenuItems(Counts),
                activeKey,
                setActiveKey,
                isTwoItem: true,
                type: "profile"
            }} />

            <ProfileTabContent
                {...{
                    userType,
                    activeKey: activeKey,
                    setCounts,
                    ID: data?._id
                }}
            />
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

