import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const TwoPlusOneScreenStyles = StyleSheet.create({
  dt_user_info_card: {
        width: "100%",
        padding: ms(15),
        backgroundColor: Colors.dt_gray + "33",
        borderRadius: ms(5),
        alignItems:"center",
        gap:ms(15)
    },
    dt_icon_container:{
        width:ms(80),
        height:ms(80),
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colors.dt_white,
    },
    dt_btn_box:{
        backgroundColor:Colors.dt_primary_green,
        borderRadius:ms(50),
        padding:ms(5),
        paddingHorizontal:ms(10)
    },
    dt_btn_text:{
        color:Colors.dt_black,
        fontSize:ms(14),
        fontFamily:Fonts.Font_500
    },
    dt_decription:{
        fontSize:ms(13),
        fontFamily:Fonts.Font_500,
        color:Colors.dt_white
    }
})
