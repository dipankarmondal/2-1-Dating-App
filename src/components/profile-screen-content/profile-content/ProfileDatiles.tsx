import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../../utils/constant/Constant";
import { ProfileContentStyles as styles } from './styles'
import { ProfileContentData } from "./helper";

type Props = {
    type: "couple" | "male" | "female";
    profile: any
};

const ComparisonTable: React.FC<Props> = ({ type, profile }) => {
    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={[styles.headerRow]}>
                <Text style={[styles.cell, styles.headerCell]}>Details</Text>
                {type === "couple" && (
                    <>
                        <Text style={[styles.cell, styles.headerCell, { color: "red" }]}>Char</Text>
                        <Text style={[styles.cell, styles.headerCell, { color: "skyblue" }]}>Parm</Text>
                    </>
                )}
                {type === "male" && (
                    <Text style={[styles.cell, styles.headerCell, { color: Colors.dt_card_blue }]}>Parm</Text>
                )}
                {type === "female" && (
                    <Text style={[styles.cell, styles.headerCell, { color: Colors.dt_error }]}>Char</Text>
                )}
            </View>
            {/* Data Rows */}
            {ProfileContentData(profile).map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={[styles.cell, styles.label, ]}>{item.label}</Text>
                    {type === "couple" && (
                        <>
                            <Text style={styles.cell}>{item.char}</Text>
                            <Text style={styles.cell}>{item.parm}</Text>
                        </>
                    )}
                    {type === "male" && <Text style={styles.cell}>{item.parm}</Text>}
                    {type === "female" && <Text style={styles.cell}>{item.char}</Text>}
                </View>
            ))}
        </View>
    );
}

export default ComparisonTable;

