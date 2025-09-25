import { StyleSheet } from "react-native";
import { ms } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const HotdateContentStyles = StyleSheet.create({
    container: {
        borderRadius: 10,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: ms(10),
    },
    label: {
        color: Colors.dt_gray,
        fontSize: ms(15),
        fontFamily: Fonts.Font_600
    },
    value: {
        color: Colors.dt_white,
        fontSize: ms(15),
        fontFamily: Fonts.Font_600
    },
    slider: {
        width: '100%',
        height: 40,
    },
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
    },
    dt_date_picker: {
        height: ms(45),
        borderRadius: ms(10),
        borderWidth: ms(1),
        borderColor: Colors.dt_gray,
        paddingHorizontal: ms(10),
        marginVertical: ms(10),
        justifyContent: 'center'
    },
    dt_picker_text: {
        color: Colors.dt_gray,
        fontSize: ms(15),
        fontFamily: Fonts.Font_500,
    }
})
