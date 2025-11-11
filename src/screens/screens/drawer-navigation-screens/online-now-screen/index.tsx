/**React Imports */
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { OnlineNowScreenStyles as styles } from './styles'
import { CommonStyles } from '../../common/CommonStyle'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { SearchUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { Colors } from '../../../../utils/constant/Constant'
import { OnlineOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import NotFound from '../../../../components/notfound/NotFound'
import Loader from '../../../../components/loader/Loader'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'
import { useIsFocused } from '@react-navigation/native'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'
import SearchBox from '../../../../components/search-box/SearchBox'

/**Main export*/
const OnlineNowScreen: React.FC = () => {
    const { Token } = useAuth()
    const isFocused = useIsFocused();

    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [search, setSearch] = useState("");

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["searchUser"],
        queryFn: () => SearchUser(Token, null, null, true),
        enabled: isFocused && !!Token
    });

    useEffect(() => {
        if (isFocused) {
            setSelected("")
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
        setSelected("");
        console.log("clicked")
    };

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
                    <SearchBox
                        {...{
                            search,
                            setSearch
                        }}
                    />
                    {isLoading ? (
                        <Loader />
                    ) : data?.data?.length > 0 ? (
                        data.data.map((item: any, index: number) => (
                            <UserInfoCard
                                key={index}
                                {...{
                                    type: "user",
                                    isMore: true,
                                    // isOption: true,
                                    isFilterOption: true,
                                    isGallery: item?.profile?.photos?.length > 0 ? true : false,
                                    profileImages: item?.profile?.photos,
                                    UserName: item?.username,
                                }}
                            >
                                <InfoCardLayoutOne
                                    {...{
                                        item
                                    }}
                                />
                            </UserInfoCard>
                        ))
                    ) : (
                        <NotFound
                            {...{
                                title: "No users are currently online. Please check back later to see who’s available.",
                                photo: require("@images/notFound/online_not.png"),
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
                        filterData: OnlineOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
                <TextInput
                    placeholder="Search by country"
                    style={styles.dt_searchInput}
                    placeholderTextColor={Colors.dt_gray}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default OnlineNowScreen

// 7439423955