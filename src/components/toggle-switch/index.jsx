import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';
import { ms } from '../../utils/helpers/responsive';
import { Colors, Fonts } from '../../utils/constant/Constant';

const ToggleSwitch = ({ isActive, onToggle }) => {
    const animatedValue = React.useState(new Animated.Value(isActive ? 1 : 0))[0];

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isActive ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isActive]);

    const thumbPosition = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [3, 30.5],
    });

    return (
        <TouchableOpacity
            style={[
                styles.switchContainer,
                isActive ? styles.switchActive : styles.switchInactive,
            ]}
            activeOpacity={0.8}
            onPress={() => onToggle(!isActive)}
        >
            {/* Left Text (shows only when OFF) */}
            {
                isActive === true &&
                <Text style={[styles.sideText, { left: 8}]}>
                    ON
                </Text>
            }

            {/* Animated Thumb */}
            <Animated.View
                style={[
                    styles.thumb,
                    { transform: [{ translateX: thumbPosition }] },
                ]}
            />

            {/* Right Text (shows only when ON) */}
            {
                isActive === false &&
                <Text style={[styles.sideText, { right: 4,}]}>
                    OFF
                </Text>
            }

        </TouchableOpacity>
    );
};




const styles = StyleSheet.create({
    switchContainer: {
        width: ms(55),
        height: ms(26),
        borderRadius: ms(20),
        paddingHorizontal: ms(3),
        justifyContent: 'center',
        position: 'relative',
    },
    switchActive: {
        backgroundColor:Colors.dt_card_blue,
    },
    switchInactive: {
        backgroundColor: Colors.dt_card_blue,
    },
    thumb: {
        width: ms(22),
        height: ms(22),
        borderRadius: ms(11),
        backgroundColor:Colors.dt_white,
        position: 'absolute',
        top: 2,
    },
    sideText: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -7 }],
        fontSize: ms(12),
        fontFamily:Fonts.Font_500,
        color:Colors.dt_white
    },
});

export default ToggleSwitch;
