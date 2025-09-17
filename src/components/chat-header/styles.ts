import { StyleSheet } from "react-native";
import { ms, spacing } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const ChatHeaderStyles = StyleSheet.create({
    dt_container: {
        height: ms(60),
        width: "100%",
        backgroundColor: Colors.dt_border,
        paddingHorizontal: ms(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    dt_left_header: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(10)
    },
    dt_icon_box: {
        width: ms(25),
        height: ms(25),
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.dt_gray + "33"
    },
    dt_profile_image: {
        width: ms(40),
        height: ms(40),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_gray + "33",
        overflow: "hidden"
    },
    dt_image:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
    },
    dt_name:{
        fontSize:ms(17),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_white,
        textTransform:"capitalize"
    },
    dt_right_header:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(10),
    },
    dt_btn_box:{
        width:ms(35),
        height:ms(35),
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colors.dt_gray + "33"
    },
    dt_profile_box:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(10)
    }
})
