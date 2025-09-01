/**React Imports */
import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';

/** Liabary*/
import { useFocusEffect } from '@react-navigation/native';
import { CustomStatusBarProps } from '../../utils/types/types';

/** Liabary*/


/**Main export*/
const CustomStatusBarEffect: React.FC<CustomStatusBarProps> = ({
    color,
    barStyle = 'default',
    translucent = true,
}) => {
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(color);
            StatusBar.setTranslucent(translucent);
            StatusBar.setBarStyle(barStyle);
        }, [color, barStyle, translucent])
    );

    return null;
};

export default CustomStatusBarEffect;