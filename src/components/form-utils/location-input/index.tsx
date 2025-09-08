/**React Imports */
import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

/** Liabary*/
import { Controller } from 'react-hook-form';

/**Icons*/
import AngleDown from '@svgs/angle-down.svg';
import AngleUp from '@svgs/angle-up.svg';

/**Local import */
import { IconProps } from '../../../utils/helpers/Iconprops';
import Formfields from '../../../utils/models/FormFields.json';
import { LocationInputStyles as styles } from './styles'

/**Components */
import ModalAction from '../../modal/modal-action/ModalAction';
import SearchBox from '../../search-box';
import { DropdownInputProps } from '../../../utils/types/types';
import { ms } from '../../../utils/helpers/responsive';
import { Colors } from '../../../utils/constant/Constant';

/**Main export*/
const LocationInput: React.FC<DropdownInputProps> = ({
    name,
    parent,
    control,
    label,
    Data,
    isEditable
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    const filterData = (text: string) => {
        if (!text) return Data;
        return Data?.reduce((acc, item) => {
            if (item?.name?.toLowerCase().includes(text.toLowerCase())) {
                acc.push(item);
            }
            return acc;
        }, []);
    };

    // When modal opens, load filtered data
    useEffect(() => {
        if (showDropdown) {
            setIsLoading(true);
            setTimeout(() => {
                setFilteredData(filterData(searchText));
                setIsLoading(false);
            }, 300); // simulate async delay, or remove if instant
        }
    }, [showDropdown, searchText]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const selected = Data?.find(opt => opt?.id === value)?.name || FieldName.placeholder;

                return (
                    <View style={{ marginBottom: ms(15) }}>
                        {label && <Text style={styles.dt_select_label}>{FieldName?.label}</Text>}

                        <Pressable
                            style={[
                                styles.dt_select_input_wrapper,
                                {
                                    backgroundColor: isEditable ? Colors.dt_white : Colors.dt_gray + "3B",
                                    borderWidth: isEditable ? 1 : 0
                                }
                            ]}
                            onPress={() => isEditable && setShowDropdown(prev => !prev)}
                        >
                            <View style={styles.dt_select_input_text}>
                                <Text
                                    style={[
                                        styles.dt_select_input,
                                        { color: selected === FieldName.placeholder ? Colors.dt_gray + 'BD' : Colors.dt_black }
                                    ]}
                                >
                                    {selected}
                                </Text>
                            </View>
                            {showDropdown ? (
                                <AngleUp {...IconProps(ms(22))} fill={isEditable ? Colors.dt_black : Colors.dt_gray + 'BD'} />
                            ) : (
                                <AngleDown {...IconProps(ms(22))} fill={isEditable ? Colors.dt_black : Colors.dt_gray + 'BD'} />
                            )}
                        </Pressable>
                        <ModalAction
                            isModalVisible={showDropdown}
                            setModalVisible={setShowDropdown}
                            headerText={FieldName?.label}
                            type="location"
                        >
                            <View style={{ paddingHorizontal: ms(16), paddingTop: ms(16) }}>
                                <SearchBox
                                    setSearchText={setSearchText}
                                    searchText={searchText}
                                />
                            </View>
                            <View style={styles.dt_modal_body}>
                                {isLoading ? (
                                    <Text style={styles.dt_not_found}>{name} Loading...</Text>
                                ) : filteredData?.length > 0 ? (
                                    filteredData.map((item, index) => {
                                        const isSelected = value === item?.id;
                                        return (
                                            <Pressable
                                                key={index}
                                                onPress={() => {
                                                    onChange(item.id);
                                                    setShowDropdown(false);
                                                    setSearchText('');
                                                }}
                                                style={[
                                                    styles.dt_btn_box,
                                                    { backgroundColor: isSelected ? Colors.dt_bg : Colors.dt_white }
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.dt_btn_text,
                                                        { color: isSelected ? Colors.dt_white : Colors.dt_black }
                                                    ]}
                                                >
                                                    {item?.name}
                                                </Text>
                                            </Pressable>
                                        );
                                    })
                                ) : (
                                    <Text style={styles.dt_not_found}>No results found</Text>
                                )}
                            </View>
                        </ModalAction>
                        {error && <Text style={styles.dt_error}>{error.message}</Text>}
                    </View>
                );
            }}
        />
    );
};

export default LocationInput;