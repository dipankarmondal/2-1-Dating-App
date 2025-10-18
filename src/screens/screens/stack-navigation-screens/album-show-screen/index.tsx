/**React Imports */
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { AlbumShowScreenStyles as styles } from './style'
import { AddPhotoAlbumBuilder, AddVideoAlbumBuilder, EditAlbumTitleBuilder } from '../../../../utils/builders'
import { ms, toast } from '../../../../utils/helpers/responsive'
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { EditAlbumMedia, GetAlbumById, RemoveMedia, UploadAlbum } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

type Props = {
    route: any
}

const AlbumShowScreen: React.FC<Props> = ({ route }) => {
    const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [source, setSource] = useState(null);
    const [mediaId, setMediaId] = useState(null);
    const [albumTitle, setAlbumTitle] = useState("");

    const { control: PhotoControl, handleSubmit: handlePhotoSubmit, reset: resetPhoto } = useForm()
    const { control: VideoControl, handleSubmit: handleVideoSubmit, reset: resetVideo } = useForm()
    const { control: EditControl, handleSubmit: handleEditSubmit } = useForm()

    const { albumId } = route.params || {}
    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();

    const { data: AlbumData, isLoading } = useQuery({
        queryKey: ["album", albumId],
        queryFn: () => GetAlbumById(Token, albumId),
        enabled: !!albumId
    })

    const PhotoUploadAlbumMutation = useMutation({
        mutationFn: (data: any) => UploadAlbum(Token, data, albumId),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                setShowAddAlbumModal(false)
                resetPhoto()
                QueryInvalidater.invalidateQueries({ queryKey: ["album", albumId] });
            }
        }
    })

    const OnPhotoSubmit = (data: any) => {
        const Formdata = new FormData();
        Formdata.append("files", {
            uri: data?.add_image[0].uri,
            type: data?.add_image[0].type,
            name: data?.add_image[0].fileName || "photo.jpg",
        });

        PhotoUploadAlbumMutation.mutate(Formdata);
    }

    const VideoUploadAlbumMutation = useMutation({
        mutationFn: (data: any) => UploadAlbum(Token, data, albumId),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                setShowAddAlbumModal(false)
                resetVideo()
                QueryInvalidater.invalidateQueries({ queryKey: ["album", albumId] });
            }
        }
    })

    const OnVideoSubmit = (data: any) => {
        const Formdata = new FormData();
        Formdata.append("files", {
            uri: data?.add_video[0].uri,
            type: data?.add_video[0].type,
            name: data?.add_video[0].fileName || "Video.mp4",
        });

        VideoUploadAlbumMutation.mutate(Formdata);
    }

    const OpenAlbum = (link: any, type: any) => {
        if (type === "image") {
            setShowGalleryModal(true)
            setSource([link])
        } else (
            setVisible(true),
            setSource(link)
        )
    }

    const DeleteAlbumContentMutation = useMutation({
        mutationFn: (mediaId: any) => RemoveMedia(Token, albumId, mediaId),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                setShowDeleteModal(false)
                QueryInvalidater.invalidateQueries({ queryKey: ["album", albumId] });
            }
        }
    })

    const OnDeleteSubmit = () => {
        DeleteAlbumContentMutation.mutate(mediaId)
    }

    const handleOpenDeleteModal = (DeteleId: any) => {
        setShowDeleteModal(true)
        setMediaId(DeteleId)
    }

    const FiledContent = [
        {
            builder: AddPhotoAlbumBuilder,
            control: PhotoControl,
            buttonText: "Add photo",
            loading: PhotoUploadAlbumMutation.isPending,
            onSubmit: handlePhotoSubmit(OnPhotoSubmit),
        },
        {
            builder: AddVideoAlbumBuilder,
            control: VideoControl,
            buttonText: "Add video",
            loading: VideoUploadAlbumMutation.isPending,
            onSubmit: handleVideoSubmit(OnVideoSubmit),
        },
    ]

    const EditAlbumMutation = useMutation({
        mutationFn: (data: any) => EditAlbumMedia(Token, albumId, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                setShowEditModal(false)
                QueryInvalidater.invalidateQueries({ queryKey: ["albums"] });
                QueryInvalidater.invalidateQueries({ queryKey: ["album", albumId] });
            }
        }
    })

    const EditAlbum = (data: any) => {
        const payload = {
            name: data?.title
        }
        EditAlbumMutation.mutate(payload)
    }

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: AlbumData?.data?.album?.name
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
                        {
                            isLoading ? (
                                <Loader />
                            ) : (
                                <>
                                    {AlbumData?.data?.album?.mediaItems?.length > 0 ? (
                                        AlbumData?.data?.album?.mediaItems?.map((item: any, index: number) => {
                                            const { mediaId } = item || {};
                                            const isImage = mediaId?.type === "image";
                                            const thumbnail = mediaId?.thumbnailUrl
                                                ? { uri: mediaId?.thumbnailUrl }
                                                : require('@images/dummy.png');

                                            const handleOpen = () => OpenAlbum(mediaId?.url, mediaId?.type);
                                            const handleDelete = () => handleOpenDeleteModal(mediaId?._id);

                                            return (
                                                <View key={index} style={styles.dt_album_container}>
                                                    <Image source={thumbnail} style={styles.dt_image} />

                                                    {/* Overlay for play icon (video only) */}
                                                    {!isImage && (
                                                        <View style={[styles.dt_overlay, styles.dt_center]}>
                                                            <TouchableOpacity style={styles.dt_play_icon} onPress={handleOpen}>
                                                                <PlayVideo {...IconProps(ms(18))} fill={Colors.dt_border} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}

                                                    {/* Common overlay for delete icon */}
                                                    <View style={styles.dt_overlay}>
                                                        <TouchableOpacity style={styles.dt_delete_container} onPress={handleDelete}>
                                                            <DeleteIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                                                        </TouchableOpacity>
                                                    </View>

                                                    {/* Touchable wrapper for image (clickable area) */}
                                                    {isImage && (
                                                        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleOpen} />
                                                    )}
                                                </View>
                                            );
                                        })
                                    ) : (
                                        <NotFound
                                            {...{
                                                title: "No media items found in this album. Please upload photos or videos to view them here",
                                                photo: require('@images/notFound/album_content_not.png')
                                            }}
                                        />
                                    )}
                                </>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showAddAlbumModal}
                setModalVisible={setShowAddAlbumModal}
                headerText="Add photos and videos"
            >
                {FiledContent.map((section, idx) => (
                    <View key={idx}>
                        {section.builder(section.control)
                            .filter(item => item.type === 'photo')
                            .map((item, index) => (
                                <FilePickerInput key={index} {...item} />
                            ))}

                        <View style={{ marginTop: ms(5), marginBottom: ms(15) }}>
                            <SubmitButton
                                text={section.buttonText}
                                loading={section.loading}
                                onPress={section.onSubmit}
                            />
                        </View>
                    </View>
                ))}
            </ModalAction>

            <ModalAction
                isModalVisible={showEditModal}
                setModalVisible={setShowEditModal}
                headerText="Edit album title"
            >
                <View>
                    {EditAlbumTitleBuilder(EditControl).map((item, index) => {
                        if (item.type === 'text') {
                            return <CustomInput key={index} {...item} />;
                        } else {
                            return null;
                        }
                    })}
                    <View style={{ marginVertical: ms(5) }}>
                        <SubmitButton
                            {...{
                                text: "Edit album",
                                loading: EditAlbumMutation.isPending,
                                onPress: handleEditSubmit(EditAlbum),
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
                        onSuccess: OnDeleteSubmit
                    }}
                />
            </ModalAction>
            <GalleryModal
                {...{
                    visible: showGalleryModal,
                    setVisible: setShowGalleryModal,
                    photos: source,
                    isSingle: true
                }}
            />
            <VideoModal
                {...{
                    setVisible: setVisible,
                    visible: visible,
                    source: source
                }}
            />
        </ScreenLayout>
    )
}

export default AlbumShowScreen