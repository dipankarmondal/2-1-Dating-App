import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const LivestreamScreenStyles = StyleSheet.create({
    dt_stream_info: {
        marginTop: ms(8)
    },
    dt_stream_title: {
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white,
        fontSize: ms(14),
        textTransform: "capitalize"
    },
    dt_stream_description: {
        fontFamily: Fonts.Font_500,
        color: Colors.dt_gray,
        fontSize: ms(12)
    },
    dt_stream_tags: {
        flexDirection: "row",
        gap: ms(5),
        marginTop: ms(5)
    },
    dt_stream_tag_item: {
        backgroundColor: Colors.dt_card_blue,
        paddingHorizontal: ms(9),
        paddingVertical: ms(3),
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center"
    },
    dt_stream_tag_text: {
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white,
        fontSize: ms(13),
        textTransform: "capitalize"
    },
    dt_profile_content: {
        backgroundColor: Colors.dt_bg,
        borderRadius: ms(50),
        padding: ms(5),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dt_button_two: {
        paddingHorizontal: ms(12),
        paddingVertical: ms(5),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_gray + '33',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: ms(8)
    },
    dt_profile_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_view_content: {
        backgroundColor: Colors.dt_bg,
        borderRadius: ms(50),
        padding: ms(5),
        width: ms(65),
        flexDirection: "row",
        gap: ms(5),
        alignItems: "center",
        justifyContent:"space-evenly",
        position:"absolute",
        right:ms(0),
        top:ms(-25)
    },
    dt_view_text:{
        fontSize:ms(11),
        fontFamily:Fonts.Font_700,
        color:Colors.dt_white
    },
    dt_live_status:{
        width:ms(10),
        height:ms(10),
        backgroundColor:"#b1ffb1",
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center"
    },
    dt_live_status_dot:{
        width:ms(6),
        height:ms(6),
        backgroundColor:Colors.dt_success_green,
        borderRadius:ms(50)
    }

})
