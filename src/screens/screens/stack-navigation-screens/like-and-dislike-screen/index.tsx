/**React Imports */
import { View } from 'react-native'
import React from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { UsersInteractions } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'

/**Main export*/
const LikeAndDislikeScreen: React.FC = () => {

    const { Token } = useAuth()

    const { data: UsersInteractionsData, isLoading, refetch } = useQuery({
        queryKey: ["user_like_data"],
        queryFn: () => UsersInteractions(Token, "my-likes"),
    })

    return (
        <ScreenLayout type="stack" title="Like/Dislike">
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={refetch}>
                <View style={CommonStyles.dt_container}>
                    {
                        isLoading ? <Loader /> :
                            UsersInteractionsData?.data?.length > 0 ? (
                                UsersInteractionsData?.data?.map((item: any, index: number) => {
                                    return (
                                        <UserInfoCard
                                            key={index}
                                            {...{
                                                type: "user",
                                                isMore: true,
                                                isFilterOption: true,
                                                isGallery: item?.targetUserId?.profile?.photos?.length > 0 ? true : false,
                                                profileImages: item?.targetUserId?.profile?.photos,
                                                UserName: item?.targetUserId?.username,
                                                userId: item?.targetUserId?._id
                                            }}
                                        >
                                            <InfoCardLayoutOne
                                                {...{
                                                    item,
                                                    type: "like_and_dislike"
                                                }}
                                            />
                                        </UserInfoCard>
                                    )
                                })
                            ) : (
                                <NotFound
                                    {...{
                                        title: "No data available right now. Try refreshing or adjusting your filters to see if something new appears. Please check again later.",
                                        photo: require("@images/notFound/like_not.png")
                                    }}
                                />
                            )
                    }
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default LikeAndDislikeScreen