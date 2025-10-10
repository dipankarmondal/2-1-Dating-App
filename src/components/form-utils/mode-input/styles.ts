import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const ModeInputStyles = StyleSheet.create({
    FormLabel: {
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(14),
        marginBottom: ms(5),
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        paddingVertical: ms(10),
        marginHorizontal: ms(5),
        borderWidth: 1,
        borderColor: Colors.dt_primary_green,
        borderRadius: ms(8),
        alignItems: "center",
    },
    activeButton: {
        backgroundColor: Colors.dt_primary_green,
        borderColor: Colors.dt_primary_green,
    },
    text: {
        color: Colors.dt_primary_green,
        fontFamily: Fonts.Font_500,
        fontSize: ms(15),
    },
    activeText: {
        color: Colors.dt_border, // or white depending on design
        fontFamily: Fonts.Font_600,
    },
    errorText: {
        color: "red",
        fontSize: ms(13),
        marginTop: ms(5),
        fontFamily: Fonts.Font_500,
    },
})
