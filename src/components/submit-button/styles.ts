import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";
export const SubmitButtonStyles = StyleSheet.create({
    dt_button: {
        width: "100%",
        height: ms(50),
        backgroundColor: Colors.dt_primary_green,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ms(8),
        // marginTop:ms(10)
    },
    dt_button_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(20),
        color: Colors.dt_white,
    }
})
