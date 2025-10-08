import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";

export const VideoCardsStyles = StyleSheet.create({
    dt_user_info_card: {
        width: "100%",
        padding: ms(12),
        backgroundColor: Colors.dt_gray + "33",
        borderRadius: ms(5),
    },
    dt_image_container: {
        width: "100%",
        height: ms(220),
        borderRadius: ms(5),
        overflow: "hidden"
    },
    dt_image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
    },
    dt_info_container: {
        marginTop: ms(10)
    },
    dt_name_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dt_name: {
        fontSize: ms(18),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_white,
        textTransform: "uppercase"
    },
    dt_bio_container: {
        marginTop: ms(10),
        paddingBottom: ms(5)
    },
    dt_age_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(5)
    },
    dt_age: {
        flexDirection: "row",
        alignItems: "center",
    },
    dt_age_text: {
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_intrest: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap"
    },
    dt_intrest_container: {
        marginTop: ms(8),
    },
    dt_intrest_text: {
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_location_text: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        textAlign: "right",
    },
    dt_location_container: {
        marginTop: ms(5),
        maxWidth: ms(300),
        width: ms(200),
        justifyContent: "flex-end"
    },
    dt_button_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: ms(8)
    },
    dt_button: {
        width: ms(35),
        height: ms(35),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_white,
        alignItems: "center",
        justifyContent: "center",
    },
    dt_views: {
        fontSize: ms(13),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_error
    },
    dt_image_overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: ms(10),
    },
    dt_btn_container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: ms(10)
    },
    dt_more_container: {
        width: ms(25),
        height: ms(25),
        backgroundColor: Colors.dt_border + "63",
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",
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
    dt_play_box:{
        flexGrow:1, 
        alignItems:"center", 
        justifyContent:"center"
    },
    dt_play_button:{
        width:ms(40),
        height:ms(40),
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colors.dt_white
    }
})
