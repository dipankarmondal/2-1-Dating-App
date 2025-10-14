/**React Imports */
import { useEffect, useState } from "react"

/**Local imports*/
import { Colors } from "../../utils/constant/Constant"
import { GetProfile } from "../../utils/api-calls/auth-calls/AuthCall"
import { useAuth } from "../../utils/context/auth-context/AuthContext"
import { Stack } from "../navigation-types/NavigationTypes"
import DrawerNavigator from "../drawer-navigation/DrawerNavigation"

/**Screens */
import LoginScreen from "../../screens/auth/login-screen"
import Splash from "../../components/splash"
import RegistrationScreen from "../../screens/auth/registration-screen"
import ProfileSetup from "../../screens/auth/profile-setup"
import ForgetPassword from "../../screens/auth/forget-password"
import BusinessSignupScreen from "../../screens/auth/business-signup-screen"

/** Liabary*/
import { SafeAreaView } from "react-native-safe-area-context"
import { useQuery } from "@tanstack/react-query"
import ProfileScreen from "../../screens/screens/stack-navigation-screens/profile-screen"
import { GetUser } from "../../utils/api-calls/content-api-calls/ContentApiCall"
import ChatScreen from "../../screens/screens/stack-navigation-screens/chat-screen"
import ChatInfoScreen from "../../screens/screens/stack-navigation-screens/chat-screen/chat-info-screen/ChatInfoScreen"
import SpeedDateScreen from "../../screens/screens/stack-navigation-screens/speed-date-screen"
import AddChatroomScreen from "../../screens/screens/stack-navigation-screens/add-chatroom-screen"
import PrivatePartyScreen from "../../screens/screens/stack-navigation-screens/private-party-screen"
import PartyEventDetailsScreen from "../../screens/screens/stack-navigation-screens/party-event-details-screen"
import AddVideoScreen from "../../screens/screens/stack-navigation-screens/add-video-screen"
import CreateGroup from "../../screens/screens/stack-navigation-screens/create-group"
import MyGroupScreen from "../../screens/screens/stack-navigation-screens/my-group-screen"
import FeaturedMembersAddScreen from "../../screens/screens/stack-navigation-screens/featured-members-add-screen"
import InviteFriendsScreen from "../../screens/screens/stack-navigation-screens/invite-friends-screen"
import AlbumShowScreen from "../../screens/screens/stack-navigation-screens/album-show-screen"
import AccountScreen from "../../screens/screens/stack-navigation-screens/account-screen"
import SubscriptionScreen from "../../screens/screens/stack-navigation-screens/subscription-screen"
import SeePlans from "../../screens/screens/stack-navigation-screens/subscription-screen/See-plans"
import LocationScreen from "../../screens/screens/stack-navigation-screens/location-screen"
import FriendsScreen from "../../screens/screens/stack-navigation-screens/friends-screen"

export const AuthStack = () => {
    return (
        <Stack.Navigator
            id={undefined}
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
    )
}

export const MainStack = () => {
    return (
        <Stack.Navigator
            id={undefined}
            initialRouteName="DrawerNavigator"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ChatInfoScreen" component={ChatInfoScreen} />
            <Stack.Screen name="SpeedDateScreen" component={SpeedDateScreen} />
            <Stack.Screen name="AddChatroomScreen" component={AddChatroomScreen} />
            <Stack.Screen name="PrivatePartyScreen" component={PrivatePartyScreen} />
            <Stack.Screen name="PartyEventDetailsScreen" component={PartyEventDetailsScreen} />
            <Stack.Screen name="AddVideoScreen" component={AddVideoScreen} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} />
            <Stack.Screen name="MyGroupScreen" component={MyGroupScreen} />
            <Stack.Screen name="FeaturedMembersAddScreen" component={FeaturedMembersAddScreen} />
            <Stack.Screen name="InviteFriendsScreen" component={InviteFriendsScreen} />
            <Stack.Screen name="AlbumShowScreen" component={AlbumShowScreen} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
            <Stack.Screen name="SeePlans" component={SeePlans} />
            <Stack.Screen name="LocationScreen" component={LocationScreen} />
            <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
        </Stack.Navigator>
    )
}
export const ProfileSetipStack = () => {
    return (
        <Stack.Navigator
            id={undefined}
            initialRouteName="ProfileSetup"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
            <Stack.Screen name="BusinessSignupScreen" component={BusinessSignupScreen} />
        </Stack.Navigator>
    )
}

export const AppNavigation = () => {
    const { Token } = useAuth()
    const [Loading, SetLoading] = useState(true)

    const { data, isLoading } = useQuery({
        queryKey: ['GetUser'],
        queryFn: () => GetUser(Token),
        enabled: !!Token,
    })
    
    useEffect(() => {
        setTimeout(() => {
            SetLoading(false)
        }, 1500)
    }, [])

    if (Loading || (Token && isLoading)) {
        return <Splash />
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dt_bg }} edges={['top', 'bottom']} >
            {Token ? (
                data?.data?.profile?.onboardingCompleted ? (
                    <MainStack />
                ) : (
                    <ProfileSetipStack />
                )
            ) : (
                <AuthStack />
            )}
        </SafeAreaView>
    )
}