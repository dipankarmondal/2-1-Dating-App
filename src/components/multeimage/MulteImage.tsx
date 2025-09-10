import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MulteImageStyles as styles } from './styles'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import DotIcon from '@svgs/dots-vertical.svg'
import LeftIcon from '@svgs/angle-small-left.svg'
import RightIcon from '@svgs/angle-small-right.svg'
import MessengerIcon from '@svgs/messenger.svg'
import LikeIcon from '@svgs/like.svg'
import InviteFrindIcon from '@svgs/setting/invite.svg'
import BellIcon from '@svgs/bell.svg'
import { useIsFocused } from '@react-navigation/native'
import { MenuItems, MulteImageProps } from '../../utils/types/types'


// ✅ Reusable MenuItem component
const MenuItem: React.FC<MenuItems> = ({ Icon, label, onPress, iconStyle }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={iconStyle}>
            <Icon {...IconProps(ms(15))} fill={Colors.dt_white} />
        </View>
        <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
);

const MulteImage: React.FC<MulteImageProps> = ({ currentIndex, setCurrentIndex, image, isOption }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [subMenuVisible, setSubMenuVisible] = useState(false);

    const isFocused = useIsFocused();

    // 🔹 Reset menus
    const resetMenus = () => {
        setMenuVisible(false);
        setSubMenuVisible(false);
    };

    useEffect(() => resetMenus(), [currentIndex]);
    useEffect(() => {
        if (!isFocused) resetMenus();
    }, [isFocused]);

    const handlePrev = () =>
        currentIndex > 0 && setCurrentIndex((prev) => prev - 1);

    const handleNext = () =>
        currentIndex < image.length - 1 &&
        setCurrentIndex((prev) => prev + 1);

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
        setSubMenuVisible(false);
    };

    // 🔹 Menu data
    const mainMenuItems = [
        { key: "messenger", label: "Messenger", Icon: MessengerIcon },
        { key: "like", label: "Like", Icon: LikeIcon, onPress: () => setSubMenuVisible(true) },
        { key: "friend", label: "Friend request", Icon: InviteFrindIcon },
        { key: "remember", label: "Remember", Icon: BellIcon },
    ];

    const subMenuItems = [
        { key: "like", label: "Like", Icon: LikeIcon, onPress: () => { } },
        { key: "not_interested", label: "Not Interested", Icon: LikeIcon, iconStyle: { transform: [{ rotate: "180deg" }] }, onPress: () => { } },
    ];

     const filteredMenuItems = isOption
        ? mainMenuItems.filter(item => item.key !== "like" && item.key !== "remember")
        : mainMenuItems;

    const renderMenu = () => (
        <View style={styles.menuContainer}>
            {filteredMenuItems.map(({ key, Icon, label, onPress }) => (
                <MenuItem key={key} Icon={Icon} label={label} onPress={onPress} />
            ))}
        </View>
    );

    const renderSubMenu = () => (
        <View style={styles.menuContainer}>
            {subMenuItems.map(({ key, Icon, label, onPress, iconStyle }) => (
                <MenuItem key={key} Icon={Icon} label={label} onPress={onPress} iconStyle={iconStyle} />
            ))}
        </View>
    );

    return (
        <View style={styles.dt_image_overlay}>
            {/* Dot menu button */}
            {
                isOption &&
                <TouchableOpacity
                    style={[styles.dt_more_container, { alignSelf: "flex-end" }]}
                    onPress={toggleMenu}
                >
                    <DotIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                </TouchableOpacity>
            }

            {/* Menus */}
            {menuVisible && (subMenuVisible ? renderSubMenu() : renderMenu())}

            {/* Navigation Arrows */}
            <View style={styles.dt_icon_container}>
                <TouchableOpacity
                    style={[
                        styles.dt_more_container,
                        { marginTop: ms(-5), opacity: currentIndex === 0 ? 0.4 : 1 },
                    ]}
                    disabled={currentIndex === 0}
                    onPress={handlePrev}
                >
                    <LeftIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.dt_more_container,
                        { marginTop: ms(-5), opacity: currentIndex === image.length - 1 ? 0.4 : 1 },
                    ]}
                    disabled={currentIndex === image.length - 1}
                    onPress={handleNext}
                >
                    <RightIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MulteImage;
