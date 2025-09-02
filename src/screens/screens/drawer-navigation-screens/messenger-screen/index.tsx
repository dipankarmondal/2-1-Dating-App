import { View, Text } from 'react-native'
import React from 'react'
import { HomeScreenStyles as styles } from './styles'
import ScreenLayout from '../../common/ScreenLayout'

const MessengerScreen: React.FC = () => {
    return (
        <ScreenLayout>
            <Text style={{ color: "white" }}>MessengerScreen</Text>
        </ScreenLayout>
    )
}

export default MessengerScreen