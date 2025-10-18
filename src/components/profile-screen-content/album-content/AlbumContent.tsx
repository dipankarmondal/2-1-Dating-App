/**React Imports */
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { AlbumContentStyles as styles } from './styles'
import { IconProps } from '../../../utils/helpers/Iconprops'
import { ms, toast } from '../../../utils/helpers/responsive'
import { Colors } from '../../../utils/constant/Constant'
import { DeleteAlbum, GetAllAlbums } from '../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'

/**Components */
import ModalAction from '../../modal/modal-action/ModalAction'
import ModalContent from '../../modal/modal-content/logout-content/ModalContent'
import Loader from '../../loader/Loader'
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
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NotFound from '../../notfound/NotFound'

type Props = {
    userId: string
}

/**Main export*/
const AlbumContent: React.FC<Props> = ({ userId }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [deteleId, setDeleteId] = useState(null);

    const { Token } = useAuth()
    const QueryInvalidater = useQueryClient();

    const { control, handleSubmit, setValue } = useForm()
    const Id = userId === "68b986f2def0361d51fc6ea8"
    const Navigation = useNavigation<any>()

    const HandlePassword = (albumId: string) => {
        if (Id) {
            Navigation.navigate("AlbumShowScreen", {albumId })
        } else {
            setShowPasswordModal(true)
        }
    }

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['albums'],
        queryFn: ({ pageParam = 1 }) => GetAllAlbums(Token, 3, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const current = lastPage?.data?.pagination?.page ?? 1;
            const total = lastPage?.data?.pagination?.pages ?? 1;
            return current < total ? current + 1 : undefined;
        },
        enabled: !!userId,
    });


    const HandlePasswordSubmit = (data: any) => {
        console.log(data)
    }

    const HandleDeleteModal = (id: any) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const AlbumDeteteMutation = useMutation({
        mutationFn: (id: any) => DeleteAlbum(Token, deteleId),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['albums'] });
            }
        }
    })

    const HandleDelete = () => {
        AlbumDeteteMutation.mutate(deteleId)
        setShowDeleteModal(false)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            onScroll={({ nativeEvent }) => {
                const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                const isCloseToBottom =
                    layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
                if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            scrollEventThrottle={400}
        >
            <View style={styles.dt_container}>
                <TouchableOpacity style={styles.dt_btn_container} onPress={() => setShowCreateModal(true)}>
                    <Text style={styles.dt_text}>Create album</Text>
                </TouchableOpacity>
                <View style={styles.dt_album_wrapper}>
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                            (() => {
                                const albums = data?.pages?.flatMap((page) => page?.data?.albums || []);
                                if (!albums || albums.length === 0) {
                                    return (
                                        <NotFound
                                            {...{
                                                title: "No albums available. It looks like your library has no media. Please create or upload albums.",
                                                photo: require('@images/notFound/album_not.png')
                                            }}
                                        />
                                    );
                                }
                                return albums.map((item: any, index: number) => {
                                    return (
                                        <View key={index}>
                                            <Text style={styles.dt_album_name}>{item?.name}</Text>
                                            <TouchableOpacity
                                                style={styles.dt_album_container}
                                                activeOpacity={0.8}
                                                onPress={() => HandlePassword( item?._id)}
                                            >
                                                <Image
                                                    source={item?.coverImage ? { uri: item?.coverImage } : require('@images/dummy.png')}
                                                    style={styles.dt_image}
                                                />
                                                <View style={styles.dt_overlay}>
                                                    <View style={styles.dt_icon_container}>
                                                        {item?.isPrivate ? (
                                                            <LockIcon {...IconProps(ms(16))} fill={Colors.dt_error} />
                                                        ) : (
                                                            <LockOpenIcon {...IconProps(ms(16))} fill={Colors.dt_success_green} />
                                                        )}
                                                    </View>
                                                    <View style={styles.dt_count_container}>
                                                        <View style={styles.dt_info_container}>
                                                            <CameraIcon {...IconProps(ms(12))} fill={Colors.dt_white} />
                                                            <Text style={styles.dt_count_text}>
                                                                {item?.mediaStats?.totalPhotos ?? 0}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.dt_info_container}>
                                                            <PlayIcon {...IconProps(ms(12))} fill={Colors.dt_white} />
                                                            <Text style={styles.dt_count_text}>
                                                                {item?.mediaStats?.totalVideos ?? 0}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity
                                                        style={styles.dt_delete_container}
                                                        onPress={() => HandleDeleteModal(item?._id)}
                                                    >
                                                        <DeleteIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                });
                            })()
                        )
                    }
                    {isFetchingNextPage && (
                        <View style={{ marginVertical: 16 }}>
                            <Loader />
                        </View>
                    )}
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
                            onSuccess: HandleDelete
                        }}
                    />
                </ModalAction>
            </View>
        </ScrollView>
    )
}

export default AlbumContent