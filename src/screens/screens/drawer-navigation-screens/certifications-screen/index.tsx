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

const CertificationsScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");

    const { Token } = useAuth()

    const Navigation = useNavigation<any>();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ["certifications_data"],
        queryFn: () => GetMyCertifications(Token),
        enabled: isFocused && !!Token
    });

    const OnModalFormClick = () => {
        setShowDropdown(false);
    };
    
    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Certification</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]} onPress={() => { setShowDropdown((prev) => !prev); }}>
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={() => { }} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
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
                                        title: "No Certifications Found",
                                        photo: require("@images/notFound/certification-not.png")
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
                        filterData: TravelOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
            </ModalAction>
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
