import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../../utils/constant/Constant";
import { ms } from "../../../../utils/helpers/responsive";

export const ChatScreenStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        backgroundColor: Colors.dt_bg
    },
    dt_message_container: {
        flex: 1,
    },
    dt_messageContainer: {
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 8,
        maxWidth: '80%'
    },
    dt_myMessage: {
        backgroundColor: Colors.dt_card_blue,
        alignSelf: 'flex-end',
        borderTopRightRadius: ms(0),
        marginRight: ms(15)
    },
    dt_typing_Container: {
        backgroundColor: Colors.dt_card_blue,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: ms(2),
        borderTopLeftRadius: ms(0),
    },
    dt_otherMessage: {
        backgroundColor: Colors.dt_success_green,
        alignSelf: 'flex-start',
        borderTopLeftRadius: ms(0),
        marginLeft: ms(15)
    },
    dt_messageText: {
        fontSize: ms(14),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_500,
    },
    dt_timestamp: {
        fontSize: ms(10),
        color: '#999',
        marginTop: 3,
        textAlign: 'right',
        fontFamily: Fonts.Font_600
    },
    dt_inputContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: Colors.dt_border,
        alignItems: 'flex-end',
    },
    dt_group_username: {
        marginBottom: ms(5),
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
        color: Colors.dt_black,
        marginTop: ms(-5)
    },
    dt_input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 8,
        maxHeight: ms(100),
        minHeight: ms(42),
        color: Colors.dt_white,
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        marginHorizontal: ms(8)
    },
    dt_sendButton: {
        backgroundColor: Colors.dt_gray + "33",
        width: ms(40),
        height: ms(40),
        borderRadius: ms(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    dt_sendButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    dt_buttons: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(10),
        paddingVertical: ms(10),
    },
    dt_btn_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
        color: Colors.dt_white
    },
    dt_modal_input_Container: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(10),
        marginVertical: ms(20)
    },
    dt_modal_input_wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    // chat header style
    dt_menu_container: {
        width: ms(35),
        height: ms(35),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_gray + "33",
        alignItems: "center",
        justifyContent: "center",
    },
    dt_menu_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(10)
    },
    dt_messenger_wrapper: {
        backgroundColor: Colors.dt_gray + "33",
        borderRadius: ms(8),
        width: "100%",
        padding: ms(10),
        flexDirection: "row",
        alignItems: "center",
        gap: ms(15)
    },
    dt_admin_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
        color: Colors.dt_white
    },
    dt_image_container: {
        width: ms(45),
        height: ms(45),
        borderRadius: ms(50),
    },
    dt_image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: ms(50),
    },
    dt_text_container: {
        flex: 1
    },
    dt_name_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dt_name: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(16),
        color: Colors.dt_white
    },
    dt_text: {
        fontFamily: Fonts.Font_500,
        fontSize: ms(12),
        color: Colors.dt_gray,
        marginTop: ms(3)
    },
    dt_location_wrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(5)
    },
    dt_line: {
        width: "100%",
        height: ms(1),
        backgroundColor: Colors.dt_gray + "33",
        marginTop: ms(5)
    },
    dt_timestampContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: ms(1)
    },
    dt_image_Container: {
        width: "100%",
        height: ms(250),
        borderRadius: ms(8),
        overflow: "hidden",
        backgroundColor: Colors.dt_gray + "33"
    },
    dt_image_modal: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    dt_video_Container: {
        width: ms(230),
        height: ms(180),
        borderRadius: ms(15),
        backgroundColor: Colors.dt_gray + "7A",
        alignItems: "center",
        justifyContent: "center"
    },
    dt_group_image_container: {
        width: ms(30),
        height: ms(30),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_gray + "33",
        marginLeft: ms(8),
        marginRight: ms(0),
        marginTop: ms(2),
        overflow: "hidden"
    },
    dt_group_image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    dt_pyramidContainer: {
        position: "absolute",
        transform: [{ rotate: "180deg" }],
        left: ms(-5),
        top: ms(-0.2),
    },
    dt_chat_user: {
        position: "absolute",
        transform: [{ rotate: "180deg" }],
        right: ms(-5)
    },
    dt_wrapper: {
        width: "100%",
        alignItems: "center",  
        justifyContent: "center",
        marginTop: ms(30)
    },
    dt_group_image_container_wrapper: {
        width: ms(120),
        height: ms(120),
        backgroundColor: Colors.dt_gray + "78",
        borderRadius: "100%",
        padding:ms(5),
    },
    dt_group_image_wrapper: {
        width: "100%",
        height: "100%",
        borderRadius: "100%",
        overflow: "hidden",
    },
    dt_group_description:{
        fontFamily:Fonts.Font_500,
        fontSize:ms(12),
        color:Colors.dt_white
    }

})
