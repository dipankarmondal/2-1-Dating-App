import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Formfields from '../../../utils/models/FormFields.json';
import { Controller } from 'react-hook-form';
import { ms } from '../../../utils/helpers/responsive';
import { ModeInputStyles as styles } from './styles'
import { ModeInputProps } from '../../../utils/types/types';


const ModeInput: React.FC<ModeInputProps> = ({ name, parent, control, label, type, option }) => {
    const Fields: Record<string, any> = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => {
                return (
                    <View style={{ marginBottom: ms(15) }}>
                        {label ? (
                            <Text style={styles.FormLabel}>{FieldName?.label}</Text>
                        ) : null}
                        <View style={styles.container}>
                            {option.map((item: any) => {
                                const isActive = value === item.key;
                                return (
                                    <TouchableOpacity
                                        key={item.key}
                                        style={[styles.button, isActive && styles.activeButton]}
                                        onPress={() => onChange(item.key)}
                                    >
                                        <Text style={[styles.text, isActive && styles.activeText]}>
                                            {item.value}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        {error && (
                            <Text style={styles.errorText}>{error.message}</Text>
                        )}
                    </View>
                )
            }}
        />
    )
}

export default ModeInput
