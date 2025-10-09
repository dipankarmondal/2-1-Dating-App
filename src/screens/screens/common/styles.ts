import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms, spacing } from "../../../utils/helpers/responsive";

export const ScreenLayoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dt_bg
    },
    dt_header: {
        width: "100%",
        height: ms(55),
        backgroundColor: Colors.dt_border,
        paddingHorizontal: ms(16),
        elevation: 3,
        shadowColor: Colors.dt_white,
        zIndex: 1000,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dt_menu_container: {
        width: ms(35),
        height: ms(35),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_gray + "33",
        alignItems: "center",
        justifyContent: "center",
    },
    dt_right_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(10)
    },
    dt_left_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(10)
    },
    dt_header_title: {
        fontSize: ms(18),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        textTransform:"capitalize"
    }
})

