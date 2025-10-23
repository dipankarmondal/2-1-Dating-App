import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";

export const TopMenuStyles = StyleSheet.create({
    menuContainer: {
        backgroundColor: Colors.dt_gray + "33",
        width: "100%",
    },
    menuItem: {
        paddingHorizontal: 15,
        paddingVertical: ms(8),
        borderRadius: ms(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    activeMenuItem: {
        backgroundColor: Colors.dt_bg,
    },
    menuText: {
        color: Colors.dt_white,
        fontSize: 15,
        fontFamily: Fonts.Font_700
    },
    activeMenuText: {
        color: Colors.dt_card_blue,
    },
    menu: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        gap: ms(10),
        padding: ms(5),
    },
    dt_isTwoItem: {
        width: "48%",
        alignItems: "center",
        justifyContent: "center"
    },
    dt_badge:{
        width:ms(17),
        height:ms(17),
        backgroundColor:Colors.dt_white,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:ms(50),
        marginLeft:ms(5)
    },
    dt_badge_text:{
        color:Colors.dt_black,
        fontSize:ms(12),
        fontFamily:Fonts.Font_600
    }
})
