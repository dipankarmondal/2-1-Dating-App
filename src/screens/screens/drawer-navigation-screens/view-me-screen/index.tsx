/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import { ViewMeScreenStyles as styles } from './styles'
import { Colors } from '../../../../utils/constant/Constant'
import { ViewMeOptions } from '../../../../components/common/helper'
import { GetProfileViewers } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { ms } from '../../../../utils/helpers/responsive'
import { IconProps } from '../../../../utils/helpers/Iconprops'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'

/** Liabary*/
import { useIsFocused } from '@react-navigation/native'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useQuery } from '@tanstack/react-query'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'
import SearchBox from '../../../../components/search-box/SearchBox'

/**Main export*/
const ViewMeScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [search, setSearch] = useState("")

    const isFocused = useIsFocused();
    const { Token } = useAuth()

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
        console.log("clicked")
    };

    const { data: ProfileViewedData, isLoading, refetch } = useQuery({
        queryKey: ["profile_viewed", search],
        queryFn: () => GetProfileViewers(Token, search),
        enabled: isFocused && !!Token
    })

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={commonstyle.dt_header_title}>Viewed Me</Text>
                <TouchableOpacity
                    style={[commonstyle.dt_filter, { borderColor: Colors.dt_error }]}
                    onPress={() => { setShowDropdown((prev) => !prev); }}
                >
                    <Text style={[commonstyle.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                </TouchableOpacity>
            </ScreenHeader>

            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch} // just pass refetch here
            >
                <View style={commonstyle.dt_container}>
                    <SearchBox
                        {...{
                            search,
                            setSearch,
                            placeholder: "Search here...",
                        }}
                    />
                    {
                        isLoading ? (
                            <Loader />
                        ) : ProfileViewedData?.data?.length > 0 ? (
                            ProfileViewedData?.data?.map((item: any, index: number) => {
                                const interest = item?.viewerId?.profile?.interestedIn || [];
                                return (
                                    <UserInfoCard
                                        key={index}
                                        {...{
                                            type: "viewme",
                                            item,
                                            isMore: true,
                                            isOption: true,
                                            isFilterOption: false,
                                            isGallery: item?.viewerId?.profile?.photos?.length > 0,
                                            profileImages: item?.viewerId?.profile?.photos,
                                            UserName: item?.viewerId?.username
                                        }}
                                    >
                                        <View style={styles.dt_intrest}>
                                            <View style={styles.dt_intrest_container}>
                                                <Text style={styles.dt_intrest_text}>Interests</Text>
                                                <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                                                    {interest.includes('couple') && (
                                                        <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                                                    )}
                                                    {interest.includes('male') && (
                                                        <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                                    )}
                                                    {interest.includes('female') && (
                                                        <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                                    )}
                                                </View>
                                            </View>

                                            <View style={[styles.dt_intrest_container, { alignItems: "flex-end" }]}>
                                                <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                                                <View style={[styles.dt_location_container]}>
                                                    <Text style={styles.dt_location_text}>
                                                        {item?.viewerId?.profile?.address?.fullAddress ?? "Not specified"}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </UserInfoCard>
                                );
                            })
                        ) : (
                            <NotFound
                                {...{
                                    title: "No one has viewed your profile yet. Stay active and you’ll see visitors here shortly",
                                    photo: require("@images/notFound/view_not.png")
                                }}
                            />
                        )
                    }

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
                        filterData: ViewMeOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default ViewMeScreen 