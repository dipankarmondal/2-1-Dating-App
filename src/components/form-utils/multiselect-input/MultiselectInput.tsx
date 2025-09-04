import { View, Text } from 'react-native'
import React from 'react'
import { MultiSelectInputStyles as styles } from './styles'
import Formfields from '../../../utils/models/FormFields.json';
import { ms } from '../../../utils/helpers/responsive';
import { Controller } from 'react-hook-form';

type Props = {
    name: string;
    parent: string;
    control: any;
    selectionData: any;
    label: boolean
}

const MultiselectInput: React.FC<Props> = ({ name, parent, control, selectionData, label }) => {
    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => {
                return (
                    <View style={{ marginBottom: ms(15) }}>
                        {
                            label && <Text style={styles.dt_select_label}>{FieldName?.label}</Text>
                        }
                    </View>
                );
            }}
        />
    )
}

export default MultiselectInput