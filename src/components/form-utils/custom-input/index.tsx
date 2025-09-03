/**React import */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, } from 'react-native';

/**Local import */
import { CustomInputProps } from '../../../utils/types/types';
import { Colors } from '../../../utils/constant/Constant';
import { ms } from '../../../utils/helpers/responsive';
import Formfields from '../../../utils/models/FormFields.json';

/**Icons*/
import EyeIcon from "@svgs/eye.svg";
import ClosedIcon from "@svgs/crossed-eye.svg";

/**Liabary */
import { Controller } from 'react-hook-form';
import { IconProps } from '../../../utils/helpers/Iconprops';
import { compatibilityFlags } from 'react-native-screens';

const CustomInput: React.FC<CustomInputProps> = ({
    name,
    parent,
    control,
    label,
    type,
    styles,
    keyboardType,
    isCart
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const Fields: Record<string, any> = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    const toCapitalCase = (text: string) => {
        let result = text.toLowerCase().replace(/(^\w|\.\s*\w)/g, (match) => match.toUpperCase());
        return result;
    };

    const toTitleCase = (text: string) => {
        return text.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
    };

    const handleChange = (
        field: { onChange: (value: any) => void },
        value: string
    ) => {
        // Restrict numeric inputs to 10,000 maximum for credit type
        if (type === "credit") {
            const numericValue = parseInt(value, 10) || 0;
            field.onChange(Math.min(numericValue, 10000)); // Cap value at 10,000
        } else if (name === 'first_name' || name === 'last_name') {
            field.onChange(toCapitalCase(value));
        } else if (name === 'company_name') {
            field.onChange(toTitleCase(value));
        } else {
            field.onChange(value);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => {
                return (
                    <View style={[styles.input_wrap, { marginBottom: isCart ? 0 : ms(15) }]}>
                        {label ? (
                            <Text style={styles.FormLabel}>
                                {FieldName?.label} <Text />
                                <Text style={{ color: Colors.dt_gray }}>{FieldName?.optional}
                                </Text>
                            </Text>
                        ) : null}
                        <View
                            style={[
                                styles.wrapper,
                                type === 'textarea' ? styles.textarea : null,
                                {
                                    borderWidth: isCart ? 0 : 1
                                }
                            ]}>
                            <TextInput 
                                style={[
                                    styles.input_field,
                                    type === 'textarea' ? styles.textarea : null,
                                    {
                                        flex: isCart ? 0 : 1,
                                        width: ms(isCart ? 200 : 300)
                                    }
                                ]}
                                placeholder={FieldName?.placeholder}
                                value={value || ''}
                                onBlur={onBlur}
                                onFocus={onBlur}
                                onChangeText={(text) => handleChange({ onChange }, text)}
                                placeholderTextColor={Colors.dt_gray + "BD"}
                                autoCapitalize="none"
                                multiline={type == 'textarea' ? true : false}
                                keyboardType={keyboardType}
                                secureTextEntry={type === 'password' && !isPasswordVisible}
                            />
                            {type === 'password' && (
                                <TouchableOpacity style={{ marginRight: ms(10) }} onPress={() => setIsPasswordVisible(!isPasswordVisible)}  >
                                    {isPasswordVisible ? (
                                        <EyeIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                                    ) : (
                                        <ClosedIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                        {error && <Text style={styles.error} > {error.message} </Text>}
                    </View>
                );
            }}
        />
    );
};

export default CustomInput;