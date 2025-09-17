import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { OnlineNowScreenStyles as styles } from './styles'
import ScreenLayout from '../../common/ScreenLayout'
import { CommonStyles } from '../../common/CommonStyle'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { SearchUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import NotFound from '../../../../components/notfound/NotFound'
import Loader from '../../../../components/loader/Loader'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'

const OnlineNowScreen: React.FC = () => {
    const { Token } = useAuth()

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["searchUser"],
        queryFn: () => SearchUser(Token, null, null, true),
        staleTime: 0,
    });

    return (
        <ScreenLayout>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    {isLoading ? (
                        <Loader />
                    ) : data?.data?.length > 0 ? (
                        data.data.map((item: any, index: number) => (
                            <UserInfoCard
                                key={index}
                                {...{
                                    isMore: true,
                                    item,
                                }}
                            />
                        ))
                    ) : (
                        <NotFound />
                    )}
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default OnlineNowScreen 