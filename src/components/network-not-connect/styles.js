import { StyleSheet } from "react-native";
import { ms, spacing } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const ConnectionStyles = StyleSheet.create({
    seofline_container: {
        flex: 1,
        backgroundColor: Colors.dt_bg,
        padding:spacing.md
    },
    seinternet_box:{
        width:ms(230),
        height:ms(230),
    },
    se_header_container: {
        alignItems: "center",
        justifyContent: "center",
    },
    se_header: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(18),
        textTransform: "capitalize",
        color: Colors.dt_white
    },
    se_sub_header: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(15),
        color: Colors.dt_gray + "F7",
        textAlign: "center",
        lineHeight: ms(22),
        marginTop: ms(10)
    },
    se_reload: {
        height: ms(51),
        backgroundColor: Colors.dt_card_blue,
        borderRadius: ms(8),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: ms(16),
        width: "100%"
    },
    se_retry: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(16),
        color: Colors.dt_white
    }

})