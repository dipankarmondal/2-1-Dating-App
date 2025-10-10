import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";

export const EditContentStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_profile_header_text: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white,
        textTransform: "uppercase"
    },
    dt_form_container: {
        marginVertical: ms(10),
        paddingBottom:ms(50)
    },
    dt_multibuttons_container: {
        borderRadius: ms(8),
        borderWidth: ms(1),
        borderColor: Colors.dt_gray,
        marginVertical:ms(5),
        marginBottom:ms(15),
        backgroundColor:Colors.dt_border
    },
    dt_multibuttons:{
        marginTop:ms(10),
    },
    button: {
        borderRadius: ms(50),
        paddingVertical: ms(6),
        paddingHorizontal: ms(8),
        marginRight: ms(10),
        borderWidth: ms(1),
        borderColor: Colors.dt_gray
    },
    buttonText: {
        color: Colors.dt_white,
        fontSize: ms(12),
        fontFamily: Fonts.Font_400
    },
    dt_multibuttons_text:{
        color: Colors.dt_white,
        fontSize: ms(14),
        fontFamily: Fonts.Font_500
    },
    dt_dropdown_container: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        width: "100%"
    },
})
