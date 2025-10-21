import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const ChatroomCardStyles = StyleSheet.create({
  dt_room_container: {
        width: "100%",
        padding: ms(10),
        borderRadius: ms(8),
        backgroundColor: Colors.dt_gray + "33",
        flexDirection: "row",
        gap: ms(20)
    },
    dt_room_image: {
        width: ms(130),
        height: ms(110),
        borderRadius: ms(8),
        overflow: "hidden"
    },
    dt_image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    dt_room_info: {
        marginTop: ms(10),
        flex: 1,
        justifyContent: "space-between"
    },
    dt_room_name: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(20),
        color: Colors.dt_white
    },
    dt_room_member: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(15),
        color: Colors.dt_white,
        marginTop: ms(5)
    },
    dt_button:{
        backgroundColor:Colors.dt_card_blue,
        paddingVertical:ms(7),
        alignItems:"center",
        justifyContent:"center",
        borderRadius:ms(50)
    },
    dt_button_text:{
        fontFamily:Fonts.Font_700,
        fontSize:ms(15),
        color:Colors.dt_white
    },
    dt_image_overlay:{
        position:"absolute",
        width:"100%",
        height:ms(30),
        backgroundColor:Colors.dt_white + "7D",
        alignItems:"center",
        justifyContent:"center",
    },
    dt_group_container:{
        paddingHorizontal:ms(10),
        paddingVertical:ms(5),
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"space-evenly",
        flexDirection:"row",
        backgroundColor:Colors.dt_bg
    },
    dt_group_text:{
        fontSize:ms(13),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_white,
        marginLeft:ms(5)
    }
})
