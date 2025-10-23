import { MoreVideoContentStyles as styles } from './styles'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PlayIcon from '@svgs/play.svg'
import { Colors } from '../../../../utils/constant/Constant'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'

type Props = {
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    moreVideoData: [];
    setSource: any
}

const MoreVideoContent: React.FC<Props> = ({ setShowDropdown, moreVideoData,setSource }) => {

    const handlePlayVideo = (link: any, id: any) => {
        setSource({ link: link, id: id })
        setShowDropdown(false)
    }

    return (
        <View style={styles.dt_container}>
            {
                moreVideoData?.map((item: any, index: number) => {
                    return (
                        <TouchableOpacity key={index} style={styles.dt_video_container} onPress={() => handlePlayVideo(item?.url, item?.userId)}>
                            <View style={styles.dt_image_container}>
                                <Image source={item?.thumbnailUrl ? { uri: item?.thumbnailUrl } : require('@images/play.png')} style={styles.dt_image} />
                                <View style={styles.dt_overlay}>
                                    <PlayIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.dt_video_text}>{item?.source}</Text>
                                <Text style={styles.dt_views_text}>{item?.sourceData?.viewCount} Views</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default MoreVideoContent