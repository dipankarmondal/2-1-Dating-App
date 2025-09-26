import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const MulteImageStyles = StyleSheet.create({
    dt_image_overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: ms(10),
        // backgroundColor:"green",
        // alignItems:"center",
        // justifyContent:"center"
    },
    dt_more_container: {
        width: ms(25),
        height: ms(25),
        backgroundColor: Colors.dt_border + "63",
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",

    },
    dt_icon_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    menuContainer: {
        position: "absolute",
        top: 40,
        right: 10,
        backgroundColor: "#222",
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        zIndex:1000
    },
    menuItem: {
        paddingVertical: ms(8),
        flexDirection: "row",
        alignItems: "center"
    },
    menuText: {
        color:Colors.dt_white,
        fontSize:ms(12),
        fontFamily:Fonts.Font_600,
        marginLeft: ms(5)
    },
    dt_livestream_play:{
        width:"100%",
        height:"100%",
        alignContent:"center",
        justifyContent:"center",
    },
    dt_livestream_play_icon:{
        backgroundColor:Colors.dt_border + "87", 
        alignSelf:"center",
        width:ms(50),
        height:ms(50),
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center",
        top:ms(-20)
    },
    dt_btn_container:{
        flexDirection:"row",
        justifyContent:"flex-end",
        gap:ms(10)
    }
})
