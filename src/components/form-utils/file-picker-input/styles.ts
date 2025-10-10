import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const FilePickerInputStyles = StyleSheet.create({
    dt_container: {
        width: "100%",
        backgroundColor: Colors.dt_white + "33",
        padding: ms(10),
        borderRadius: ms(10),
        height: ms(100),
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    dt_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_image_container:{
        width:ms(100),
        height:ms(80),
        borderRadius:ms(8),
        overflow:"hidden",
        backgroundColor:Colors.dt_white
    },
    dt_images_wrapper:{
        flexDirection:"row",
        gap:ms(16),
        marginTop:ms(16)
    },
    dt_image:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
    },
    dt_image_overlay:{
        position:"absolute",
        width:"100%",
        height:ms(25),
        bottom:0,
        backgroundColor:Colors.dt_error + "85",
    },
    dt_remove_btn:{
        width:"100%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
    },
    dt_remove_text:{
        fontSize:ms(10),
        fontFamily:Fonts.Font_500,
        color:Colors.dt_white
    }
})
