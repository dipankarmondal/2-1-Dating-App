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
    }
})
