/**React Imports */
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { OnlineOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import HotdateContent from '../../../../components/modal/modal-content/hotdate-content/HotdateContent'

/** Liabary*/
import { useIsFocused, useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

/**Main export*/
const PartiesEventsScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [selected, setSelected] = useState<string>("");
    const [distance, setDistance] = useState(500);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const isFocused = useIsFocused();
    const Navigation = useNavigation<any>();

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
    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Parties & Events</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity
                        style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]}
                        onPress={() => {
                            setShowDropdown((prev) => !prev);
                        }}
                    >
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("PrivatePartyScreen") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>Private Party</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
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

export default PartiesEventsScreen 