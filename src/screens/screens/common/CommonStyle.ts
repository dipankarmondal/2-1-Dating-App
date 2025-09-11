import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const CommonStyles = StyleSheet.create({
    dt_container: {
        padding: spacing.md,
        paddingBottom: ms(70),
        gap: ms(16),
        flex: 1,
    },
    dt_overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: ms(-200),
        width: ms(30),
        height: ms(30),
        borderRadius: ms(50),
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    dt_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(17),
        color: Colors.dt_border,
    },
    dt_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(13),
        color: Colors.dt_border,
    },
    dt_title_container: {
        marginRight: ms(2),
        paddingHorizontal: ms(10),
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    dt_tab_title: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(14),
        color: Colors.dt_white
    },
    dt_header: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%"
    },
    dt_filter: {
        borderRadius: ms(50),
        borderWidth: ms(1.2),
        borderColor: Colors.dt_card_blue,
        alignItems: "center",
        paddingHorizontal: ms(8),
        paddingVertical: ms(5),
    },
    dt_filter_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(12),
        color: Colors.dt_card_blue
    },
    dt_header_title: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(17),
        color: Colors.dt_white,
        textTransform:"capitalize"
    },
})
