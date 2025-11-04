/**React Imports */
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { Colors } from '../../utils/constant/Constant'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'
import { MenuBoxStyles as styles } from './styles'

/**Icons*/
import DotIcon from '@svgs/dots-vertical.svg'

type props = {
    MenuData: any,
    isVisible: boolean,
    setIsVisible: any
}

/**Main export*/
const MenuBox: React.FC<props> = ({ MenuData,isVisible, setIsVisible  }) => {

    const handleToggleMenu = () => {
        setIsVisible(!isVisible);
    };


    return (
        <>
            <TouchableOpacity style={styles.dt_more_container} onPress={handleToggleMenu}>
                <DotIcon {...IconProps(ms(17))} fill={Colors.dt_white} />
            </TouchableOpacity>

            {isVisible && (
                <View style={styles.menuContainer}>
                    {MenuData?.map((item: any, index: any) => {
                        const Icon = item?.Icon;
                        return (
                            <TouchableOpacity key={index} style={styles.menuItem} onPress={item?.onClick}>
                                <Icon {...IconProps(ms(15))} fill={Colors.dt_white} />
                                <Text style={styles.menuText}>{item?.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </>
    )
}

export default MenuBox