import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";

export const SearchBoxstyles = StyleSheet.create({
    dt_search_wrapper: {
        width: "100%",
        height: ms(45),
        backgroundColor: Colors.dt_gray + "33",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        paddingLeft: ms(8),
        marginTop: ms(2),
        borderRadius: ms(8),
    },
    dt_search_input: {
        paddingHorizontal: ms(8),
        fontFamily: Fonts.Font_600,
        fontSize: ms(14),
        flex: 1,
        color: Colors.dt_white
    },
    dt_clear_btn:{
        width:ms(20),
        height:ms(20),
        backgroundColor:Colors.dt_error + "AB",
        borderRadius:ms(50),
        alignItems:"center",
        justifyContent:"center"
    },
    dt_filter_btn:{
        padding:ms(6),
        marginRight:ms(2)
    }
})
