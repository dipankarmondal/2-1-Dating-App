import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const SuggestionStyles = StyleSheet.create({
   dropdownList: {
        position: 'absolute',
        top: 60,
        width: '100%',
        backgroundColor: Colors.dt_white,
        borderRadius: ms(10),
        borderWidth: 1,
        borderColor: Colors.dt_gray + "87",
        zIndex: 10,
        overflow: 'hidden',
        maxHeight: ms(300),
    },

    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: ms(10),
    },

    dropdownItemText: {
        fontFamily: Fonts.Font_700,
        color: Colors.dt_black,
        fontSize: ms(14),
    },
})
