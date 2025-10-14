import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { PrivacyScreenStyles as styles } from './styles'
import ToggleSwitch from '../../../../components/toggle-switch'
import { PrivacyData } from '../featured-members-add-screen/helper'

const PrivacyScreen: React.FC = () => {
    const [toggleStates, setToggleStates] = useState<{ [key: number]: boolean }>({});

    const handleToggle = (index: number) => {
        setToggleStates(prev => ({
            ...prev,
            [index]: !prev[index] // toggle only the specific index
        }));
    };

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Privacy"
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    {
                        PrivacyData.map((item, index) => {
                            return (
                                <View key={index} style={styles.dt_info_list_container}>
                                    <View style={styles.dt_info_list_wrapper}>
                                        <Text style={styles.dt_info_list_text}>{item?.text}</Text>
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
        </ScreenLayout>
    )
}

export default PrivacyScreen