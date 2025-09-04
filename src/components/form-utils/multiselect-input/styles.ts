import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const MultiSelectInputStyles = StyleSheet.create({
  dt_select_label: {
        color: Colors.dt_black,
        fontFamily: Fonts.Font_600,
        fontSize: ms(17),
        marginBottom: ms(5),
    },
})
