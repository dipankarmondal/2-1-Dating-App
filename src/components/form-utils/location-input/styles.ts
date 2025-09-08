import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const LocationInputStyles = StyleSheet.create({
    dt_select_input_wrapper: {
        height: ms(50),
        borderRadius: ms(10),
        backgroundColor: Colors.dt_white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: ms(1),
        borderColor: Colors.dt_gray,
        paddingRight: ms(7)
    },
    dt_select_label: {
        color: Colors.dt_gray,
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
    dt_select_input_text: {
        height: "100%",
        flex: 1,
        justifyContent: "center"
    },
    dt_select_input: {
        paddingHorizontal: ms(15),
        color: Colors.dt_black,
        fontSize: ms(17),
        fontFamily: Fonts.Font_600,
    },
    dt_modal_body: {
        marginTop: ms(20),
    },
    dt_btn_box: {
        paddingVertical: ms(10),
        paddingHorizontal: ms(16),
    },
    dt_btn_text: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_600
    },
    dt_not_found: {
        textAlign: 'center',
        paddingVertical: ms(20),
        color: Colors.dt_gray,
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
        textTransform: 'capitalize'
    }
})
