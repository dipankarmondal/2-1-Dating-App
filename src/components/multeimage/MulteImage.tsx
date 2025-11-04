/**React Imports */
import { View, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { MulteImageStyles as styles } from './styles'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import { MulteImageProps } from '../../utils/types/types'

/**Components */
import MenuBox from '../menu-box/MenuBox'

/**Icons*/
import GalleryIcon from '@svgs/gallery.svg'
import LeftIcon from '@svgs/angle-small-left.svg'
import RightIcon from '@svgs/angle-small-right.svg'
import LikeIcon from '@svgs/like.svg'
import DislikeIcon from '@svgs/dislike.svg'
import InviteFrindIcon from '@svgs/setting/invite.svg'
import BellIcon from '@svgs/bell.svg'
import PlayIcon from '@svgs/play.svg'

/**Main export*/
const MulteImage: React.FC<MulteImageProps> = (
    { currentIndex, setCurrentIndex, image, isOption, type, isFilterOption, isGallery, setVisible, onSendFriendRequest }
) => {

    const handlePrev = () =>
        currentIndex > 0 && setCurrentIndex((prev) => prev - 1);

    const handleNext = () =>
        currentIndex < image.length - 1 &&
        setCurrentIndex((prev) => prev + 1);

    // 🔹 Menu data
    const mainMenuItems = [
        { key: "like", label: "Like", Icon: LikeIcon },
        { key: "dislike", label: "Not intrested", Icon: DislikeIcon },
        { key: "friend", label: "Friend request", Icon: InviteFrindIcon, onPress: onSendFriendRequest },
        { key: "remember", label: "Remember", Icon: BellIcon },
    ];

    return (
        <View style={styles.dt_image_overlay}>
            {/* Dot menu button */}
            <View style={styles.dt_btn_container}>
                {
                    isGallery &&
                    <TouchableOpacity
                        style={[styles.dt_more_container, { alignSelf: "flex-end" }]}
                        onPress={() => setVisible(true)}
                    >
                        <GalleryIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                    </TouchableOpacity>
                }
                {
                    isOption && (
                        <MenuBox
                            {...{
                                MenuData: mainMenuItems
                            }}
                        />
                    )
                }
            </View>
            {
                type == "livestream" ? (
                    <View style={styles.dt_livestream_play}>
                        <TouchableOpacity style={styles.dt_livestream_play_icon} activeOpacity={0.7}>
                            <PlayIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View style={styles.dt_icon_container}>
                            <TouchableOpacity
                                style={[
                                    styles.dt_more_container,
                                    {
                                        marginTop: ms(-5),
                                        opacity: image.length === 0 || currentIndex === 0 ? 0.4 : 1,
                                    },
                                ]}
                                disabled={image.length === 0 || currentIndex === 0}
                                onPress={handlePrev}
                            >
                                <LeftIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                            </TouchableOpacity>

                            {/* Right Button */}
                            <TouchableOpacity
                                style={[
                                    styles.dt_more_container,
                                    {
                                        marginTop: ms(-5),
                                        opacity: image.length === 0 || currentIndex === image.length - 1 ? 0.4 : 1,
                                    },
                                ]}
                                disabled={image.length === 0 || currentIndex === image.length - 1}
                                onPress={handleNext}
                            >
                                <RightIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }
        </View>
    );
};

export default MulteImage;
