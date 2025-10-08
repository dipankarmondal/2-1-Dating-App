import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { FeaturedMembersAddScreenStyles as styles } from './styles'
import InfoIcon from "@svgs/info.svg"
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors } from '../../../../utils/constant/Constant'
import ToggleSwitch from '../../../../components/toggle-switch'
import { FeaturedMemberAddData } from './helper'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'

const FeaturedMembersAddScreen: React.FC = () => {
    const [toggleStates, setToggleStates] = useState<{ [key: number]: boolean }>({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [SelectedData, setSelectedData] = useState('');

      const handleToggle = (index: number) => {
        setToggleStates(prev => ({
            ...prev,
            [index]: !prev[index] // toggle only the specific index
        }));
    };
    const HanddleModal = (data: any) => {
        setShowDropdown(!showDropdown)
        setSelectedData(data)
    }
    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Featured Members - Add me"
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    {
                        FeaturedMemberAddData.map((item, index) => {
                            return (
                                <View key={index} style={styles.dt_info_list_container}>
                                    <View style={styles.dt_info_list_wrapper}>
                                        <Text style={styles.dt_info_list_text}>{item?.text}</Text>
                                        <TouchableOpacity style={styles.dt_info_list_icon} onPress={() => HanddleModal(item?.des)}>
                                            <InfoIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                                        </TouchableOpacity>
                                    </View>
                                    <ToggleSwitch
                                        isActive={toggleStates[index] ?? false} // default false if undefined
                                        onToggle={() => handleToggle(index)}
                                    />
                                </View>
                            )
                        })
                    }

                </View>  
            </ScrollView>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Description"
                type="member"
            >
                <Text style={styles.dt_modal_text}>{SelectedData}</Text>
            </ModalAction>
        </ScreenLayout>
    )
}

export default FeaturedMembersAddScreen