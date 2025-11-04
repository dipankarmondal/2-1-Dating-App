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

/** Liabary*/
import { useQuery } from '@tanstack/react-query'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Main export*/
const BlockListScreen: React.FC = () => {

    const { Token } = useAuth();

    const { data: UsersInteractionsData, isLoading, refetch } = useQuery({
        queryKey: ["user_blocks_data"],
        queryFn: () => UsersInteractions(Token, "blocks"),
    })

    return (
        <ScreenLayout type="stack" title="Blocklist">
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch}
            >
                <View style={CommonStyles.dt_container}>
                    {isLoading ? <Loader /> : (
                        UsersInteractionsData?.data?.blocks?.length > 0 ?
                            UsersInteractionsData?.data?.blocks?.map((item: any, index: number) => {
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
                                            }}
                                        />
                                    </UserInfoCard>
                                )
                            }) : (
                                <NotFound
                                    {...{
                                        title: "No blocked users found. Looks like your block list is clear — you haven’t blocked any friends yet.",
                                        photo: require("@images/notFound/block_not.png"),
                                    }}
                                />
                            )
                    )
                    }
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default BlockListScreen