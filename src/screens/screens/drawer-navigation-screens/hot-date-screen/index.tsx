/**React Imports */
import { View, Text, TouchableOpacity, Platform } from 'react-native'
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
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors, getAge } from '../../../../utils/constant/Constant'
import { OnlineOptions } from '../../../../components/common/helper'
import { HotDateStyles as styles } from './styles'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { GetHotDate, SendFriendRequest } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms, toast } from '../../../../utils/helpers/responsive'

/** Liabary*/
import { useIsFocused, useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useMutation, useQuery } from '@tanstack/react-query'
import moment from 'moment'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import CoupleIcon from '@svgs/couple.svg'
import SearchBox from '../../../../components/search-box/SearchBox'
import { useForm, useFormState } from 'react-hook-form'
import DropdownInput from '../../../../components/form-utils/dropdown-input'
import { HotdateFilter } from '../../../../utils/builders'
import SubmitButton from '../../../../components/submit-button'

/**Main export*/
const HotDateScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [distance, setDistance] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [search, setSearch] = useState<string>("");
    const [location, setLocation] = useState("");
    const [filter, setFilter] = useState();

    const FilterDate = moment(selectedDate).isValid()
        ? moment(selectedDate).format("YYYY-MM-DD")
        : null;

    const isFocused = useIsFocused();
    const Navigation = useNavigation<any>();
    const { Token } = useAuth()

    const { control, handleSubmit, reset } = useForm()

    useEffect(() => {
        if (isFocused) {
            setLocation("")
            setFilter(null)
            setSelectedDate(null)
            setDistance(0)
        }
    }, [isFocused]);

    const hideDatePicker = () => setDatePickerVisibility(false);

    const { data: GetHotDateData, isLoading: GetHotDateLoading, refetch: GetHotDateRefetch } = useQuery({
        queryKey: ["GetHotDate", FilterDate, distance, location, filter],
        queryFn: () => GetHotDate(Token, FilterDate, distance, location, filter),
        enabled: isFocused && !!Token
    });

    const formattedDate = (date: any) => (
        moment(date).format("MMM DD, YYYY")
    );

    const onFilter = (data: any) => {
        setFilter(data)
        setShowDropdown(false)
        setLocation("")
        reset()
    }

    const OnApiRefresh = () => {
        setLocation("")
        setFilter(null)
        setSelectedDate(null)
        setDistance(0)
        GetHotDateRefetch()
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
                onRefresh={OnApiRefresh}
            >
                <View style={CommonStyles.dt_container}>
                    <SearchBox
                        {...{
                            search,
                            setSearch,
                            placeholder: "Search you hot dates here...",
                        }}
                    />
                    {GetHotDateLoading ? <Loader /> :
                        GetHotDateData?.data?.length > 0 ? (
                            GetHotDateData?.data?.map((item: any, index: number) => {
                                return (
                                    <UserInfoCard
                                        key={index}
                                        {...{
                                            type: "user",
                                            item,
                                            isMore: true,
                                            isUserContent: false,
                                            isFilterOption: true,
                                            isGallery: item?.creator?.profile?.photos?.length > 0 ? true : false,
                                            UserName: item?.creator?.profile?.firstName,
                                            profileImages: item?.creator?.profile?.photos,
                                            userId: item?.creator?._id,
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
            >

                {
                    HotdateFilter(control).map((item, index) => {
                        if (item.type === "dropdown") {
                            return <DropdownInput key={index} {...item} />;
                        }
                    })
                }
                <HotdateContent
                    {...{
                        distance,
                        setDistance,
                        setDatePickerVisibility,
                        selectedDate,
                        location,
                        setLocation
                    }}
                />

                <View style={{ marginBottom: ms(10) }}>
                    <SubmitButton
                        {...{
                            text: "Submit",
                            loading: false,
                            onPress: handleSubmit(onFilter),
                        }}
                    />
                </View>
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