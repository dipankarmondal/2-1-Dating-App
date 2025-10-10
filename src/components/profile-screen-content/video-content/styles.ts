import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const VideoContentStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_btn_container: {
        width: "100%",
        height: ms(40),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ms(50),
        backgroundColor: Colors.dt_card_blue
    },
    dt_text: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white
    },
    dt_video_wrapper: {
        flex: 1,
        gap: ms(16),
        marginTop: ms(20)
    },
    dt_video_container: {
        width: "100%",
        height: ms(170),
        borderRadius: ms(10),
        overflow: "hidden",
    },
    dt_image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    dt_overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    dt_play_icon: {
        width: ms(45),
        height: ms(45),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_white + "A6",
        alignItems: "center",
        justifyContent: "center"
    },
    dt_info_container: {
        position: "absolute",
        top: ms(5),     // distance from top
        right: ms(5),
        padding:ms(5),
        flexDirection:"row",
        alignItems:"center",
        gap:ms(5),
    },
    dt_view_wrapper:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(5),
        backgroundColor:Colors.dt_black + "85",
        paddingHorizontal:ms(5),
        paddingVertical:ms(5),
        borderRadius:ms(50)
    },
    dt_view_text:{
        fontSize:ms(12),
        fontFamily:Fonts.Font_500,
        color:Colors.dt_white
    },
    dt_delete_wrapper:{
        width:ms(25),
        height:ms(25),
        borderRadius:ms(50),
        backgroundColor:Colors.dt_error,
        alignItems:"center",
        justifyContent:"center"
    }
})
