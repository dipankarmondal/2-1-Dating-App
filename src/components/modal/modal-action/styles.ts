import { StyleSheet } from "react-native";
import { ms } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const ModalActionStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom: ms(-2)
    },
    modalContainer: {
        backgroundColor: Colors.dt_border,
        borderTopLeftRadius: ms(20),
        borderTopRightRadius: ms(20),
        maxHeight: '70%',   // instead of fixed ms(600)
        minHeight: ms(150),
    },
    modalTitle: {
        fontSize: ms(17),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_white,
    },

    ml_modal_header: {
        borderBottomWidth: ms(.8),
        borderColor: Colors.dt_gray + "17",
        paddingHorizontal: ms(16),
        paddingVertical: ms(15),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    ml_close_button: {
        width: ms(30),
        height: ms(30),
        backgroundColor: Colors.dt_gray + "17",
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",
    },
    ml_messahe_close_button: {
        width: ms(35),
        height: ms(35),
        backgroundColor: Colors.dt_card_blue,
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: ms(10)
    },
    ml_modal_body: {
        padding: ms(16),
    },
    ml_title_container: {
        flexDirection: "row",
        alignItems: "center"
    },
    dt_icon_box: {
        marginLeft: ms(15),
        width: ms(30),
        height: ms(30),
        backgroundColor: Colors.dt_gray + "17",
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",
    },
    submitButton: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 16,
        backgroundColor: "transparent", // or your modal background
    }
})
