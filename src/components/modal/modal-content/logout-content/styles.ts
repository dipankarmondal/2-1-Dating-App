import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../../utils/constant/Constant";
import { ms } from "react-native-size-matters";

export const LogoutContentStyles = StyleSheet.create({
    dt_logout_text: {
        fontSize: ms(20),
        marginBottom: ms(20),
        textAlign:"center",
        color: Colors.dt_black,
        fontFamily: Fonts.Font_700,
        maxWidth: ms(300),
        alignSelf: 'center'
    },
    dt_logout_confirm_button: {
        backgroundColor: Colors.dt_error,
        height: ms(45),
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dt_cancel_button: {
        backgroundColor: Colors.dt_gray + "33",
        height: ms(45),
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dt_button_container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dt_btn_text:{
        fontFamily:Fonts.Font_700,
        fontSize:ms(16),
    },
})
