/**React Imports */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

/**Local imports*/
import { IconProps } from '../../utils/helpers/Iconprops';

/**Icons*/
import UpIcon from '@svgs/angle-up.svg'
import DownIcon from '@svgs/angle-down.svg'
import { AccordionProps } from '../../utils/types/types';
import { Colors, Fonts } from '../../utils/constant/Constant';
import { ms } from '../../utils/helpers/responsive';

/**Main export*/
const Accordion: React.FC<AccordionProps> = ({ title, children, isExpanded, onToggle }) => {
    return (
        <>
            <TouchableOpacity
                onPress={onToggle}
                style={styles.rn_acc_button}
            >
                <View style={styles.rn_expand_info}>
                    <Text style={styles.rn_button_text}>{title}</Text>
                    {
                        isExpanded  ?
                            <UpIcon {...IconProps(ms(20))} fill={Colors.dt_white} /> :
                            <DownIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                    }
                </View>
                {isExpanded  && (
                    <View style={styles.rn_expand_container}>
                        {children}
                    </View>
                )}
            </TouchableOpacity>
        </>
    )
}

export default Accordion

const styles = StyleSheet.create({
    rn_acc_button: {
        padding: 15,
        backgroundColor: Colors.dt_border,
        borderRadius: ms(10),
        elevation: 5,
        shadowColor: Colors.dt_white
    },
    rn_button_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(15),
        color: Colors.dt_white,
        flexShrink: 1
    },
    rn_expand_text: {
        padding: 15,
        backgroundColor: '#fff'
    },
    rn_expand_container: {
        marginTop: ms(5)
    },
    rn_expand_info: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
