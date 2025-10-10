/**React Imports */
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { AlbumShowScreenStyles as styles } from './style'
import { AddAlbumBuilder, EditAlbumTitleBuilder } from '../../../../utils/builders'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors } from '../../../../utils/constant/Constant'
import { IconProps } from '../../../../utils/helpers/Iconprops'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import FilePickerInput from '../../../../components/form-utils/file-picker-input/FilePickerInput'
import SubmitButton from '../../../../components/submit-button'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'
import GalleryModal from '../../../../components/modal/gallery-modal/GalleryModal'
import VideoModal from '../../../../components/modal/video-modal/VideoModal'

/** Liabary*/
import { useForm } from 'react-hook-form'

/**Icons*/
import DeleteIcon from '@svgs/delete.svg'
import PlayVideo from "@svgs/play.svg"
import CustomInput from '../../../../components/form-utils/custom-input'

type Props = {
    route: any
}

const AlbumShowScreen: React.FC<Props> = ({ route }) => {
    const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [visible, setVisible] = useState(false);

    const { control, handleSubmit } = useForm()
    const { title } = route.params || {}

    const OnSubmit = (data: any) => {
        console.log("object", data)
    }

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: title
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    <View style={styles.dt_btn_wrapper}>
                        <TouchableOpacity style={styles.dt_btn_container} onPress={() => setShowEditModal(true)}>
                            <Text style={styles.dt_text}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dt_btn_container} onPress={() => setShowAddAlbumModal(true)}>
                            <Text style={styles.dt_text}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dt_album_wrapper}>
                        <TouchableOpacity style={styles.dt_album_container} onPress={() => setShowGalleryModal(true)} >
                            <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                            <View style={styles.dt_overlay}>
                                <TouchableOpacity style={styles.dt_delete_container} onPress={() => setShowDeleteModal(true)}>
                                    <DeleteIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.dt_album_container} >
                            <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                            <View style={[styles.dt_overlay, { alignItems: 'center', justifyContent: 'center' }]}>
                                <TouchableOpacity style={styles.dt_play_icon} onPress={() => setVisible(true)}>
                                    <PlayVideo {...IconProps(ms(18))} fill={Colors.dt_border} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dt_overlay}>
                                <TouchableOpacity style={styles.dt_delete_container} onPress={() => setShowDeleteModal(true)}>
                                    <DeleteIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showAddAlbumModal}
                setModalVisible={setShowAddAlbumModal}
                headerText="Add photos and videos"
            >
                <View>
                    {AddAlbumBuilder(control).map((item, index) => {
                        if (item.type === 'photo') {
                            return <FilePickerInput key={index} {...item} />;
                        } else {
                            return null;
                        }
                    })}
                    <View style={{ marginTop: ms(5) }}>
                        <SubmitButton
                            {...{
                                text: "Submit",
                                loading: false,
                                onPress: handleSubmit(OnSubmit),
                            }}
                        />
                    </View>
                </View>
            </ModalAction>
            <ModalAction
                isModalVisible={showEditModal}
                setModalVisible={setShowEditModal}
                headerText="Edit album title"
            >
                <View>
                    {EditAlbumTitleBuilder(control).map((item, index) => {
                        if (item.type === 'text') {
                            return <CustomInput key={index} {...item} />;
                        } else {
                            return null;
                        }
                    })}
                    <View style={{ marginVertical: ms(5) }}>
                        <SubmitButton
                            {...{
                                text: "Submit",
                                loading: false,
                                onPress: handleSubmit(OnSubmit),
                            }}
                        />
                    </View>
                </View>
            </ModalAction>
            <ModalAction
                isModalVisible={showDeleteModal}
                setModalVisible={setShowDeleteModal}
                headerText="Delete photo"
            >
                <ModalContent
                    {...{
                        setModal: setShowDeleteModal,
                        title: `Do you want to delete this photo?`,
                        successText: "Yes, Delete",
                        cancelText: "No, Keep it",
                        onSuccess: () => {
                            setShowDeleteModal(false);
                        }
                    }}
                />
            </ModalAction>
            <GalleryModal
                {...{
                    visible: showGalleryModal,
                    setVisible: setShowGalleryModal,
                    photos: null,
                    isSingle: true
                }}
            />
            <VideoModal
                {...{
                    setVisible: setVisible,
                    visible: visible,
                    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                }}
            />
        </ScreenLayout>
    )
}

export default AlbumShowScreen