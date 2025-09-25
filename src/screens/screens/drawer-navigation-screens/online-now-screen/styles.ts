import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const OnlineNowScreenStyles = StyleSheet.create({
    dt_searchInput: {
        height: ms(45),
        borderRadius: ms(10),
        borderWidth: ms(1),
        borderColor: Colors.dt_gray,
        paddingHorizontal: ms(10),
        color: Colors.dt_white,
        fontSize: ms(15),
        fontFamily: Fonts.Font_500,
        marginVertical: ms(10)
    }
})
