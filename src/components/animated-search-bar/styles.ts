import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms, spacing } from "../../utils/helpers/responsive";

export const AnimatedSearchBarStyles = StyleSheet.create({
   searchContainer: {
        position: "absolute",
        backgroundColor: Colors.dt_white,
        padding: spacing.md,
        borderRadius: 15,
        zIndex: 100,
        maxHeight: ms(300),
        width: "100%"
    },
    dt_search_box: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        elevation: 5,
        shadowColor: Colors.dt_black,
        height: ms(45),
        backgroundColor: Colors.dt_white,
        overflow: "hidden",
        paddingHorizontal: ms(10),
        marginTop: ms(15)
    },
    dt_search_content: {
        marginTop: ms(10)
    },
    searchInput: {
        flex: 1,
        color: Colors.dt_border,
        fontSize: ms(16),
        fontFamily: Fonts.Font_600
    },
    closeBtn: {
        width: ms(20),
        height: ms(20),
        borderRadius: ms(100),
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: Colors.dt_black,
        backgroundColor: Colors.dt_border
    },
    dt_content_text: {
        color: Colors.dt_border,
        fontSize: ms(16),
        fontFamily: Fonts.Font_600
    },
})
