import { View, Text } from 'react-native'
import React from 'react'
import { OnlineNowScreenStyles as styles } from './styles'
import ScreenLayout from '../../common/ScreenLayout'

const OnlineNowScreen: React.FC = () => {
    return (
         <ScreenLayout>
            <Text style={{ color: "white" }}>OnlineNowScreen</Text>
        </ScreenLayout>
    )
}

export default OnlineNowScreen