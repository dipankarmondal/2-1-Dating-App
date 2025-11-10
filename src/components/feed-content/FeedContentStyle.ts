import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const FeedContentStyles = StyleSheet.create({
    dt_user_info_card: {
        width: "100%",
        padding: ms(12),
        backgroundColor: Colors.dt_gray + "33",
        borderRadius: ms(5),
    },
    dt_image_container: {
        width: "100%",
        height: ms(220),
        borderRadius: ms(5),
        overflow: "hidden"
    },
    dt_image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
    },
    dt_info_container: {
        marginTop: ms(10)
    },
    dt_name_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dt_name: {
        fontSize: ms(17),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_white,
        textTransform: "uppercase",
        flexShrink: 1
    },
    dt_button_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: ms(8)
    },
    dt_button: {
        width: ms(35),
        height: ms(35),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_white,
        alignItems: "center",
        justifyContent: "center",
    },
    dt_bio_container: {
        marginTop: ms(10),
        paddingBottom: ms(5)
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
    dt_intrest: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap"
    },
    dt_intrest_container: {
        marginTop: ms(8),

    },
    dt_intrest_text: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_intrest_text_empty: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_gray
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
    dt_profile_content: {
        backgroundColor: Colors.dt_bg,
        borderRadius: ms(50),
        padding: ms(5),
        flexDirection: "row",
        justifyContent: "space-between",
        // alignSelf: "flex-start"
    },
    dt_button_two: {
        paddingHorizontal: ms(12),
        paddingVertical: ms(5),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_white,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: ms(8)
    },
    dt_profile_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_overlay: {
        position: "absolute",
        transform: [{ translateX: -ms(0) }],
        left: "50%",
        bottom: ms(-22),
        width: ms(30),
        height: ms(30),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_card_blue,
        alignItems: "center",
        justifyContent: "center",
    },
    dt_image_overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: ms(10),
    },
    dt_more_container: {
        width: ms(25),
        height: ms(25),
        backgroundColor: Colors.dt_border + "63",
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",

    },
    dt_icon_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    // Group info card
    dt_header_container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dt_group_image_container:{
        flex:1,
        height:ms(50)
    },
    dt_apply_button: {
        paddingHorizontal: ms(18),
        paddingVertical: ms(8),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_card_blue,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: ms(8)
    },
    dt_apply_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },

    //Event card
    dt_event_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(10)
    },
    dt_event_image_container: {
        width: "48%",
        height: ms(50),
        borderRadius: ms(5),
        overflow: "hidden"
    },
    dt_event_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_event_location_text: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_gray,
        marginTop: ms(5)
    },
    dt_event_info_container: {
        width: "100%",
        marginTop: ms(10)
    },
    dt_event_header: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dt_event_button: {
        width: "100%",
        paddingVertical: ms(10),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_card_blue,
        alignItems: "center",
        marginTop: ms(15),
        marginBottom: ms(10)
    },
    dt_event_button_text: {
        fontSize: ms(16),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    dt_event_button_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dt_deny_btn: {
        backgroundColor: Colors.dt_error,
        width: "48%",
        marginTop: ms(0)
    },
    dt_accept_btn: {
        width: "48%",
        marginTop: ms(0)
    },
    dt_birthday_container: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: ms(10)
    },
    dt_birthday_icon_container: {
        width: ms(50),
        height: ms(50),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_gray + "33",
        alignItems: "center",
        justifyContent: "center"
    },
    dt_text: {
        fontSize: ms(18),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        marginTop: ms(10),
        textTransform: "capitalize"
    },
    dt_live_info_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(5)
    },
    dt_travel_text: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white,
        marginVertical: ms(5)
    },
    dt_travel_time_text: {
        fontSize: ms(12),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_error
    },
    dt_check_button: {
        width: ms(30),
        height: ms(30),
        borderRadius: ms(10), 
        borderWidth: 1,
        borderColor: Colors.dt_white,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    acceptButton: {
        backgroundColor: Colors.dt_success_green,
        width:"48%",
        borderRadius: 5,
        paddingVertical: ms(7)
    },
    rejectButton: {
        backgroundColor: Colors.dt_error,
        width:"48%",
        borderRadius: 5,
        paddingVertical: ms(7)
    },
    buttonText: {
        color: Colors.dt_white,
        fontSize: ms(16),
        textAlign: "center",
        fontFamily: Fonts.Font_600
    },
})
