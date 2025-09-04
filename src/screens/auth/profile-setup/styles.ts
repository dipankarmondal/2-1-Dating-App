import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const ProfileSetupStyles = StyleSheet.create({
    dt_container: { marginTop: ms(-15) },
    dt_business_signup: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
        color: Colors.dt_white,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: Colors.dt_white,
        marginBottom: ms(20)
    }
})
