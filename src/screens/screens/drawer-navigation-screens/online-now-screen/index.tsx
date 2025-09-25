import { View, Text, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, TextInput } from 'react-native'
import React, { use, useState } from 'react'
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
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { Colors } from '../../../../utils/constant/Constant'
import { useIsFocused } from '@react-navigation/native'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import { OnlineOptions } from '../../../../components/common/helper'

const OnlineNowScreen: React.FC = () => {
    const { Token } = useAuth()
    const isFocused = useIsFocused();

    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["searchUser"],
        queryFn: () => SearchUser(Token, null, null, true),
        enabled: isFocused && !!Token
    });

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Online Now</Text>
                <TouchableOpacity style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]} onPress={() => { setShowDropdown((prev) => !prev); }}>
                    <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                </TouchableOpacity>
            </ScreenHeader>
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
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Filters"
                type="filters"
            >
                <ModalSelectContent
                    {...{
                        filterData: OnlineOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
                <TextInput
                    placeholder="Search by country"
                    style={styles.dt_searchInput}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default OnlineNowScreen

// 7439423955