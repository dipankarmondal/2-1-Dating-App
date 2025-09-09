import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const NotificationCardStyles = StyleSheet.create({
   dt_container: {
        flex: 1,
        gap: ms(16),
    },
    dt_container_list: {
        backgroundColor: Colors.dt_gray + "33",
        padding: ms(10),
        borderRadius: ms(10),
        flexDirection: "row",
    },
    dt_icon_container: {
        width: ms(40),
        height: ms(40),
        backgroundColor: Colors.dt_white + "6B",
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",
    },
    dt_overlay: {
        position: "absolute",
        top: "48%",
        left: "49%",
        width: ms(8),
        height: ms(8),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_primary_green,
        transform: [
            { translateX: -ms(-3) }, // half of width
            { translateY: -ms(10) }  // half of height
        ],
    },
    dt_info_container: {
        marginLeft: ms(10),
        flex: 1,
    },
    dt_info_title: {
        color: Colors.dt_white,
        fontSize: ms(15),
        fontFamily: Fonts.Font_500,
        textTransform: "capitalize"
    },
    dt_info_text: {
        color: Colors.dt_white,
        fontSize: ms(12),
        fontFamily: Fonts.Font_500,
        flexShrink: 1,
        marginTop: ms(3)
    },
    dt_info_header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dt_info_date: {
        color: Colors.dt_card_blue,
        fontSize: ms(12),
        fontFamily: Fonts.Font_600
    }
})
