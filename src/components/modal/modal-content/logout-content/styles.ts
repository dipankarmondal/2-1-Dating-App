import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../../utils/constant/Constant";
import { ms } from "react-native-size-matters";

export const LogoutContentStyles = StyleSheet.create({
    dt_logout_text: {
        fontSize: ms(17),
        marginBottom: ms(10),
        textAlign:"center",
        color: Colors.dt_white,
        fontFamily: Fonts.Font_700,
        maxWidth: ms(300),
        alignSelf: 'center'
    },
    dt_logout_confirm_button: {
        backgroundColor: Colors.dt_error,
        height: ms(40),
        paddingHorizontal:ms(10),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width:"48%"
    },
    dt_cancel_button: {
        backgroundColor: Colors.dt_gray + "33",
        height: ms(40),
        paddingHorizontal:ms(10),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width:"48%"
    },
    dt_button_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical:ms(10)
    },
    dt_btn_text:{
        fontFamily:Fonts.Font_700,
        fontSize:ms(14),
        color:Colors.dt_white
    },
})
