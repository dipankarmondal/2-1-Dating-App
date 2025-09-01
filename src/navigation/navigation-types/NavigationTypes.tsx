/** Liabary*/
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp, createDrawerNavigator } from "@react-navigation/drawer";

// -----------------------------
// Stack Param List & Navigation
// -----------------------------

// Stack Param List
export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  RegistrationScreen: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

// Stack Navigation Helper
export type StackNavigation<Screen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, Screen>;

// Stack Navigation Props
export type LoginScreenNavigationProp = StackNavigation<"LoginScreen">;

// -----------------------------
// Drawer Param List & Navigation
// -----------------------------

export type DrawerParamList = {
  HomeScreen: undefined;
};

export const Drawer = createDrawerNavigator<DrawerParamList>();

// Drawer Navigation Helper
export type DrawerNavigation<Screen extends keyof DrawerParamList> =
  DrawerNavigationProp<DrawerParamList, Screen>;

// Usage Drawer Navigation Prop Example:
export type HomeScreenDrawerNavigationProp = DrawerNavigation<"HomeScreen">;

