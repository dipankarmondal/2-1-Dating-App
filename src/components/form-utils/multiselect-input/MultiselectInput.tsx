import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MultiSelectInputStyles as styles } from './styles'
import Formfields from '../../../utils/models/FormFields.json';
import { Controller } from 'react-hook-form';
import { ms } from '../../../utils/helpers/responsive';
import ModalAction from '../../modal/modal-action/ModalAction';
import CheckIcon from '@svgs/check-circle.svg';
import UnCheckIcon from '@svgs/uncheck.svg';
import { IconProps } from '../../../utils/helpers/Iconprops';
import { Colors } from '../../../utils/constant/Constant';
import { MultiselectInputProps } from '../../../utils/types/types';

const MultiselectInput: React.FC<MultiselectInputProps> = ({ name, parent, control, label, option }) => {

    const [showDropdown, setShowDropdown] = React.useState(false)

    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => {
                const toggleSelection = (selectedValue: string) => {
                    let updatedValues = Array.isArray(value) ? [...value] : [];
                    if (updatedValues.includes(selectedValue)) {
                        updatedValues = updatedValues.filter((v) => v !== selectedValue);
                    } else {
                        updatedValues.push(selectedValue);
                    }
                    onChange(updatedValues);
                };
                const selectedText =
                    Array.isArray(value) && value.length > 0
                        ? value.map((v: string, i: number) => `${i + 1}. ${v}`).join("\n")
                        : FieldName?.label || label || "Select";
                        const isDefaultLabel = !Array.isArray(value) || value.length === 0;
                return (
                    <View style={{ marginBottom: ms(15) }}>
                        <TouchableOpacity
                            style={styles.dt_select_input_wrapper}
                            onPress={() => setShowDropdown(true)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.selectedText, { color: isDefaultLabel ? Colors.dt_gray + "BD": Colors.dt_white }]} >
                                {selectedText}
                            </Text>
                        </TouchableOpacity>
                        <ModalAction
                            isModalVisible={showDropdown}
                            setModalVisible={setShowDropdown}
                            headerText={FieldName?.label}
                            type="multi"
                        >
                            {option.map((item, idx) => {
                                const checked = Array.isArray(value) && value.includes(item.value);
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => toggleSelection(item.value)}
                                        activeOpacity={0.8}
                                        style={styles.optionRow}
                                    >
                                        <View style={styles.optionTextWrapper}>
                                            <Text style={styles.optionText}>{item.value}</Text>
                                        </View>

                                        <View style={styles.iconWrapper}>
                                            {
                                                checked ?
                                                    <CheckIcon {...IconProps(ms(18))} fill={Colors.dt_white} /> :
                                                    <UnCheckIcon {...IconProps(ms(18))} fill={Colors.dt_gray + "80"} />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                );  
                            })}
                        </ModalAction>
                    </View>
                );
            }}
        />
    )
}

export default MultiselectInput