import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const NotFoundStyles = StyleSheet.create({
    dt_container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dt_text:{
        fontSize:ms(12),
        fontFamily:Fonts.Font_700,
        color:Colors.dt_white
    }
})
