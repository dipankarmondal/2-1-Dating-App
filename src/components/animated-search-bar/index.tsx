import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Animated, TextInput, TouchableOpacity, View, Text } from "react-native";
import { Colors } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";
import CrossIcon from "@svgs/cross.svg";
import { IconProps } from "../../utils/helpers/Iconprops";
import {AnimatedSearchBarStyles as styles} from './styles'

interface SearchBarProps {
    headerHeight?: number; // for positioning below header
}

export interface SearchBarRef {
    open: () => void;
    close: () => void;
}

const AnimatedSearchBar = forwardRef<SearchBarRef, SearchBarProps>(({ headerHeight = 50 }, ref) => {
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState("");
    const scaleAnim = useRef(new Animated.Value(0)).current; // start hidden
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const open = () => {
        setVisible(true);
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const close = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => setVisible(false));
    };

    useImperativeHandle(ref, () => ({
        open,
        close,
    }));

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.searchContainer,
                {
                    top: headerHeight,
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <TouchableOpacity
                style={[styles.closeBtn, {alignSelf:"flex-end"} ]}
                onPress={close} // clear input
            >
                <CrossIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
            </TouchableOpacity>
            <View style={styles.dt_search_box}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#ccc"
                    value={query}
                    onChangeText={setQuery}
                />
                {query.length > 0 && ( // ✅ only show if not empty
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => setQuery("")} // clear input
                    >
                        <CrossIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.dt_search_content}>
                <Text style={styles.dt_content_text}>Search Results</Text>
            </View>
        </Animated.View>
    );
});
export default AnimatedSearchBar;
