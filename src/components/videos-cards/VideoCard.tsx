/**React Imports */
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { VideoCardsStyles as styles } from './styles'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms, toast } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import { MenuItems } from '../../utils/types/types'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import TvIcon from '@svgs/tv.svg'
import MessageIcon from '@svgs/messages.svg'
import DotIcon from '@svgs/dots-vertical.svg'
import LikeIcon from '@svgs/like.svg'
import InviteFrindIcon from '@svgs/setting/invite.svg'
import BellIcon from '@svgs/bell.svg'
import MessengerIcon from '@svgs/messenger.svg'
import PlayIcon from '@svgs/play.svg'
import CoupleIcon from '@svgs/couple.svg'

/**Components */
import ModalAction from '../modal/modal-action/ModalAction'
import Information from '../modal/modal-content/information/Information'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../utils/context/auth-context/AuthContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateInteraction, GetGlobalVideos, GetMediaLibrary } from '../../utils/api-calls/content-api-calls/ContentApiCall'

type Props = {
    setVisible: any,
    item: any,
    setSource: any
}

// ✅ Reusable MenuItem component
const MenuItem: React.FC<MenuItems> = ({ Icon, label, onPress, iconStyle }) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.dt_menu_list}>
                <View style={iconStyle}>
                    <Icon {...IconProps(ms(15))} fill={Colors.dt_white} />
                </View>
                <Text style={styles.menuText}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
};

/**Main export*/
const VideoCard: React.FC<Props> = ({ setVisible, item, setSource }) => {
    const [DropdownType, setDropdownType] = useState('');
    const [showDropdown, setShowDropdown] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false);
    const [subMenuVisible, setSubMenuVisible] = useState(false);

    const Navigation = useNavigation<any>();
    const { Token, user } = useAuth()

    const UserIntrationMutation = useMutation({
        mutationFn: (data: any) => CreateInteraction(Token, data),
        onSuccess: (res) => {
            console.log("object", res)
            if (res?.success === true) {
                toast("success", { title: res?.message });
                // setSubMenuVisible(false);
                setMenuVisible(false);
            }
        },
    })

    const handleAction = (id: string, key: string) => {
        const payload = {
            targetUserId: id,
            interactionType: key
        }

        console.log("object", payload)
        UserIntrationMutation.mutate(payload)
    }

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
        setSubMenuVisible(false);
    };
    // 🔹 Menu data
    const mainMenuItems = (id: any) => [
        { key: "messenger", label: "Messenger", Icon: MessengerIcon },
        { key: "like", label: "Like", Icon: LikeIcon, onPress: () => setSubMenuVisible(true) },
        { key: "friend", label: "Friend request", Icon: InviteFrindIcon, onPress: () => { console.log("object", id) } },
        { key: "remember", label: "Remember", Icon: BellIcon },
    ];

    const subMenuItems = (id: any) => [
        { key: "like", label: "Like", Icon: LikeIcon, onPress: () => handleAction(id, "like") },
        { key: "dislike", label: "Not Interested", Icon: LikeIcon, iconStyle: { transform: [{ rotate: "180deg" }] }, onPress: () => handleAction(id, "dislike") },
    ];

    const renderMenu = () => (
        <View style={styles.menuContainer}>
            {mainMenuItems(item?.user?._id).map(({ key, Icon, label, onPress }) => (
                <MenuItem key={key} Icon={Icon} label={label} onPress={onPress} />
            ))}
        </View>
    );

    const renderSubMenu = () => (
        <View style={styles.menuContainer}>
            {subMenuItems(item?.user?._id).map(({ key, Icon, label, onPress, iconStyle }) => (
                <MenuItem
                    key={key}
                    Icon={Icon}
                    label={label}
                    onPress={onPress}
                    iconStyle={iconStyle}
                />
            ))}
        </View>
    );

    const isUser = item?.user?._id === user?._id

    const handlePlay = (like: string) => {
        setSource({ link: like, id: item?.user?._id })
        setVisible(true)
    }


    return (
        <View style={styles.dt_user_info_card}>
            <View style={styles.dt_image_container}>
                <Image source={item?.thumbnailUrl ? { uri: item?.thumbnailUrl } : require('@images/dummy.png')} style={styles.dt_image} />
                <View style={styles.dt_image_overlay}>
                    {/* {
                        !isUser && (
                            <View style={styles.dt_btn_container}>
                                <TouchableOpacity
                                    style={[styles.dt_more_container, { alignSelf: "flex-end" }]}
                                    onPress={toggleMenu}
                                >
                                    <DotIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                                </TouchableOpacity>
                            </View>
                        )
                    } */}
                    <View style={styles.dt_play_box}>
                        <TouchableOpacity style={styles.dt_play_button} activeOpacity={0.5} onPress={() => handlePlay(item?.url)}>
                            <PlayIcon {...IconProps(ms(16))} fill={Colors.dt_border} />
                        </TouchableOpacity>
                    </View>
                    {/* Menus */}
                    {/* {menuVisible && (subMenuVisible ? renderSubMenu() : renderMenu())} */}
                </View>
            </View>
            <View style={styles.dt_info_container}>
                <View style={styles.dt_name_container}>
                    <Text style={styles.dt_name}>{item?.user?.username ?? "--"}</Text>
                </View>
                <View style={[styles.dt_age, { gap: ms(10) }]}>
                    <TouchableOpacity style={styles.dt_button} onPress={() => { setShowDropdown(true), setDropdownType("info") }}>
                        <TvIcon {...IconProps(ms(17))} fill={Colors.dt_card_blue} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dt_button} onPress={() => Navigation.navigate("MessengerScreen")}>
                        <MessageIcon {...IconProps(ms(16))} fill={Colors.dt_card_blue} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.dt_bio_container}>
                <View style={styles.dt_intrest}>
                    <View style={styles.dt_age_container}>
                        {item?.user?.gender === "couple" ? (
                            <>
                                <View style={styles.dt_age}>
                                    <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                    <Text style={styles.dt_age_text}>{item?.user?.partner?.age}</Text>
                                </View>
                                <View style={styles.dt_age}>
                                    <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                    <Text style={styles.dt_age_text}>{item?.user?.age}</Text>
                                </View>
                            </>
                        ) : item?.user?.gender === "female" ? (
                            <View style={styles.dt_age}>
                                <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                <Text style={styles.dt_age_text}>{item?.user?.age}</Text>
                            </View>
                        ) : (
                            <View style={styles.dt_age}>
                                <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                <Text style={styles.dt_age_text}>{item?.user?.age}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.dt_button_container}>
                <View style={styles.dt_intrest_container}>
                    <Text style={styles.dt_intrest_text}>Interests</Text>
                    <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                        {item?.user?.interestedIn?.includes('couple') && (
                            <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                        )}
                        {item?.user?.interestedIn?.includes('male') && (
                            <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                        )}
                        {item?.user?.interestedIn?.includes('female') && (
                            <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                        )}
                    </View>
                </View>
                <View >
                    <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                    <View style={[styles.dt_age_container, styles.dt_location_container]}>
                        <Text style={styles.dt_location_text}>{item?.user?.location?.address?.fullAddress ?? "Not specified"}</Text>
                    </View>
                </View>
            </View>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Information"
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

export default VideoCard