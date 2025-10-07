import { StyleSheet } from "react-native";
import { ms, spacing } from "../../../../utils/helpers/responsive";
import { Colors, Fonts } from "../../../../utils/constant/Constant";

export const AddVideoScreenStyles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    heading: {
        fontSize: ms(12),
        marginBottom: ms(20),
        fontFamily:Fonts.Font_500,
        color: Colors.dt_white,
    },
    uploadBox: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#aaa',
        borderRadius: ms(12),
        width: '100%',
        height: ms(150),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dt_white + "33",
        padding: ms(10),
    },
    uploadText: {
        color: Colors.dt_white,
        fontSize: ms(14),
        fontFamily:Fonts.Font_500,
        textAlign: 'center',
    },
    previewContainer: {
        width: '100%',
        borderRadius: ms(12),
        overflow: 'hidden',
    },
    videoPreview: {
        width: '100%',
        height: ms(200),
        borderRadius: ms(12),
        backgroundColor: '#000',
    },
    changeBtn: {
        marginTop: ms(10),
        alignSelf: 'center',
    },
    changeText: {
        color: '#007AFF',
        fontSize: ms(14),
    },
    dt_name:{
        fontSize:ms(16),
        fontFamily:Fonts.Font_600,
        color:Colors.dt_white
    }
})
