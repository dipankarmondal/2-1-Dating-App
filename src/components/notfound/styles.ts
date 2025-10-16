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
        color:Colors.dt_gray ,
        textAlign:"center"
    },
    dt_image_container:{
        width:ms(200),
        height:ms(150),
        overflow:"hidden",
    },
    dt_image:{
        width:"100%",
        height:"100%",
        resizeMode:"cover"
    }
})
