import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const MessageListStyles = StyleSheet.create({
  dt_messenger_wrapper:{
        backgroundColor:Colors.dt_gray + "33",
        borderRadius:ms(8),
        width:"100%",
        padding:ms(10),
        flexDirection:"row",
        alignItems:"center",
        gap:ms(15),
    },
    dt_image_container:{
        width:ms(45),
        height:ms(45),
        borderRadius:ms(50),
    },
    dt_image:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
        borderRadius:ms(50),
    },
    dt_text_container:{
        flex:1,
        // backgroundColor:"red",
        flexDirection:"row"
    },
    dt_name_wrapper:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"red"
    },
    dt_text_wrapper:{
        flex:1
    },
    dt_name:{
        fontFamily:Fonts.Font_600,
        fontSize:ms(15),
        color:Colors.dt_white,
        textTransform:"capitalize"
    },
    dt_text:{
        fontFamily:Fonts.Font_500,
        fontSize:ms(12),
        color:Colors.dt_gray,
        marginTop:ms(3)
    },
    dt_more:{
        width:ms(20),
        height:ms(20),
        backgroundColor:Colors.dt_gray + "33",
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center"
    },
    dt_status_overlay:{
        position:"absolute",
        width:ms(10),
        height:ms(10),
        bottom:ms(5),
        right:0,
        borderRadius:ms(50),
        backgroundColor:Colors.dt_primary_green,
        alignItems:"center",
        justifyContent:"center",
        zIndex:100
    },
    dt_message_wrapper:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(3),
    }
})
