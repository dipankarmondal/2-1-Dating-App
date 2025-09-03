import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const PhoneInputStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dt_border,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.dt_gray,
        height: ms(45),
    },
    input: {
        color: Colors.dt_white,
        fontFamily: Fonts.Font_500,
        fontSize: ms(15),
    },
    flagContainer: {
        backgroundColor: Colors.dt_border,
        paddingHorizontal: 6,
        borderRadius: 6,
    },
    flag: {
        fontSize: 20,
    },
    callingCode: {
        color: Colors.dt_white,
        fontSize: 16,
        fontFamily: Fonts.Font_500,
    },
    divider: {
        backgroundColor: Colors.dt_white,
        width: 1,
    },
    caret: {
        color: Colors.dt_white,
        fontSize: 18,
    },
    error: {
        color: Colors.dt_error,
        fontSize: ms(13),
        paddingTop: ms(4),
        fontFamily: Fonts.Font_600
    },
})


export const ModalStyles = StyleSheet.create({
    backdrop: {
        backgroundColor: "transparent", // dark overlay
    },
    container: {
        backgroundColor: "transparent", // 🔴 dark red modal background
        borderRadius: 16,
        padding: 12,
    },
    searchContainer: {
        backgroundColor: Colors.dt_white, // white search bar
        borderRadius: 8,
        marginBottom: 10,
    },
    searchInput: {
        color: Colors.dt_black, // black search text
        fontSize: ms(15),
        fontFamily: Fonts.Font_500
    },
    countryName: {
        color: Colors.dt_black, // white country name
        fontSize: 16,
        fontFamily: Fonts.Font_500
    },
    callingCode: {
        color: Colors.dt_black, // 🌟 yellow calling code
        fontSize: ms(15),
        fontFamily: Fonts.Font_500
    },
    flag: {
        fontSize: 22, // bigger flag emoji
    },
    closeButton: {
        marginTop: 10,
        alignSelf: "flex-end",
    },
    closeButtonText: {
        color: "red",
        fontSize: 16,
        fontWeight: "700",
    },
    countryNotFoundMessage: {
        color: "red",
        fontSize: 16,
    },
})
