import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CheckIcon from '@svgs/check-circle.svg';
import UnCheckIcon from '@svgs/uncheck.svg';
import { IconProps } from '../../../../utils/helpers/Iconprops';
import { ms } from '../../../../utils/helpers/responsive';
import { Colors, Fonts } from '../../../../utils/constant/Constant';

export type ModalMultiSelecterProps = {
    item: any
}
const ModalMultiSelecter: React.FC<ModalMultiSelecterProps> = ({ item }) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <TouchableOpacity style={styles.optionRow} onPress={() => setIsSelected(!isSelected)}>
            <View style={styles.optionTextWrapper}>
                <Text style={styles.optionText}>{item?.label}</Text>
            </View>
            <View style={styles.iconWrapper}>
                {isSelected ? (
                    <CheckIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                ) : (
                    <UnCheckIcon {...IconProps(ms(18))} fill={Colors.dt_gray + "80"} />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default ModalMultiSelecter

const styles = StyleSheet.create({
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    optionTextWrapper: {
        flex: 1,
        paddingRight: 12,
    },
    optionText: {
        fontSize: ms(16),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600
    },
    iconWrapper: {
        width: 28,
        alignItems: "center",
        justifyContent: "center",
    },
})
