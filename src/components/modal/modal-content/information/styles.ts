import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../../utils/constant/Constant";
import { ms } from "../../../../utils/helpers/responsive";

export const InformationStyles = StyleSheet.create({

    headerSection: {
        marginBottom: 32,
    },
    userTypeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 32,
        height: 32,
        backgroundColor: '#3b82f6',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    iconText: {
        fontSize: 16,
    },
    userTypeText: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.dt_black,
    },
    descriptionSection: {
        marginBottom: 32,
    },
    descriptionText: {
        fontSize: 18,
        lineHeight: 28,
        fontFamily:Fonts.Font_500,
        color: Colors.dt_black,
    },
    benefitsSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily:Fonts.Font_600,
        color: Colors.dt_black,
        marginBottom: 16,
    },
    bulletPoint: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bullet: {
        width: 8,
        height: 8,
        backgroundColor: Colors.dt_black,
        borderRadius: 5,
        marginTop: 8,
        marginRight: 12,
        flexShrink: 0,
    },
    bulletText: {
        fontSize: 18,
        lineHeight: 28,
        fontFamily:Fonts.Font_500,
        color: Colors.dt_black,
        flex: 1,
    },
})
