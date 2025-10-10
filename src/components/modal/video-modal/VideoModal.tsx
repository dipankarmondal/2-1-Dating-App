/**React Imports */
import { View, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { IconProps } from '../../../utils/helpers/Iconprops';
import { ms } from '../../../utils/helpers/responsive';
import { Colors } from '../../../utils/constant/Constant';
import { VideoModalStyles as styles } from './styles'

/** Liabary*/
import Video from 'react-native-video';
import MoreIcon from '@svgs/layers.svg'

/**Components */
import ModalAction from '../modal-action/ModalAction';
import MoreVideoContent from '../modal-content/more-video-content/MoreVideoContent';
import { VideoModalProps } from '../../../utils/types/types';

/**Main export*/
const VideoModal: React.FC<VideoModalProps> = ({ visible, setVisible, source }) => {

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)} // for Android back button
        >
            <View style={styles.modalBackground}>
                <TouchableOpacity style={styles.overlay} onPress={() => setShowDropdown(true)}>
                    <MoreIcon {...IconProps(ms(18))} fill={Colors.dt_border} />
                </TouchableOpacity>

                <View style={styles.videoContainer}>
                    <Video
                        source={{ uri: source }}
                        style={styles.video}
                        resizeMode="contain"
                        controls={true} // ✅ built-in play/pause & seek controls
                        onError={(e) => console.log('Video error:', e)}
                        paused={showDropdown}
                        onEnd={() => setVisible(false)}
                    />
                </View>
            </View>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="More videos"
                type="logout"
            >
                <MoreVideoContent 
                {...{
                    setShowDropdown: setShowDropdown
                }}
                />
            </ModalAction>
        </Modal>
    )
}

export default VideoModal