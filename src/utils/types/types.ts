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
    type?: string,
    isBack?: boolean,
    isSubtext?: boolean
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
    children: React.ReactNode,
    setUpdateKey?: React.Dispatch<React.SetStateAction<string | null>>
    type?: string
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
    type?: string,
    onShare?: () => void
}

export type LogoutContentProps = {
    setShowDropdown: (value: boolean) => void
}

export type PhoneInputFormProps = {
    name: string;
    parent?: string;
    control: any,
    setPhone: any
}

export type ModeInputProps = {
    name: string;
    parent?: string;
    control: any;
    type?: string;
    label?: boolean;
    option?: any
}

export type DropdownInputProps = {
  name: string;
  parent?: string;
  control: any;
  Data?: any,
  styles?: any,
  label?: boolean,
  selectionData?: any,
  isEditable?: boolean,
  isCart?: boolean
}
export type SuggestionBoxProps = {
  showDropdown: boolean,
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>,
  filteredProducts: any[],
  value: string,
  onChange: (value: string) => void,
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}

export type DatePickerInputProps = {
  name: string;
  parent: string;
  control: any;
  type: string,
  label?: boolean,
}

export type ChooseIntrestInputProps = {
    name: string;
    parent?: string;
    control: any; // You can replace `any` with the correct type from react-hook-form
    selectionData?: any[];
    label?: boolean;
};

export type ImagePickerChooseProps = {
    name: string;
    parent: string;
    control: any;
    label: boolean;
}

export type MultiselectInputProps = {
    name: string,
    parent: string,
    control: any,
    label?: boolean,
    option?: any
}

export type SearchBoxProps = {
  setSearchText: (text: string) => void,
  searchText: string,
  type?: string,
  activeKey?: string,
  levelOptions?: any[],
  onLevelSelect?: any
}

export type ScreenHeaderProps = {
    activeKey: string,
    setActiveKey: (key: string) => void,
    Header: any
}

export type NotificationCardProps = {
    item: any,
    setShowDropdown: any,
    setSelectedItem?: any
}

export type SearchBarProps = {
    headerHeight?: number;
}

export type SearchBarRef = {
    open: () => void;
    close: () => void;
}