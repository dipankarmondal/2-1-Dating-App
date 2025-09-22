import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const ModalSelectContentStyles = StyleSheet.create({
    suggestionItem: {
        paddingVertical: 12,
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"space-between"
    },
    suggestionText: {
        fontFamily: Fonts.Font_700,
        color: Colors.dt_white,
        fontSize: ms(14),
    },
  
})
