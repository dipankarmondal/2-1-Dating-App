import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors } from '../../../../utils/constant/Constant'
import {ModalButtonsStyles as styles} from './styles'

type Props = {
    item: any;
}

const ModalButtons: React.FC<Props> = ({ item }) => {
    const Icon = item?.icon
    return (
        <TouchableOpacity style={styles.dt_buttons} onPress={item?.onPress}>
            {/* <Icon {...IconProps(ms(18))} fill={ item?.type === 'error' ? Colors.dt_error : Colors.dt_white} /> */}
            <Text style={[styles.dt_btn_text, { color:  item?.type === 'error' ? Colors.dt_error : Colors.dt_white }]}>{item?.name}</Text>
        </TouchableOpacity>
    )
}

export default ModalButtons