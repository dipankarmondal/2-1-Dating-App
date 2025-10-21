/**React Imports */
import { View, Text, Platform, StyleSheet } from 'react-native'
import React from 'react'

/** Liabary*/
import Toast from 'react-native-toast-message'
import { ms } from '../../utils/helpers/responsive'
import { Colors, Fonts } from '../../utils/constant/Constant'

/**Local imports*/


/**Main export*/
const CustomeToast: React.FC = () => {
    return (
        <Toast
            topOffset={Platform.OS === "ios" ? 50 : 20}
            position="top"
            keyboardOffset={10}
            config={{
                success: ({ text1 }) => (
                    <View style={[styles.ws_toast_container, { borderColor: "#68c778" }]} >
                        <Text style={styles.ws_toast_text}>{text1}</Text>
                    </View>
                ),
                error: ({ text1 }) => (
                    <View style={[styles.ws_toast_container, { borderColor: "#fd6301" }]} >
                        <Text style={styles.ws_toast_text}>{text1}</Text>
                    </View>
                ),
            }}
        />
    )
}

export default CustomeToast

const styles = StyleSheet.create({
    ws_toast_container: {
        backgroundColor: "#F2F6F9",
        paddingHorizontal: ms(10),
        paddingVertical: ms(2),
        borderRadius: 5,
        borderLeftWidth: 5,
        width: "100%",
        maxWidth: '90%',
        alignSelf: 'center',
    },
    ws_toast_text: {
        color: Colors.dt_black,
        flexWrap: "wrap",
        fontFamily: Fonts.Font_500,
        fontSize: ms(13),
        lineHeight: ms(15),
        marginVertical: ms(7)
    }
})