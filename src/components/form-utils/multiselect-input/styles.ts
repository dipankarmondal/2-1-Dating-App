import { StyleSheet } from "react-native";
import { ms } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const MultiSelectInputStyles = StyleSheet.create({
    dt_select_input_wrapper: {
        borderRadius: ms(10),
        backgroundColor: Colors.dt_border,
        borderWidth: ms(1),
        borderColor: Colors.dt_gray,
        justifyContent: "center",
        paddingHorizontal: ms(16),
        paddingVertical: ms(12),
        maxHeight:ms(100)
    },
    selectedText: {
        color: Colors.dt_white,
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
    },
    optionsContainer: {
        maxHeight: 220,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    optionTextWrapper: {
        flex: 1,
        paddingRight: 12,
    },
    optionText: {
        fontSize: ms(16),
        color: Colors.dt_border,
        fontFamily: Fonts.Font_600
    },
    iconWrapper: {
        width: 28,
        alignItems: "center",
        justifyContent: "center",
    },
})
