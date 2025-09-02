// RightDrawer.tsx
import React from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useRightDrawer } from "../../utils/context/right-drawer/RightDrawer";
import { RightDrawerStyles as styles } from './styles'
import { IconProps } from "../../utils/helpers/Iconprops";
import { ms } from "../../utils/helpers/responsive";
import { Colors } from "../../utils/constant/Constant";
import { menuItems } from "../common/helper";

const RightDrawer: React.FC = () => {
    const { isOpen, closeDrawer } = useRightDrawer();

    if (!isOpen) return null;

    const handleMenuPress = (action: () => void) => {
        action();
        closeDrawer();
    };

    return (
        <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={closeDrawer}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
            <Animated.View style={styles.drawer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={styles.dt_settings_content}>
                        {menuItems.map(({ id, label, Icon, size, onPress }) => (
                            <TouchableOpacity
                                key={id}
                                style={styles.dt_settings_item}
                                onPress={() => handleMenuPress(onPress)}
                            >
                                <Icon {...IconProps(ms(size))} fill={Colors.dt_white} />
                                <Text style={styles.dt_settings_text}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </Animated.View>
        </View>
    );
};



export default RightDrawer;