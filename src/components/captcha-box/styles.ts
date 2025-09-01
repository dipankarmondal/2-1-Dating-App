import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";

export const CaptchaBoxstyles = StyleSheet.create({
    captchaContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 5,
    },
    captchaBox: {
        borderWidth: 1,
        borderColor: Colors.dt_gray,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    captchaText: {
        color: Colors.dt_white,
        fontSize: ms(15),
        fontFamily:Fonts.Font_600
    },
    equals: {
        color: Colors.dt_white,
        fontSize: ms(16),
        marginHorizontal: ms(10),
    },
    captchaInput: {
        borderWidth: 1,
        borderColor: Colors.dt_gray,
        fontFamily:Fonts.Font_600,
        borderRadius: 6,
        width: 60,
        textAlign: "center",
        padding: 8,
        color: Colors.dt_white,
    },
    errorText: {
        color: Colors.dt_error,
        fontSize: ms(13),
        fontFamily:Fonts.Font_600
    },
})
