/**React Imports */
import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

/** Liabary*/
import { Controller } from 'react-hook-form';

/**Icons*/
import AngleDown from '@svgs/angle-down.svg';
import AngleUp from '@svgs/angle-up.svg';

/**Local import */
import { IconProps } from '../../../utils/helpers/Iconprops';
import Formfields from '../../../utils/models/FormFields.json';
import { ms } from '../../../utils/helpers/responsive';
import { Colors } from '../../../utils/constant/Constant';
import { DropdownInputStyles as styles } from './styles'
import { DropdownInputProps } from '../../../utils/types/types';

/**Components */
import SuggestionBox from '../../suggestion-box';

/**Main export*/
const DropdownInput: React.FC<DropdownInputProps> = ({
    name,
    parent,
    control,
    selectionData,
    label,
    isDubble
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchText, setSearchText] = useState('')

    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    const filteredProducts = selectionData.filter((option: any) => {
        const search = searchText.toLowerCase();
        return (
            option.value.toLowerCase().includes(search)
        );
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => {
                // const selected = selectionData?.find(opt => opt.key === value)?.value || FieldName.placeholder;

                const selectedType = typeof value === "object" ? value?.type : value;
                const status = typeof value === "object" ? Number(value?.status) : null;

                const selected =
                    selectionData?.find(opt => opt.key === selectedType)?.value ||
                    FieldName.placeholder;

                return (
                    <View style={{ marginBottom: ms(15) }}>
                        {
                            label && <Text style={styles.dt_select_label}>{FieldName?.label}</Text>
                        }
                        <Pressable
                            style={[
                                styles.dt_select_input_wrapper,
                            ]}
                            onPress={() =>
                                setShowDropdown(prev => !prev)
                            }
                        >
                            <View style={styles.dt_select_input_text}>
                                <Text style={[styles.dt_select_input, selected === FieldName.placeholder && { color: Colors.dt_gray + "BD" }]}>
                                    {selected}
                                </Text>
                            </View>
                            {
                                showDropdown ?
                                    <AngleUp {...IconProps(ms(22))} fill={Colors.dt_white} /> :
                                    <AngleDown {...IconProps(ms(22))} fill={Colors.dt_white} />
                            }
                        </Pressable>
                        <SuggestionBox
                            {...{
                                showDropdown,
                                setShowDropdown,
                                filteredProducts,
                                value,
                                onChange,
                                searchText,
                                setSearchText,
                                isDubble
                            }}
                        />
                        {
                            error && <><Text style={styles.dt_error}>{error.message}</Text></>
                        }
                    </View>
                );
            }}
        />
    )
}

export default DropdownInput