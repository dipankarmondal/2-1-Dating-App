import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './utils/context/auth-context/AuthContext';
import { AppNavigation } from './navigation/stack-navigation/StackNavigation';
import CustomeToast from './components/custom-toast';
import NetworkNotConnect from './components/network-not-connect';
import { RightDrawerProvider } from './utils/context/right-drawer/RightDrawer';

const App = () => {
    const [IsConnected, SetIsConnected] = useState(true);

    const queryClient = new QueryClient();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            SetIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            {
                IsConnected ? (
                    <QueryClientProvider client={queryClient}>
                        <NavigationContainer>
                            <AuthProvider>
                                <RightDrawerProvider>
                                    <AppNavigation />
                                </RightDrawerProvider>
                            </AuthProvider>
                        </NavigationContainer>
                        <CustomeToast />
                    </QueryClientProvider>
                ) : (
                    <NetworkNotConnect />
                )
            }
        </>
    )
}

export default App