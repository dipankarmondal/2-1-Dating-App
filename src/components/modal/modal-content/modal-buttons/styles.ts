import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const ModalButtonsStyles = StyleSheet.create({
   dt_buttons:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(10),
        paddingVertical:ms(10),
    },
    dt_btn_text:{
        fontFamily:Fonts.Font_600,
        fontSize:ms(16),
        color:Colors.dt_border
    },
})
