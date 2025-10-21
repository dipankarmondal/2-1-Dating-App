import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const CountryInputStyles = StyleSheet.create({
    dt_select_label: {
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(17),
        marginBottom: ms(5),
    },
    dt_select_input_wrapper: {
        height: ms(45),
        borderRadius: ms(10),
        backgroundColor: Colors.dt_border,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: ms(1),
        borderColor: Colors.dt_gray,
        paddingRight: ms(7),
    },
    dt_select_input_text: {
        height: "100%",
        flex: 1,
        justifyContent: "center"
    },
    dt_select_input: {
        paddingHorizontal: ms(15),
        color: Colors.dt_white,
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        flex:1
    },
    suggestion_container: {
        position: "absolute",
        top: ms(55),
        left: 0,
        right: 0,
        backgroundColor: Colors.dt_white,
        borderColor: Colors.dt_border,
        borderWidth: 1,
        borderRadius: ms(8),
        zIndex: 999,
        maxHeight: ms(150),
    },
    suggestion_item: {
        padding: ms(10),
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.dt_border,
    },

})
