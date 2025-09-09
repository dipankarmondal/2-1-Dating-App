import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms, spacing } from "../../utils/helpers/responsive";

export const AnimatedSearchBarStyles = StyleSheet.create({
   searchContainer: {
        position: "absolute",
        backgroundColor: Colors.dt_white,
        padding: ms(16),
        paddingBottom: ms(0),
        borderBottomRightRadius:ms(10),
        borderBottomLeftRadius:ms(10),
        zIndex: 100,
        maxHeight: ms(350),
        width: "100%",
        overflow: "hidden"
    },
    dt_search_box: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        elevation: 5,
        shadowColor: Colors.dt_black,
        height: ms(45),
        backgroundColor: Colors.dt_white,
        overflow: "hidden",
        paddingHorizontal: ms(10),
        flex:1
    },
    dt_search_content: {
        paddingBottom:ms(10),
        gap:ms(10),
        marginTop:ms(5)
    },
    searchInput: {
        flex: 1,
        color: Colors.dt_border,
        fontSize: ms(16),
        fontFamily: Fonts.Font_600
    },
    closeBtn: {
        width: ms(20),
        height: ms(20),
        borderRadius: ms(100),
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: Colors.dt_black,
        backgroundColor: Colors.dt_border
    },
    dt_content_text: {
        color: Colors.dt_border,
        fontSize: ms(16),
        fontFamily: Fonts.Font_600
    },
    dt_search_input_wrapper:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:ms(10)
    },
    closeBtn_wrapper:{
        height: ms(45),
        width:ms(45),
        alignItems:"center",
        justifyContent:"center",
        borderRadius:ms(8),
        backgroundColor:Colors.dt_white,
        elevation:5,
        shadowColor:Colors.dt_black,
        marginLeft:ms(10)
    },
    dt_search_header:{
        height:ms(55),
        width:"100%",
        backgroundColor:Colors.dt_gray + "33",
        borderRadius:ms(8),
        flexDirection:"row",
        paddingHorizontal:ms(10),
        alignItems:"center"
    },
    dt_search_header_wrapper:{
        flexDirection:"row",
        alignItems:"center",
        height:"100%",
        flex:1
    },
    dt_search_user_image:{
        width:ms(40),
        height:ms(40),
        borderRadius:ms(50),
        overflow:"hidden",
        marginRight:ms(10),
    },
    dt_image:{
        width:"100%",
        height:"100%",
        resizeMode:"cover"
    },
    dt_search_user_name:{
        color:Colors.dt_black,
        fontSize:ms(16),
        fontFamily:Fonts.Font_600
    },
    dt_search_user_id:{
        color:Colors.dt_gray,
        fontSize:ms(13),
        fontFamily:Fonts.Font_600
    },
    dt_search_header_action:{
        width:ms(21),
        height:ms(21),
        alignItems:"center",
        justifyContent:"center",
        borderRadius:ms(50),
        backgroundColor:Colors.dt_border + "33"
    },
    dt_loading:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    dt_loading_text:{
        color:Colors.dt_border,
        fontSize:ms(13),
        fontFamily:Fonts.Font_600,
        marginLeft:ms(5)
    }
})
