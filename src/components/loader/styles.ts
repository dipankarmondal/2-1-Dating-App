import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";

export const LoaderStyles = StyleSheet.create({
  dt_loading:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        flex:1
    },
    dt_loading_text:{
        color:Colors.dt_white,
        fontSize:ms(13),
        fontFamily:Fonts.Font_600,
        marginLeft:ms(5)
    }
})
