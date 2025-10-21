/**React Imports */
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import HotdateContent from '../../../../components/modal/modal-content/hotdate-content/HotdateContent'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors, getAge } from '../../../../utils/constant/Constant'
import { OnlineOptions } from '../../../../components/common/helper'
import { HotDateStyles as styles } from './styles'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { GetHotDate, SendFriendRequest } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms, toast } from '../../../../utils/helpers/responsive'

/** Liabary*/
import { useIsFocused, useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useMutation, useQuery } from '@tanstack/react-query'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import moment from 'moment'

/**Main export*/
const HotDateScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [distance, setDistance] = useState(500);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const isFocused = useIsFocused();
    const Navigation = useNavigation<any>();
    const { Token,user } = useAuth()
    // "68b986f2def0361d51fc6ea8"

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

    const hideDatePicker = () => setDatePickerVisibility(false);

    const { data: GetHotDateData, isLoading: GetHotDateLoading, refetch: GetHotDateRefetch } = useQuery({
        queryKey: ["GetHotDate"],
        queryFn: () => GetHotDate(Token),
        enabled: isFocused && !!Token
    });

    const formattedDate = (date: any) => (
        moment(date).format("MMM DD, YYYY")
    );

    const SendFriendRequestMutation = useMutation({
        mutationFn: (data: any) => SendFriendRequest(Token, data),
        onSuccess: (res) => {
            if(res?.success){
                toast("success", { title: res?.message });
            }
        },
    })

    const handleSendFriendRequest = (id: any) => {
        const payload = {
            receiverId:id,
        }
        SendFriendRequestMutation.mutate(payload);
    }

    return (
        <ScreenLayout>

            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Hot Date</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]} onPress={() => { setShowDropdown((prev) => !prev); }}>
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("SpeedDateScreen") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>+ Speed Date</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>

            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={GetHotDateRefetch} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    {GetHotDateLoading ? <Loader /> :
                        GetHotDateData?.data?.length > 0 ? (
                            GetHotDateData?.data?.map((item: any, index: number) => {
                                const isUser = item?.creator?.id === user?.id
                                return (
                                    <UserInfoCard
                                        key={index}
                                        {...{
                                            type: "hotdate",
                                            item,
                                            isMore: true,
                                            isOption: isUser === true ? false : true,
                                            isUserContent: false,
                                            isFilterOption: true,
                                            isGallery: item?.creator?.profile?.photos?.length > 0 ? true : false,
                                            UserName: item?.creator?.profile?.firstName,
                                            profileImages: item?.creator?.profile?.photos,
                                            onSendFriendRequest: () => handleSendFriendRequest(item?.creator?.id),
                                        }}
                                    >
                                        <View style={styles.dt_intrest}>
                                            <View style={styles.dt_intrest_container}>
                                                <Text style={styles.dt_intrest_text}>Interests</Text>
                                                <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                                                    {item?.preferredWith.includes('couple') && (
                                                        <CoupleIcon {...IconProps(ms(20))} fill={Colors.dt_light_purple} />
                                                    )}
                                                    {item?.preferredWith.includes('male') && (
                                                        <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                                    )}
                                                    {item?.preferredWith.includes('female') && (
                                                        <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                                    )}
                                                </View>
                                            </View>
                                            <View style={[styles.dt_intrest_container, { alignItems: "flex-end" }]}>
                                                <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                                                <View style={[styles.dt_location_container]}>
                                                    <Text style={styles.dt_location_text}>
                                                        {item?.location?.address?.fullAddress ?? "Not specified"}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.dt_intrest}>
                                            <View style={[styles.dt_age_container, { marginTop: ms(10) }]}>
                                                {item?.creator?.profile?.gender === "couple" ? (
                                                    <>
                                                        <View style={styles.dt_age}>
                                                            <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                                            <Text style={styles.dt_age_text}>{getAge(item?.creator?.profile?.dateOfBirth ?? "0")}</Text>
                                                        </View>
                                                        <View style={styles.dt_age}>
                                                            <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                                            <Text style={styles.dt_age_text}>{getAge(item?.creator?.profile?.partner?.dateOfBirth ?? "0")}</Text>
                                                        </View>
                                                    </>
                                                ) : item?.creator?.profile?.gender === "female" ? (
                                                    <View style={styles.dt_age}>
                                                        <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                                        <Text style={styles.dt_age_text}>{getAge(item?.creator?.profile?.dateOfBirth ?? "0")}</Text>
                                                    </View>
                                                ) : (
                                                    <View style={styles.dt_age}>
                                                        <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                                        <Text style={styles.dt_age_text}>{getAge(item?.creator?.profile?.dateOfBirth ?? "0")}</Text>
                                                    </View>
                                                )}
                                            </View>
                                            <View style={[styles.dt_intrest_container, { alignItems: "flex-end" }]}>
                                                <View style={[styles.dt_location_container]}>
                                                    <Text style={[styles.dt_location_text, { color: Colors.dt_error }]}>
                                                        {formattedDate(item?.startDate)} - {formattedDate(item?.endDate)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.dt_intrest}>
                                            <View style={styles.dt_intrest_container}>
                                                <Text style={styles.dt_intrest_text}>Date type</Text>
                                                <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                                                    <Text style={styles.dt_location_text}>{item?.type}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.dt_intrest_container, { alignItems: "flex-end" }]}>
                                                <Text style={styles.dt_intrest_text}>Create date</Text>
                                                <View style={[styles.dt_location_container]}>
                                                    <Text style={[styles.dt_location_text, { color: Colors.dt_error }]}>
                                                        {formattedDate(item?.createdAt)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.dt_intrest}>
                                            <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                                                <Text style={[styles.dt_location_text, { textAlign: "left" }]}>{item?.details}</Text>
                                            </View>
                                        </View>
                                    </UserInfoCard>
                                )
                            })
                        ) : (
                            <NotFound
                                {...{
                                    title: "No hot dates found. Try updating your preferences or check back later for new matches.",
                                    photo: require("@images/notFound/hotdate_not.png")
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
                        filterData: OnlineOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
                <HotdateContent
                    {...{
                        distance,
                        setDistance,
                        setDatePickerVisibility,
                        selectedDate,
                    }}
                />
            </ModalAction>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                    setSelectedDate(date);
                    hideDatePicker();
                }}
                onCancel={hideDatePicker}
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
            />
        </ScreenLayout>
    )
}

export default HotDateScreen