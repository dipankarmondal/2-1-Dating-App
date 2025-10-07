import { MoreVideoContentStyles as styles } from './styles'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PlayIcon from '@svgs/play.svg'
import { Colors } from '../../../../utils/constant/Constant'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'

type Props = {
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreVideoContent: React.FC<Props> = ({setShowDropdown}) => {
    return (
        <View style={styles.dt_container}>
            <TouchableOpacity style={styles.dt_video_container } onPress={() => setShowDropdown(false)}>
                <View style={styles.dt_image_container}>
                    <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                    <View style={styles.dt_overlay}>
                        <PlayIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                    </View>
                </View>
                <View>
                    <Text style={styles.dt_video_text}>Lorem ipsum dolor sit amet.</Text>
                    <Text style={styles.dt_views_text}>5 views</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dt_video_container} onPress={() => setShowDropdown(false)}>
                <View style={styles.dt_image_container}>
                    <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                    <View style={styles.dt_overlay}>
                        <PlayIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                    </View>
                </View>
                <View>
                    <Text style={styles.dt_video_text}>Lorem ipsum dolor sit amet.</Text>
                    <Text style={styles.dt_views_text}>5 views</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MoreVideoContent