import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const TravelDateScreenStyles = StyleSheet.create({
    dt_intrest: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
    },
    dt_intrest_container: {
        marginTop: ms(8),
    },
    dt_age_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(5),
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
    dt_location_container: {
        marginTop: ms(5),
        maxWidth: ms(300),
        width: ms(200),
        justifyContent: "flex-end"
    },
})
