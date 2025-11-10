/**React Imports */
import { View, Text, TouchableOpacity, Button } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { VideoOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'

/** Liabary*/
import { useIsFocused, useNavigation } from '@react-navigation/native'
import VideoCard from '../../../../components/videos-cards/VideoCard'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import VideoModal from '../../../../components/modal/video-modal/VideoModal'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { GetGlobalVideos } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Main export*/
const VideoScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = React.useState(false)
    const [selected, setSelected] = useState<string>("");
    const [visible, setVisible] = useState(false);
    const [source, setSource] = useState({ link: "", id: "" });

    const Navigation = useNavigation<any>()
    const isFocused = useIsFocused();
    const { Token } = useAuth()

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
    };

    const {
        data: userPhotoLiabary,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["userPhotoLiabary"],
        queryFn: ({ pageParam = 1 }) =>
            GetGlobalVideos(Token, "all", "all", "all", pageParam, 10),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.data?.pagination;
            if (pagination?.hasNextPage) {
                return pagination.currentPage + 1;
            }
            return undefined;
        },
        enabled: !!Token,
    });

    const handleScroll = useCallback(
        ({ nativeEvent }: any) => {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const isCloseToBottom =
                layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
            if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [hasNextPage, isFetchingNextPage]
    );

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Videos</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("AddVideoScreen") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>Add Videos</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch} // just pass refetch here
                onScroll={handleScroll}
            >
                <View style={CommonStyles.dt_container}>
                    {isLoading ? (
                        <Loader />
                    ) : userPhotoLiabary?.pages?.[0]?.data?.videos?.length > 0 ? (
                        <>
                            {userPhotoLiabary?.pages?.map((page, pageIndex) =>
                                page?.data?.videos?.map((item: any, index: number) => {
                                    return (
                                        <VideoCard
                                            key={`${pageIndex}-${index}`}
                                            {...{
                                                setVisible,
                                                item,
                                                setSource
                                            }}
                                        />
                                    )
                                })
                            )}

                            {isFetchingNextPage &&
                                <View style={{ marginVertical: 16 }}>
                                    <Loader />
                                </View>
                            }
                        </>
                    ) : (
                        <NotFound
                            {...{
                                title: "Nothing to watch right now. New videos will appear here soon.",
                                photo: require("@images/notFound/video.png"),
                            }}
                        />
                    )}
                </View>
            </ScrollContent>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Filters"
                type="filters"
                onModalClick={OnModalFormClick}
                selected={selected}
                setSelected={setSelected}
            >
                <ModalSelectContent
                    {...{
                        filterData: VideoOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
            </ModalAction>
            <VideoModal
                {...{
                    setVisible: setVisible,
                    visible: visible,
                    source: source,
                    setSource: setSource
                }}
            />
        </ScreenLayout>
    )
}

export default VideoScreen 