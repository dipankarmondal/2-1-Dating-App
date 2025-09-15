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
        alignSelf: 'flex-end'
    },
    dt_otherMessage: {
        backgroundColor: Colors.dt_card_blue,
        alignSelf: 'flex-start'
    },
    dt_messageText: {
        fontSize: ms(14),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_500,

    },
    dt_timestamp: {
        fontSize: ms(9),
        color: '#999',
        marginTop: 3,
        textAlign: 'right',
        fontFamily: Fonts.Font_500
    },
    dt_inputContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: Colors.dt_border,
        alignItems: 'flex-end',
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
        fontFamily: Fonts.Font_600
    },
    dt_sendButton: {
        marginLeft: 5,
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
    },
    dt_modal_input_wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
