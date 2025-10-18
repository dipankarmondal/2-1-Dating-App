/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import Formfields from '../../../utils/models/FormFields.json';

/** Liabary*/
import { Controller } from 'react-hook-form';

/**Local imports*/
import { ms } from '../../../utils/helpers/responsive';
import { ModeInputStyles as styles } from './styles'
import { ModeInputProps } from '../../../utils/types/types';

/**Main export*/
const ModeInput: React.FC<ModeInputProps> = ({ name, parent, control, label, type, option }) => {
    const Fields: Record<string, any> = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                // Check if flag is true (based on your setValue)
                const flag = value?.flag;
                const selectedValue = value?.value;

                return (
                    <View style={{ marginBottom: ms(15) }}>
                        {label ? (
                            <Text style={styles.FormLabel}>{FieldName?.label}</Text>
                        ) : null}

                        <View style={styles.container}>
                            {option.map((item: any) => {
                                // If flag is true → only the matched one stays active
                                const isActive = flag ? selectedValue === item.key : value === item.key;
                                const isDisabled = flag && selectedValue !== item.key;

                                return (
                                    <TouchableOpacity
                                        key={item.key}
                                        style={[
                                            styles.button,
                                            isActive && styles.activeButton,
                                            isDisabled && { opacity: 0.5 } // make disabled look faded
                                        ]}
                                        onPress={() => {
                                            if (!isDisabled) {
                                                if (flag) {
                                                    onChange({ value: item.key, flag: true });
                                                } else {
                                                    onChange(item.key);
                                                }
                                            }
                                        }}
                                        disabled={isDisabled}
                                    >
                                        <Text
                                            style={[
                                                styles.text,
                                                isActive && styles.activeText
                                            ]}
                                        >
                                            {item.value}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                );
            }}
        />
    );
};

export default ModeInput
