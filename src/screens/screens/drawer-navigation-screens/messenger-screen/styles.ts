import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../../utils/constant/Constant";
import { ms } from "../../../../utils/helpers/responsive";

export const HomeScreenStyles = StyleSheet.create({
    dt_search_wrapper: {
        width: "100%",
        height: ms(45),
        backgroundColor: Colors.dt_gray + "33",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: ms(8),
        marginTop: ms(2),
        borderRadius: ms(8)
    },
    dt_search_input: {
        paddingHorizontal: ms(8),
        fontFamily: Fonts.Font_600,
        fontSize: ms(14),
        flex:1
    },
    dt_messenger_wrapper:{
        backgroundColor:Colors.dt_gray + "33",
        borderRadius:ms(8),
        width:"100%",
        padding:ms(10),
        flexDirection:"row",
        alignItems:"center",
        gap:ms(15)
    },
    dt_image_container:{
        width:ms(45),
        height:ms(45),
        borderRadius:ms(50),
        overflow:"hidden",
    },
    dt_image:{
        width:"100%",
        height:"100%",
        resizeMode:"cover"
    },
    dt_text_container:{
        flex:1
    },
    dt_name_wrapper:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    dt_text_wrapper:{
        flex:1
    },
    dt_name:{
        fontFamily:Fonts.Font_600,
        fontSize:ms(16),
        color:Colors.dt_white
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
    dt_buttons_wrapper:{
        // gap:ms(10)
    },
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
    dt_filter_wrapper:{
        width:ms(25),
        height:ms(25),
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center",
        // backgroundColor:"red"
    }
})
