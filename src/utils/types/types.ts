import { StatusBarStyle, StyleProp, TextInputProps } from "react-native";
import { TextStyle, ViewStyle } from "react-native-size-matters";
import { DrawerParamList } from "../../navigation/navigation-types/NavigationTypes";

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
    styles?: any;
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

export type AuthProps = {
    children: React.ReactNode,
    titile: string,
    type: string
}

export type CheckTypes= {
  control: any;
  setValue?: (name: string, value: boolean) => void;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage?: string;
  name: string,
  text: string
}

export type DrawerScreenType = {
  name: keyof DrawerParamList;
  component: React.ComponentType<any>;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  size: number;
}

export type ScreenLayoutProps = {
    children: React.ReactNode
}

export type HeaderIconProps = {
    Icon: React.ComponentType<any>;
    onPress?: () => void;
}

export type ModalActionProps = {
    isModalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode,
    headerText: string,
    type?: string
}

export type LogoutContentProps = {
    setShowDropdown: (value: boolean) => void
}