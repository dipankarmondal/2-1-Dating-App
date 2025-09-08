import { StyleSheet } from "react-native"
import { ms } from "../helpers/responsive"

export const Fonts = {
    Font_100: 'DMSans-Thin',
    Font_200: 'DMSans-ExtraLight',
    Font_300: 'DMSans-Light',
    Font_400: 'DMSans-Regular',
    Font_500: "DMSans-Medium",
    Font_600: 'DMSans-SemiBold',
    Font_700: 'DMSans-Bold',
    Font_800: 'DMSans-Black',
}

export const Colors = {
    dt_white: '#FFFFFF',
    dt_black: '#000000',
    dt_primary_green: "#00E396",
    dt_light_purple: "#B9B6F6",
    dt_coin_yellow: "#FFB800",
    dt_error: "#B8001F",
    dt_bg: "#050A30",
    dt_card_blue: "#0b5ed7",
    dt_success_green: "#35C759",
    dt_border: "#0B103D",
    dt_gray: "#808080"
}

export const FormStyle = StyleSheet.create({
    input_wrap: {
        marginBottom: ms(10),
    },
    FormLabel: {
        color: Colors.dt_black,
        fontFamily: Fonts.Font_600,
        fontSize: ms(17),
        marginBottom: ms(5),
    },
    wrapper: {
        height: ms(45),
        borderRadius: ms(10),
        flexDirection: "row",
        alignItems: "center",
        borderWidth: ms(2),
        borderColor: Colors.dt_gray,
    },
    input_field: {
        paddingHorizontal: ms(15),
        color: Colors.dt_white,
        fontSize: ms(17),
        fontFamily: Fonts.Font_600,
    },
    error: {
        color: Colors.dt_error,
        fontSize: ms(13),
        paddingTop: ms(4),
        fontFamily: Fonts.Font_600
    },
    textarea: {
        height: ms(100),
        textAlignVertical: "top"
    },

    
})
