/**React Imports */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

/**Local imports*/
import { CheckTypes } from '../../../utils/types/types';
import { IconProps } from '../../../utils/helpers/Iconprops';
import { ms } from '../../../utils/helpers/responsive';
import { Colors, Fonts } from '../../../utils/constant/Constant';

/** Liabary*/
import { Controller } from 'react-hook-form';

/**Icons*/
import CheckIcon from '@svgs/check.svg'

/**Main export*/
const CheckBoxs: React.FC<CheckTypes> = ({ control, setValue, isChecked, setIsChecked, errorMessage, name, text }) => {

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={() => (
                    <TouchableOpacity
                        onPress={() => {
                            setIsChecked(!isChecked);
                            setValue("termsAccepted", !isChecked);
                        }}
                        style={styles.rn_btn}
                    >
                        <View
                            style={[styles.rn_check_box, { backgroundColor: isChecked ? Colors.dt_primary_green : Colors.dt_white, }]}
                        >
                            {isChecked && (
                                <CheckIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                            )}
                        </View>
                        <Text style={[styles.rn_check_text,]}>{text}</Text>
                    </TouchableOpacity>
                )}
            />
            {errorMessage && (
                <Text style={styles.rn_error}>
                    {errorMessage}
                </Text>
            )}
        </>
    );
}

export default CheckBoxs

const styles = StyleSheet.create({
    rn_btn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ms(8),
    },
    rn_check_box: {
        width: 20,
        height: 20,
        borderWidth: 1.5,
        borderRadius: 4,
        borderColor: Colors.dt_black,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rn_check_text: {
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(12),
    },
    rn_error: {
        color: Colors.dt_error,
        fontSize: ms(13),
        marginTop: ms(-5),
        fontFamily: Fonts.Font_600
    }
})