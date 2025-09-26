/**React Imports */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { OnlineOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'

/** Liabary*/
import { useIsFocused } from '@react-navigation/native'

/**Main export*/
const NewMemberScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
        console.log("clicked")
    };

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>New Members</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity
                        style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]}
                        onPress={() => {
                            setShowDropdown((prev) => !prev);
                        }}
                    >
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={CommonStyles.dt_container}>
                    <UserInfoCard
                        {...{
                            isMore: true,
                            isOption: true,
                            isFilterOption: true,
                            isGallery: true
                        }}
                    />
                    <UserInfoCard
                        {...{
                            isMore: true,
                            isOption: true,
                            isFilterOption: true,
                            isGallery: true
                        }}
                    />
                </View>
            </ScrollView>
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
            </ModalAction>
        </ScreenLayout>
    )
}

export default NewMemberScreen