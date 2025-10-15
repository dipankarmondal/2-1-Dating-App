/**React Imports */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { AlbumContentStyles as styles } from './styles'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms } from '../../../utils/helpers/responsive'
import { Colors } from '../../../utils/constant/Constant'

/**Components */
import ModalAction from '../../modal/modal-action/ModalAction'
import ModalContent from '../../modal/modal-content/logout-content/ModalContent'
import CreateAlbumContent from '../../modal/modal-content/create-album-content/CreateAlbumContent'

/** Icon*/
import DeleteIcon from '@svgs/delete.svg'
import LockIcon from '@svgs/lock.svg'
import LockOpenIcon from '@svgs/lock-open.svg'
import CameraIcon from '@svgs/camera.svg'
import PlayIcon from '@svgs/play.svg'
import { useForm } from 'react-hook-form'
import CustomInput from '../../form-utils/custom-input'
import SubmitButton from '../../submit-button'
import { OpenAlbumBuilder } from '../../../utils/builders'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { GetAllAlbums } from '../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'

type Props = {
    userId: string
}

/**Main export*/
const AlbumContent: React.FC<Props> = ({ userId }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const { Token } = useAuth()

    const { control, handleSubmit, setValue } = useForm()
    const Id = userId === "68b986f2def0361d51fc6ea8"
    const Navigation = useNavigation<any>()

    const HandlePassword = (title: string) => {
        if (Id) {
            Navigation.navigate("AlbumShowScreen", { title })
        } else {
            setShowPasswordModal(true)
        }
    }

    const { data } = useQuery({
        queryKey: ["albums"],
        queryFn: () => GetAllAlbums(Token),
        enabled: !!userId
    });

    console.log("object", data?.data?.albums)

    const HandlePasswordSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <View style={styles.dt_container}>
            <TouchableOpacity style={styles.dt_btn_container} onPress={() => setShowCreateModal(true)}>
                <Text style={styles.dt_text}>Create album</Text>
            </TouchableOpacity>
            <View style={styles.dt_album_wrapper}>
                {
                    data?.data?.albums?.map((item: any, index: number) => {
                        return (
                            <View key={index}>
                                <Text style={styles.dt_album_name}>{item?.name}</Text>
                                <TouchableOpacity style={styles.dt_album_container} activeOpacity={0.8} onPress={() => HandlePassword("Album 1")}>
                                    <Image source={require('@images/dummy.png')} style={styles.dt_image} />
                                    <View style={styles.dt_overlay}>
                                        <View style={styles.dt_icon_container} >
                                            {
                                                item?.isPrivate ?
                                                    <LockIcon {...IconProps(ms(16))} fill={Colors.dt_error} />
                                                    :
                                                    <LockOpenIcon {...IconProps(ms(16))} fill={Colors.dt_success_green} />
                                            }
                                        </View>
                                        <View style={styles.dt_count_container}>
                                            <View style={styles.dt_info_container}>
                                                <CameraIcon {...IconProps(ms(12))} fill={Colors.dt_white} />
                                                <Text style={styles.dt_count_text}>{item?.mediaStats?.totalPhotos ?? 0}</Text>
                                            </View>
                                            <View style={styles.dt_info_container}>
                                                <PlayIcon {...IconProps(ms(12))} fill={Colors.dt_white} />
                                                <Text style={styles.dt_count_text}>{item?.mediaStats?.totalVideos ?? 0}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.dt_delete_container} onPress={() => setShowDeleteModal(true)}>
                                            <DeleteIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
            <ModalAction
                isModalVisible={showCreateModal}
                setModalVisible={setShowCreateModal}
                headerText="Create album"
            >
                <CreateAlbumContent
                    {...{
                        setShowCreateModal
                    }}
                />
            </ModalAction>
            <ModalAction
                isModalVisible={showPasswordModal}
                setModalVisible={setShowPasswordModal}
                headerText="Enter password"
            >
                <View style={{ marginBottom: ms(20) }}>
                    {OpenAlbumBuilder(control).map((item, index) => {
                        if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                            return <CustomInput key={index} {...item} />;
                        } else {
                            return null;
                        }
                    })}
                    <SubmitButton
                        {...{
                            text: "Submit",
                            loading: false,
                            onPress: handleSubmit(HandlePasswordSubmit)
                        }}
                    />
                </View>
            </ModalAction>
            <ModalAction
                isModalVisible={showDeleteModal}
                setModalVisible={setShowDeleteModal}
                headerText="Delete album"
            >
                <ModalContent
                    {...{
                        setModal: setShowDeleteModal,
                        title: `Do you want to delete this album?`,
                        successText: "Yes, Delete",
                        cancelText: "No, Keep it",
                        onSuccess: () => {
                            setShowDeleteModal(false);
                        }
                    }}
                />
            </ModalAction>
        </View>
    )
}

export default AlbumContent