import { Dimensions, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils/constant/Constant";
import { ms } from "../../../utils/helpers/responsive";

const { width } = Dimensions.get("window");
const ITEM_MARGIN = ms(4);
const ITEM_SIZE = (width - ITEM_MARGIN * 8) / 4;

export const ImagePickerChooseStyles = StyleSheet.create({
    dt_select_label: {
        color: Colors.dt_white,
        fontFamily: Fonts.Font_600,
        fontSize: ms(17),
        marginBottom: ms(5),
    },
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: ms(10),
    },
    imageBox: {
        position: "relative",
        width: ITEM_SIZE,
        height: ms(80),
        borderRadius: ms(10),
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    imagePreview: {
        width: "100%",
        height: "100%",
        borderRadius: ms(10),
    },
    removeBtn: {
        position: "absolute",
        top: 3,
        right: 3,
        backgroundColor: Colors.dt_error,
        borderRadius: ms(10),
        width: ms(18),
        height: ms(18),
        alignItems: "center",
        justifyContent: "center",
    },
    addBox: {
        width: ms(80),
        height: ms(80),
        borderRadius: ms(10),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:Colors.dt_border,
        borderWidth: 1,
        borderColor: Colors.dt_white
    },
    cameraIcon: {
        marginBottom: ms(5),
    },
    addText: {
        fontSize: ms(12),
        color: Colors.dt_white,
        textAlign: "center",
        fontFamily: Fonts.Font_500
    },
})
