/**React Imports */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

/**Local imports*/
import { ChooseIntrestInputStyles as styles } from './styles'
import Formfields from '../../../utils/models/FormFields.json';
import { ChooseIntrestInputProps } from '../../../utils/types/types';

/** Liabary*/
import { Controller } from 'react-hook-form';

/**Main export*/
const ChooseIntrestInput: React.FC<ChooseIntrestInputProps> = ({ name, parent, control, selectionData, label }) => {
    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={["couple"]}    // always array
            render={({ field: { onChange, value = [] } }) => {
                const handleSelect = (key: string) => {
                    let newValue = [...value];
                    if (newValue.includes(key)) {
                        newValue = newValue.filter((item) => item !== key);
                    } else {
                        newValue.push(key);
                    }
                    onChange(newValue);
                };

                return (
                    <View style={styles.container}>
                        {label && <Text style={styles.label}>{FieldName?.label}</Text>}
                        <View style={styles.row}>
                            {selectionData.map((item) => {
                                const isSelected = value?.includes(item?.key);
                                return (
                                    <TouchableOpacity
                                        key={item.key}
                                        style={[
                                            styles.option,
                                            isSelected && styles.optionSelected
                                        ]}
                                        onPress={() => handleSelect(item.key)}
                                    >
                                        <Image source={item.image} style={styles.image} />
                                        <Text
                                            style={[
                                                styles.optionText,
                                                isSelected && styles.optionTextSelected
                                            ]}
                                        >
                                            {item.value}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                );
            }}
        />
    );
};

export default ChooseIntrestInput;