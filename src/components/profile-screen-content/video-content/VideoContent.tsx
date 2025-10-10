/**React Imports */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { VideoContentStyles as styles } from './styles'
import { Colors } from '../../../utils/constant/Constant'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/responsive'

/**Components */
import ModalContent from '../../modal/modal-content/logout-content/ModalContent'
import VideoModal from '../../modal/video-modal/VideoModal'
import ModalAction from '../../modal/modal-action/ModalAction'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

/**Icons*/
import PlayVideo from "@svgs/play.svg"
import EyeIcon from "@svgs/eye.svg"
import DeleteIcon from "@svgs/delete.svg"

/**Main export*/
const VideoContent: React.FC = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [visible, setVisible] = useState(false);

    const Navigation = useNavigation<any>()
    return (
        <View style={styles.dt_container}>
            <TouchableOpacity style={styles.dt_btn_container} onPress={() => Navigation.navigate("AddVideoScreen")} >
                <Text style={styles.dt_text}>Add video</Text>
            </TouchableOpacity>
            <View style={styles.dt_video_wrapper}>
                <View style={styles.dt_video_container}>
                    <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                    <View style={styles.dt_overlay} >
                        <View style={styles.dt_info_container}>
                            <View style={styles.dt_view_wrapper}>
                                <EyeIcon {...IconProps(ms(12))} fill={Colors.dt_white} />
                                <Text style={styles.dt_view_text}>1.2k</Text>
                            </View>
                            <TouchableOpacity style={styles.dt_delete_wrapper} onPress={() => setShowDeleteModal(true)}>
                                <DeleteIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.dt_play_icon} onPress={() => setVisible(true)}>
                            <PlayVideo {...IconProps(ms(18))} fill={Colors.dt_border} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ModalAction
                isModalVisible={showDeleteModal}
                setModalVisible={setShowDeleteModal}
                headerText="Delete Video"
            >
                <ModalContent
                    {...{
                        setModal: setShowDeleteModal,
                        title: `Do you want to delete this video?`,
                        successText: "Yes, Delete",
                        cancelText: "No, Keep it",
                        onSuccess: () => {
                            setShowDeleteModal(false);
                        }
                    }}
                />
            </ModalAction>
            <VideoModal
                {...{
                    setVisible: setVisible,
                    visible: visible,
                    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                }}
            />
        </View>
    )
}

export default VideoContent
