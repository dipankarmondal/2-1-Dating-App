import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const AlbumShowScreenStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_btn_container: {
        width: "48%",
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
    dt_album_wrapper:{
        flex:1,
        marginTop:ms(20),
        gap:ms(16)
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
    dt_overlay:{
        position: "absolute",
        width:"100%",
        height: "100%",
        padding:ms(10),
        flexDirection:"row",
        justifyContent:"space-between"
    },
    dt_delete_container:{
        width:ms(25),
        height:ms(25),
        borderRadius:ms(50),
        backgroundColor:Colors.dt_error + "C9",
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        top:ms(10),
        right:ms(10)
    },
       dt_play_icon: {
        width: ms(45),
        height: ms(45),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_white + "A6",
        alignItems: "center",
        justifyContent: "center"
    },
    dt_btn_wrapper:{
        flexDirection:"row",
        alignItems:"center",
        gap:ms(10)
    },
    dt_center: {
    alignItems: 'center',
    justifyContent: 'center',
},
})
