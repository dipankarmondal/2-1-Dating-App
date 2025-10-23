import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const SingleGroupScreenstyles = StyleSheet.create({
    dt_user_info_card: {
        width: "100%",
        padding: ms(12),
        backgroundColor: Colors.dt_gray + "33",
        borderRadius: ms(5),
    },
    dt_intrest: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
        },
         dt_intrest_container: {
            marginTop: ms(8),
    
        },
        dt_intrest_text: {
            fontSize: ms(15),
            fontFamily: Fonts.Font_600,
            color: Colors.dt_white
        },
        dt_age_container: {
            flexDirection: "row",
            alignItems: "center",
            gap: ms(5),
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
        dt_age: {
            flexDirection: "row",
            alignItems: "center",
        },
        dt_age_text: {
            fontSize: ms(16),
            fontFamily: Fonts.Font_600,
            color: Colors.dt_white
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
})
