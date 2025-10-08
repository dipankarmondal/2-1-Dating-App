import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const WallOfFameCardstyles = StyleSheet.create({
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
    dt_profile_content: {
        backgroundColor: Colors.dt_bg,
        borderRadius: ms(50),
        padding: ms(5),
        flexDirection: "row",
        justifyContent: "space-between",
        // alignSelf: "flex-start"
    },
    dt_button_two: {
        paddingHorizontal: ms(10),
        paddingVertical: ms(5),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_white,
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
    dt_bio_container: {
        marginTop: ms(10),
        paddingBottom: ms(5)
    },
    dt_name: {
        fontSize: ms(18),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_error,
        textTransform: "uppercase",
        marginVertical: ms(5)
    },
    dt_age_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(5),
    },
    dt_location_container: {
        marginTop: ms(5),
        maxWidth: ms(300),
        width: ms(200),
        justifyContent: "flex-end"
    },
    dt_intrest_container: {
        marginTop: ms(8),
        
    },
    dt_intrest_text: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
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
    dt_location_text: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        textAlign: "right",
    },
    dt_name_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical:ms(8)
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
})
