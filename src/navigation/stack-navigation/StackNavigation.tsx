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