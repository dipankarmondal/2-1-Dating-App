import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { CommonStyles } from '../../common/CommonStyle'
import { Colors, Fonts } from '../../../../utils/constant/Constant'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import { TravelOptions } from '../../../../components/common/helper'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { GetMyCertifications } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'
import { ms } from 'react-native-size-matters'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import SearchBox from '../../../../components/search-box/SearchBox'

const CertificationsScreen: React.FC = () => {

    const [search, setSearch] = useState<string>("");

    const { Token } = useAuth()

    const Navigation = useNavigation<any>();
    const isFocused = useIsFocused();

    const { data, refetch, isLoading } = useQuery({
        queryKey: ["certifications_data",search],
        queryFn: () => GetMyCertifications(Token,search),
        enabled: isFocused && !!Token
    });

    const Refresh = () =>{
        refetch()
    }

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Certification</Text>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={Refresh} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    <SearchBox
                        {...{
                            search,
                            setSearch
                        }}
                    />
                    {isLoading ? <Loader /> :
                        data?.data?.length > 0 ? (
                            data?.data?.map((item: any, index: number) => {
                                return (
                                    <UserInfoCard
                                        key={index}
                                        {...{
                                            type: "user",
                                            isMore: true,
                                            isFilterOption: true,
                                            isGallery: item?.certifierId?.profile?.photos?.length > 0 ? true : false,
                                            profileImages: item?.certifierId?.profile?.photos,
                                            UserName: item?.certifierId?.username,
                                            userId: item?.certifierId?._id,
                                        }}
                                    >

                                        <View>
                                            <Text style={styles.dt_header_title}>Description</Text>
                                            <Text style={styles.dt_header_text}>{item?.message}</Text>
                                        </View>
                                    </UserInfoCard>
                                )
                            })
                        ) : (
                            <NotFound
                                {...{
                                    title: "No certifications found at the moment. Give one to appreciate this user’s efforts!",
                                    photo: require("@images/notFound/certification-not.png")
                                }}
                            />
                        )}
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default CertificationsScreen

const styles = StyleSheet.create({
    dt_header_title: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_header_text: {
        fontSize: ms(13),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    }
})
