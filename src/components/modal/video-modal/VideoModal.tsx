/**React Imports */
import { View, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
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
import { useQuery } from '@tanstack/react-query';
import { GetMediaLibrary } from '../../../utils/api-calls/content-api-calls/ContentApiCall';
import { useAuth } from '../../../utils/context/auth-context/AuthContext';

/**Main export*/
const VideoModal: React.FC<VideoModalProps> = ({ visible, setVisible, source,setSource,type }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const { Token } = useAuth()

    const { data: AllVideo } = useQuery({
        queryKey: ["all_video", source?.id],
        queryFn: () => GetMediaLibrary(Token, source?.id, "video", null, null, null),
        enabled: !!Token && !!source?.id
    })

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)} // for Android back button
        >
            <View style={styles.modalBackground}>
                {
                    type !== "message" &&
                    <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                        <MoreIcon {...IconProps(ms(18))} fill={Colors.dt_border} />
                    </TouchableOpacity>
                }

                <View style={styles.videoContainer}>
                    {/* Loader */}
                    {loading && (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color={Colors.dt_white} />
                        </View>
                    )}

                    <Video
                        source={{ uri: source?.link ?? source }}
                        style={styles.video}
                        resizeMode="contain"
                        controls={true}
                        paused={showDropdown}
                        onError={(e) => console.log('Video error:', e)}
                        onEnd={() => setVisible(false)}
                        onLoadStart={() => setLoading(true)} // start loading
                        onLoad={() => setLoading(false)} // stop when loaded
                        onBuffer={({ isBuffering }) => setLoading(isBuffering)} // handle buffering
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
                    setShowDropdown={setShowDropdown}
                    moreVideoData={AllVideo?.data?.media}
                    setSource={setSource}
                />
            </ModalAction>
        </Modal>
    );
};

export default VideoModal;