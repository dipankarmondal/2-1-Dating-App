import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const AlbumContentStyles = StyleSheet.create({
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
    dt_album_wrapper: {
        flex: 1,
        marginTop: ms(16),
        gap:ms(10)
    },
    dt_album_container: {
        width: "100%",
        height: ms(170),
        borderRadius: ms(8),
        overflow: "hidden"
    },
    dt_image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    dt_album_name: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        marginBottom:ms(5)
    },
    dt_overlay:{
        position: "absolute",
        width:"100%",
        height: "100%",
        padding:ms(10),
        flexDirection:"row",
        justifyContent:"space-between"
    },
    dt_icon_container:{
        width:ms(25),
        height:ms(25),
        borderRadius:ms(50),
        backgroundColor:Colors.dt_border + "63",
        alignItems:"center",
        justifyContent:"center"
    },
    dt_count_container:{
        flexDirection:"row",
        gap:ms(8),
        alignSelf:"flex-start",
        backgroundColor:Colors.dt_border + "9C",
        borderRadius:ms(50),
        paddingHorizontal:ms(10),
        paddingVertical:ms(4)
    },
    dt_info_container:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(5)
    },
    dt_delete_container:{
        width:ms(25),
        height:ms(25),
        borderRadius:ms(50),
        backgroundColor:Colors.dt_error + "C9",
        alignItems:"center",
        justifyContent:"center",
    },
    dt_count_text:{
        fontSize:ms(13),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_white
    }
})
