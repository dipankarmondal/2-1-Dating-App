import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const MoreVideoContentStyles = StyleSheet.create<any>({
    dt_container: {
        flex: 1,
        gap: ms(10),
        paddingBottom: ms(10)
    },
    dt_video_container: {
        gap: ms(10),
        flexDirection: "row",
    },
    dt_image_container: {
        width: ms(90),
        height: ms(75),
        borderRadius: ms(8),
        backgroundColor: Colors.dt_white,
        overflow: "hidden"
    },
    dt_image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    dt_video_text: {
        fontSize: ms(14),
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600
    },
    dt_views_text: {
        fontSize: ms(12),
        color: Colors.dt_gray,
        fontFamily: Fonts.Font_500
    },
    dt_overlay: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -ms(15) }, { translateY: -ms(15) }],
        backgroundColor: Colors.dt_white + "6B",
        width: ms(30),
        height: ms(30),
        borderRadius: ms(50),
        justifyContent: "center",
        alignItems: "center"
    }
})
