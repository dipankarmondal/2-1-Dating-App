/** Liabary*/
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp, createDrawerNavigator } from "@react-navigation/drawer";

// -----------------------------
// Stack Param List & Navigation
// -----------------------------

// Stack Param List
export type RootStackParamList = {
  LoginScreen: undefined;
  RegistrationScreen: undefined;
  DrawerNavigator: undefined;
  ForgetPassword: undefined;
  ProfileSetup: undefined; 
  BusinessSignupScreen: undefined;
  ProfileScreen: undefined;
  ChatScreen: undefined;
  ChatInfoScreen: undefined;
  SpeedDateScreen: undefined;
  AddChatroomScreen: undefined;
  PrivatePartyScreen: undefined;
  PartyEventDetailsScreen: undefined;
  AddVideoScreen: undefined;
  CreateGroup: undefined;
  MyGroupScreen: undefined;
  FeaturedMembersAddScreen: undefined;
  InviteFriendsScreen: undefined;
  AlbumShowScreen: undefined;
  AccountScreen: undefined;
  SubscriptionScreen: undefined;
  SeePlans: undefined;
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
  FeedScreen: undefined;
  MessengerScreen: undefined; 
  SettingsScreen: undefined;
  ViewMeScreen: undefined;
  OnlineNowScreen: undefined;
  HotDateScreen: undefined;
  ChatroomScreen: undefined;
  LivestreamScreen: undefined;
  NewMemberScreen: undefined;
  PartiesEventsScreen: undefined;
  VideoScreen: undefined;
  TravelDateScreen: undefined;
  CertificationsScreen: undefined;
  WallOfFameScreen: undefined;
  GroupsScreen: undefined;
  FeaturedMembersScreen: undefined;
  ContestsScreen: undefined;
  AddVacationsRentalScreen: undefined;
  TwoPlusOneScreen: undefined;
};

export const Drawer = createDrawerNavigator<DrawerParamList>();

// Drawer Navigation Helper
export type DrawerNavigation<Screen extends keyof DrawerParamList> =
  DrawerNavigationProp<DrawerParamList, Screen>;

// Usage Drawer Navigation Prop Example:
export type FeedScreenDrawerNavigationProp = DrawerNavigation<"FeedScreen">;
export type MessengerScreenDrawerNavigationProp = DrawerNavigation<"MessengerScreen">;

