/**React Imports */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { VideoContentStyles as styles } from './styles'
import { Colors } from '../../../utils/constant/Constant'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms, toast } from '../../../utils/helpers/responsive'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DeleteSingleFile, GetMediaLibrary } from '../../../utils/api-calls/content-api-calls/ContentApiCall'

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
    const [selectLink, setSelectLink] = useState({ url: null, key: null });
    const { Token, user } = useAuth()
    const QueryInvalidater = useQueryClient();

    const Navigation = useNavigation<any>()

    const { data: userVideoLiabary } = useQuery({
        queryKey: ["userPhotoLiabary", user?.id],
        queryFn: () => GetMediaLibrary(Token, user?.id, "video", null, 20),
        enabled: !!Token
    })

    const DeleteVideoMutation = useMutation({
        mutationFn: (data: any) => DeleteSingleFile(Token, data),
        onSuccess: (res) => {
            console.log("object", res)
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['userPhotoLiabary', user?.id] });
            }
        }
    })

    const handleplay = (link: any) => {
        setVisible(true)
        setSelectLink({ url: link.url, key: null })
    }

    const handleDeleteModalOpen = (id: any) => {
        setSelectLink({ url: null, key: id })
        setShowDeleteModal(true)
    }

    const handleDelete = () => {
        const payload = {
            key: selectLink?.key,
            hard: false
        }
        DeleteVideoMutation.mutate(payload)
        setShowDeleteModal(false)
    }

    return (
        <View style={styles.dt_container}>
            <TouchableOpacity style={styles.dt_btn_container} onPress={() => Navigation.navigate("AddVideoScreen")} >
                <Text style={styles.dt_text}>Add video</Text>
            </TouchableOpacity>
            <View style={styles.dt_video_wrapper}>
                {
                    userVideoLiabary?.data?.media?.map((item: any, index: number) => {
                        return (
                            <View key={index} style={styles.dt_video_container}>
                                <Image source={item?.thumbnailUrl ? { uri: item?.thumbnailUrl } : require('@images/dummy.png')} style={styles.dt_image} />
                                <View style={styles.dt_overlay} >
                                    <View style={styles.dt_info_container}>
                                        <View style={styles.dt_view_wrapper}>
                                            <EyeIcon {...IconProps(ms(12))} fill={Colors.dt_white} />
                                            <Text style={styles.dt_view_text}>{item?.sourceData?.viewCount ?? 0}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.dt_delete_wrapper} onPress={() => handleDeleteModalOpen(item?.key)}>
                                            <DeleteIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.dt_play_icon} onPress={() => handleplay(item?.url)}>
                                        <PlayVideo {...IconProps(ms(18))} fill={Colors.dt_border} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
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
                        onSuccess: handleDelete
                    }}
                />
            </ModalAction>
            <VideoModal
                {...{
                    setVisible: setVisible,
                    visible: visible,
                    source: selectLink?.url
                }}
            />
        </View>
    )
}

export default VideoContent
