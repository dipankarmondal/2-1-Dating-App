import { StyleSheet } from "react-native";
import { ms } from "../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../utils/constant/Constant";


export const CustomDrawerStyles = StyleSheet.create({
    header: {
        paddingLeft: ms(16),
        paddingVertical: ms(16),
        paddingRight: ms(5),
        width: "100%",
        backgroundColor: Colors.dt_border,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: ms(1),
        borderColor: Colors.dt_white,
        zIndex: 1000
    },
    sa_avatar: {
        width: ms(75),
        height: ms(75),
        borderRadius: ms(50),
        backgroundColor: Colors.dt_white,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    sa_img: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    dt_right_container: {
        marginLeft: ms(10),
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dt_edit:{
        width:ms(30),
        height:ms(30),
        borderRadius:ms(50),
        backgroundColor:Colors.dt_gray + "33",
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        fontSize: ms(17),
        fontFamily: Fonts.Font_700,
        color: Colors.dt_white,
        textTransform: "capitalize"
    },
    dt_number: {
        fontFamily: Fonts.Font_700,
        fontSize: ms(15),
        color: Colors.dt_white,
        marginTop: ms(2)
    },
    scrollContainer: {
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 2,
    },
    itemActive: {
        backgroundColor: Colors.dt_white,
        borderRadius:ms(50),
        paddingLeft: 16,
    },
    label: {
        marginLeft: 8,
        fontSize: ms(15),
        fontFamily: Fonts.Font_600,
        color: Colors.dt_white
    },
    labelActive: {
        color: Colors.dt_black,
        fontFamily: Fonts.Font_700
    },
    logout: {
        height: ms(40),
        backgroundColor: Colors.dt_error + "DE",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin:ms(10),
        borderRadius: ms(50)
    },
    logoutText: {
        color: Colors.dt_white,
        textAlign: 'center',
        fontFamily: Fonts.Font_700,
        fontSize: ms(15),
        marginLeft: ms(10)
    },
    dt_cancel_button: {
        backgroundColor: Colors.dt_bg,
        height: ms(45),
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
        backgroundColor: 'red',
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
    dt_status_container:{
        width:ms(30),
        height:ms(30),
        borderRadius:ms(50),
        backgroundColor:Colors.dt_error + "26",
        alignItems:"center",
        justifyContent:"center"
    }
});
