import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const SubscriptionScreenStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_content_header: {
        gap: ms(5)
    },
    dt_content_header_text: {
        fontSize: ms(20),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600,
        textAlign: "center"
    },
    dt_content_header_subtext: {
        fontSize: ms(13),
        color: Colors.dt_gray,
        fontFamily: Fonts.Font_600,
        textAlign: "center"
    },
    dt_subscription_info_card: {
        width: "100%",
        padding: ms(12),
        backgroundColor: Colors.dt_gray + "33",
        borderRadius: ms(5),
        marginTop: ms(15),
        gap: ms(5)
    },
    dt_info_header_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(13),
        color: Colors.dt_white
    },
    dt_info_text_container: {
        gap: ms(10),
        marginTop: ms(10)
    },
    dt_info_text: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(13),
        color: Colors.dt_gray,
        lineHeight: ms(19)
    },
    dt_advantage_container: {
    },
    dt_advantage_header_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(20),
        color: Colors.dt_white,
        marginTop: ms(20)
    },
    dt_advantage_card: {
        width: ms(250),
        height: ms(100),
        backgroundColor: "red"
    },
    dt_images_wrapper: {
        flexDirection: "row",
        gap: ms(10),
        marginTop: ms(16)
    },
    dt_image_container: {
        width: ms(250),
        padding: ms(10),
        borderRadius: ms(8),
        overflow: "hidden",
        backgroundColor: Colors.dt_gray + "33",
    },
    dt_image_text_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(8),
    },
    dt_image_text: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(13),
        color: Colors.dt_gray
    },
    dt_text_header: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(13),
        color: Colors.dt_white,
        marginBottom: ms(3),
        textTransform: "uppercase"
    },                                                                                          
    dt_plan_header_text:{
        fontFamily: Fonts.Font_600,
        fontSize: ms(17),
        color: Colors.dt_white
    },
    dt_price_text:{
        fontFamily: Fonts.Font_700,
        fontSize: ms(21),
        color: Colors.dt_success_green
    }
})
