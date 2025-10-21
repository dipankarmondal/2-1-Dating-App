import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import { TravelOptions } from '../../../../components/common/helper'
import { TravelDateScreenStyles as styles } from './styles'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'

const TravelDateScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const Navigation = useNavigation<any>();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
    };
    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Travel Date</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]} onPress={() => { setShowDropdown((prev) => !prev); }}>
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyles.dt_speed_date}>
                        <Text style={CommonStyles.dt_speed_date_text}>+ Travel Plan</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={() => { }} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    <UserInfoCard
                        {...{
                            type: "travel",
                            isMore: true,
                            isOption: true,
                            isUserContent: false,
                            isFilterOption: true,
                            isGallery: true
                        }}
                    >
                        <View style={styles.dt_intrest}>
                            <View style={styles.dt_intrest}>
                                <View style={[styles.dt_age_container, { marginTop: ms(10) }]}>
                                    <View style={styles.dt_age}>
                                        <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                        <Text style={styles.dt_age_text}>5</Text>
                                    </View>
                                    <View style={styles.dt_age}>
                                        <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                        <Text style={styles.dt_age_text}>2</Text>
                                    </View>
                                </View>
                                <View style={[styles.dt_intrest_container, { alignItems: "flex-end" }]}>
                                    <View style={[styles.dt_location_container]}>
                                        <Text style={[styles.dt_location_text, { color: Colors.dt_error }]}>
                                            helo
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </UserInfoCard>
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

export default TravelDateScreen 