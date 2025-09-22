/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { Colors } from '../../../../utils/constant/Constant'
import { ModalSelectContentStyles as styles } from './styles'
import { IconProps } from '../../../../utils/helpers/Iconprops';
import { ms } from '../../../../utils/helpers/responsive';
import { ModalSelectContentProps } from '../../../../utils/types/types';

/**Icons*/
import CheckIcon from '@svgs/check-circle.svg';
import UnCheckIcon from '@svgs/uncheck.svg';
import SubmitButton from '../../../submit-button';

/**Main export*/
const ModalSelectContent: React.FC<ModalSelectContentProps> = ({ filterData, setModalVisible, selected, setSelected }) => {

    const handleSelect = (itemKey: string) => {
        setSelected(itemKey);
        // setModalVisible(false);
    };

    return (
        <>
            {filterData?.map((item) => (
                <TouchableOpacity
                    key={item.key}
                    onPress={() => handleSelect(item.key)}
                    style={styles.suggestionItem}
                >
                    <Text style={styles.suggestionText}>{item.value}</Text>
                    {selected === item.key ? (
                        <CheckIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                    ) : (
                        <UnCheckIcon {...IconProps(ms(18))} fill={Colors.dt_gray + "80"} />
                    )}
                </TouchableOpacity>
            ))}
        </>
    )
}

export default ModalSelectContent