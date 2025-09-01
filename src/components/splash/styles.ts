import { StyleSheet } from "react-native";
import { Colors } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";

export const SplashStyles = StyleSheet.create({
    wm_container:{
        flex:1,
        backgroundColor:Colors.dt_bg,
        alignItems:"center",
        justifyContent:"center"
    },
    wn_logo_container:{
        width:ms(120),
        height:ms(120),
        marginBottom:ms(20)
    },
    wn_logo:{
        width:"100%",
        height:"100%",
        resizeMode:"contain"
    },
    dt_loader_box:{
        width:ms(100),
        height:ms(100),
        backgroundColor:"red"
    }
})
