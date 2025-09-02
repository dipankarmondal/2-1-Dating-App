import { useEffect, useState } from "react"
import LoginScreen from "../../screens/auth/login-screen"
import { useAuth } from "../../utils/context/auth-context/AuthContext"
import { Stack } from "../navigation-types/NavigationTypes"
import { SafeAreaView } from "react-native-safe-area-context"
import Splash from "../../components/splash"
import { Colors } from "../../utils/constant/Constant"
import RegistrationScreen from "../../screens/auth/registration-screen"
import DrawerNavigator from "../drawer-navigation/DrawerNavigation"

export const AuthStack = () => {
    return (
        <Stack.Navigator
            id={undefined}
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
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
        </Stack.Navigator>
    )
}

export const AppNavigation = () => {

    const { Token } = useAuth()

    const [Loading, SetLoading] = useState<Boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            SetLoading(false)
        }, 1500)
    }, [])

    if (Loading) {
        return <Splash />
    } else {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:Colors.dt_bg }} edges={['top', 'bottom']} >
                {Token ?
                    (
                        <>
                            <MainStack />
                        </>
                    ) :
                    (
                        <>
                            <AuthStack />
                        </>
                    )}
            </SafeAreaView>
        )
    }
}