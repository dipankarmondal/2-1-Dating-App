import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

export const GalleryModalStyles = StyleSheet.create({
   dt_banner_container: {
        position: "absolute",
        top: 0,
        width: "100%",
        paddingVertical: 5,
        backgroundColor: Colors.dt_gray + "33",
        alignItems: "center",
        zIndex: 10,
    },
    dt_banner_text: {
        fontSize: ms(13),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600
    },
    dt_gallery_wrapper: {
        flex: 1,
        backgroundColor: Colors.dt_black
    },
})
