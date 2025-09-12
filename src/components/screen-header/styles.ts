import { StyleSheet } from "react-native";
import { ms } from "../../utils/helpers/responsive";
import { Colors, Fonts } from "../../utils/constant/Constant";

export const ScreenHeaderStyles = StyleSheet.create({
    dt_container: {
        height: ms(50),
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: ms(10),
        borderBottomWidth: ms(.5),
        borderColor: Colors.dt_white + "33"
    },
    dt_header: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%"
    },
    dt_title_container: {
        marginRight: ms(2),
        paddingHorizontal: ms(10),
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    dt_title: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(14),
        color: Colors.dt_white
    },
    dt_filter_container: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        gap: ms(8)
    },
    dt_filter: {
        borderRadius: ms(50),
        borderWidth: ms(1.2),
        borderColor: Colors.dt_card_blue,
        alignItems: "center",
        paddingHorizontal: ms(8),
        paddingVertical: ms(5),
    },
    dt_filter_text: {
        fontFamily: Fonts.Font_600,
        fontSize: ms(12),
        color: Colors.dt_card_blue
    },
    suggestionBox: {
        position: 'absolute',
        top: 55,
        right: 10,
        width: '60%',
        backgroundColor: Colors.dt_white,
        borderRadius: ms(10),
        borderWidth: 1,
        borderColor: Colors.dt_gray + "87",
        zIndex: 10,
        overflow: 'hidden',
        maxHeight: ms(300),
    },
    suggestionItem: {
        paddingVertical: 12,
        paddingHorizontal: ms(10),
    },
    suggestionText: {
       fontFamily: Fonts.Font_700,
        color: Colors.dt_black,
        fontSize: ms(14),
    },
    dt_title_text:{
        fontSize:ms(16),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_white,
    }
})
