import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { HotdateContentStyles as styles } from './styles'
import Slider from '@react-native-community/slider';
import { Colors } from '../../../../utils/constant/Constant';
import moment from 'moment';

type Props = {
    distance: number;
    setDistance: (val: number) => void;
    setDatePickerVisibility: (val: boolean) => void;
    selectedDate: Date | null;
    setLocation?: any,
    location?: any
}

const HotdateContent: React.FC<Props> = ({ distance, setDistance, setDatePickerVisibility, selectedDate, location, setLocation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>Distance</Text>
                <Text style={styles.value}>{distance}mi</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={500}
                value={distance}
                step={1}
                minimumTrackTintColor="#3B82F6"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#3B82F6"
                onValueChange={setDistance}
            />
            <Pressable
                style={styles.dt_date_picker}
                onPress={() => setDatePickerVisibility(true)}
            >
                <Text
                    style={[
                        styles.dt_picker_text,
                        { color: selectedDate ? "#fff" : Colors.dt_gray }
                    ]}
                >
                    {selectedDate ? moment(selectedDate).format("MMM DD, YYYY") : "Select Date"}
                </Text>
            </Pressable>
            <TextInput
                placeholder="Search by country"
                style={styles.dt_searchInput}
                placeholderTextColor={Colors.dt_gray}
                value={location}
                onChangeText={(text) => {
                    setLocation(text);
                }}
            />

        </View>
    )
}

export default HotdateContent