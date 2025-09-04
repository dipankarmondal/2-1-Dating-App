import { StyleSheet } from "react-native";
import { ms } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const DtaePickerStyles = StyleSheet.create({
    dt_select_input_wrapper: {
        height: ms(45),
        borderRadius: ms(10),
        backgroundColor: Colors.dt_border,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: ms(1),
        borderColor: Colors.dt_gray,
        paddingRight: ms(7)
    },
    dt_select_label: {
        color: Colors.dt_bg,
        fontFamily: Fonts.Font_600,
        fontSize: ms(17),
        marginBottom: ms(5),
    },

    dt_error: {
        color: Colors.dt_error,
        fontSize: ms(13),
        paddingTop: ms(4),
        fontFamily: Fonts.Font_600
    },
    dt_select_input: {
        paddingHorizontal: ms(15),
        color: Colors.dt_black,
        fontSize: ms(17),
        fontFamily: Fonts.Font_600,
    },
     dt_select_input_text: {
        height: "100%",
        flex: 1,
        justifyContent: "center"
    },
})
