import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PhoneInputStyles as PhoneStyles } from './styles'
import { ModalStyles as ModalStyles } from './styles'
import PhoneInput, {
    ICountry,
    isValidPhoneNumber,
} from 'react-native-international-phone-number';
import Formfields from '../../../utils/models/FormFields.json';
import { Controller } from 'react-hook-form';
import { ms } from '../../../utils/helpers/responsive';
type Props = {
    name: string;
    parent?: string;
    control: any,
    setPhone: any
}

const PhoneInputForm: React.FC<Props> = ({ name, parent, control, setPhone }) => {
    const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);

    function handleSelectedCountry(country: ICountry) {
        setSelectedCountry(country);
    }

    const Fields: Record<string, any> = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => {
                useEffect(() => {
                    if (value && selectedCountry?.idd?.root) {
                        setPhone(`${selectedCountry.idd.root}${value}`);
                    } else {
                        setPhone(value || "");
                    }
                }, [value, selectedCountry]);
                return (
                    <View style={{ marginBottom: ms(15) }}>
                        <PhoneInput
                            value={value}
                            onChangePhoneNumber={(phoneNumber) => {
                                onChange(phoneNumber);
                            }}
                            selectedCountry={selectedCountry}
                            onChangeSelectedCountry={handleSelectedCountry}
                            placeholder="Phone Number"
                            defaultCountry="IN"
                            phoneInputStyles={PhoneStyles}
                            modalStyles={ModalStyles}
                        />
                        {error && <Text style={PhoneStyles.error} >{error.message}</Text>}
                    </View>
                )
            }}
        />
    )
}

export default PhoneInputForm