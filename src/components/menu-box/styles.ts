import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const MenuBoxStyles = StyleSheet.create({
    menuContainer: {
        position: "absolute",
        top: 35,
        right: 10,
        backgroundColor: "#222",
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        zIndex: 1000
    },
    menuItem: {
        paddingVertical: ms(8),
        flexDirection: "row",
        alignItems: "center"
    },
    menuText: {
        color: Colors.dt_white,
        fontSize: ms(14),
        fontFamily: Fonts.Font_600,
        marginLeft: ms(5)
    },
    dt_more_container: {
        width: ms(25),
        height: ms(25),
        backgroundColor: Colors.dt_border + "63",
        borderRadius: ms(50),
        alignItems: "center",
        justifyContent: "center",
    },
})
