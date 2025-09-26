/**React Imports */
import { View, Text, Platform, Pressable } from 'react-native'
import React, { useState } from 'react'

/** Liabary*/
import { Controller } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

/**Icons*/
import DateDown from '@svgs/date.svg';

/**Local import */
import Formfields from '../../../utils/models/FormFields.json';
import { DtaePickerStyles as styles } from './styles'
import { DatePickerInputProps } from '../../../utils/types/types';
import { ms } from '../../../utils/helpers/responsive';
import { Colors } from '../../../utils/constant/Constant';
import { IconProps } from '../../../utils/helpers/Iconprops';

/**Main export*/
const DatePickerInput: React.FC<DatePickerInputProps> = ({ name, parent, control, type, label }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const displayValue = value ? moment(value).format('DD-MM-YYYY') : FieldName.placeholder;

                return (
                    <View style={{ marginBottom: ms(15) }}>
                        {
                            label && <Text style={styles.dt_select_label}>{FieldName?.label}</Text>
                        }
                        <Pressable
                            style={[
                                styles.dt_select_input_wrapper,
                            ]}
                            onPress={showDatePicker }
                        >
                            <View style={styles.dt_select_input_text}>
                                <Text style={[styles.dt_select_input, { color: !value ? Colors.dt_gray + 'BD' : Colors.dt_white },]}>
                                    {displayValue}
                                </Text>
                            </View>

                            <DateDown {...IconProps(ms(15))} fill={ Colors.dt_white} />
                        </Pressable>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => {
                                onChange(date.toISOString()); // or format if you want
                                hideDatePicker();
                            }}
                            onCancel={hideDatePicker}
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        />

                        {error && <Text style={styles.dt_error}>{error.message}</Text>}
                    </View>
                );
            }}
            
        />
    );
};

export default DatePickerInput;