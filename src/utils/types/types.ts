import { StatusBarStyle, StyleProp, TextInputProps } from "react-native";
import { TextStyle, ViewStyle } from "react-native-size-matters";

export type CustomStatusBarProps = {
    color: string;
    barStyle?: StatusBarStyle;
    translucent?: boolean;
};

export type CustomInputProps = {
    name: string;
    parent?: string;
    control: any;
    type?: string;
    label?: boolean;
    isCart?: boolean;
    styles: any;
    keyboardType?: TextInputProps["keyboardType"];
};

export type LoginForm = {
    username: string;
    password: string;
}

export type SubmitButtonProps = {
  text: string,
  loading?: boolean,
  onPress: () => void,
}
