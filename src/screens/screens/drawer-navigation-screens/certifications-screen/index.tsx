import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import { TravelOptions } from '../../../../components/common/helper'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'

const CertificationsScreen: React.FC = () => {
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
                    <UserInfoCard
                        {...{
                            type: "certifications",
                            isMore: true,
                            isOption: true,
                            isUserContent: false,
                            isFilterOption: true,
                            isGallery: true
                        }}
                    />
                    <UserInfoCard
                        {...{
                            type: "certifications",
                            isMore: true,
                            isOption: true,
                            isUserContent: false,
                            isFilterOption: true,
                            isGallery: true
                        }}
                    />
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