/**React Imports */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { ViewMeOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'

/** Liabary*/
import { useIsFocused } from '@react-navigation/native'

/**Main export*/
const ViewMeScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState<string>("");
 
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={commonstyle.dt_header_title}>View Me</Text>
                <TouchableOpacity
                    style={[commonstyle.dt_filter, { borderColor: Colors.dt_error }]}
                    onPress={() => { setShowDropdown((prev) => !prev); }}
                >
                    <Text style={[commonstyle.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                </TouchableOpacity>
            </ScreenHeader>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={commonstyle.dt_container}>
                    <UserInfoCard
                        {...{
                            isMore: true,
                            isOption: true,
                            isFilterOption: false,
                            isGallery: true
                        }}
                    />
                    <UserInfoCard
                        {...{
                            isMore: true,
                            isOption: true,
                            isFilterOption: false,
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