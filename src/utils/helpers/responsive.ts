import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Toast from 'react-native-toast-message';

const hs = (size: number) => scale(size);
const vs = (size: number) => verticalScale(size);
const ms = (size: number, factor: number = 0.5) =>
    moderateScale(size, factor);

// 🎨 Fonts
const font = (size: number) => ms(size);

// 📐 Spacing 
const spacing = {
    xs: ms(4),
    sm: ms(8),
    md: ms(16),
    lg: ms(24),
    xl: ms(32),
};

const toast = (type: string, content: { title: string, }) => {
    Toast.show({
        type: type,
        text1: content.title,
        text1Style: {
            flexWrap: 'wrap',
        },
        position: 'bottom',
        visibilityTime: 3000,
    });
};

export { hs, vs, ms, toast, spacing };