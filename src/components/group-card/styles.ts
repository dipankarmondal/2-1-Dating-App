import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";

export const GroupCardStyles = StyleSheet.create({
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
    dt_overlay:{
        position: "absolute",
        width: ms(50),
        height: ms(30),
        backgroundColor: Colors.dt_white,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: ms(5),
        opacity: 0.5,
        top: 0,
        right:0
    },
    dt_join_text:{
        fontSize: ms(15),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_black
    },
    dt_name: {
        fontSize: ms(18),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_primary_green,
        textTransform: "uppercase",
        marginVertical: ms(5)
    },
     dt_age_container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
       dt_intrest_text: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
     dt_intrest_container: {
        marginTop: ms(8),
    },
     dt_location_container: {
        marginTop: ms(5),
        maxWidth: ms(300),
        width: ms(200),
        justifyContent: "flex-end"
    },
    dt_location_text: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        textAlign: "right",
    },
    dt_member_box:{
        flexDirection: "row",
        alignItems: "center",
        gap: ms(8)
    },
    dt_member_text:{
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    }
})
