import { StyleSheet } from "react-native";
import { ms } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const ModalActionStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: ms(20),
        borderTopRightRadius: ms(20),
        maxHeight: ms(600),
    },
    modalTitle: {
        fontSize: ms(18),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_black,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingVertical: ms(8),
        paddingHorizontal: ms(12),
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
    ml_modal_body: {
        padding: ms(16),
    }
})
