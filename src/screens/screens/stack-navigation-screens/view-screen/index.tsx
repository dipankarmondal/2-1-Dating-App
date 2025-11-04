/**React Imports */
import { View } from 'react-native'
import React from 'react'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { MyProfileViews } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Main export*/
const ViewScreen: React.FC = () => {

    const { Token } = useAuth()

    const { data: UserViewData, isLoading, refetch } = useQuery({
        queryKey: ["user_view_data"],
        queryFn: () => MyProfileViews(Token),
    })

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Who I viewed"
            }}
        >
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={refetch}>
                <View style={CommonStyles.dt_container}>
                    {
                        isLoading ? <Loader /> :
                            UserViewData?.data?.length > 0 ? (
                                UserViewData?.data?.map((item: any, index: number) => {
                                    return (
                                        <UserInfoCard
                                            key={index}
                                            {...{
                                                type: "user",
                                                isMore: true,
                                                isFilterOption: true,
                                                isGallery: item?.viewedUserId?.profile?.photos?.length > 0 ? true : false,
                                                profileImages: item?.viewedUserId?.profile?.photos,
                                                UserName: item?.viewedUserId?.username,
                                                userId: item?.viewedUserId?._id
                                            }}
                                        >
                                            <InfoCardLayoutOne
                                                {...{
                                                    item
                                                }}
                                            />
                                        </UserInfoCard>
                                    )
                                })
                            ) : (
                                <NotFound
                                    {...{
                                        title: "Looks like no one has checked you out yet. Keep engaging and exploring — your first viewer might be just around!",
                                        photo: require("@images/notFound/profile_view.png")
                                    }}
                                />
                            )
                    }
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default ViewScreen