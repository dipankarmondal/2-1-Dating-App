import { View, Text } from 'react-native'
import React from 'react'
import { ViewMeScreenStyles as styles } from './styles'
import ScreenLayout from '../../common/ScreenLayout'

const ViewMeScreen: React.FC = () => {
    return (
        <ScreenLayout>
            <Text style={{ color: "white" }}>ViewMeScreen</Text>
        </ScreenLayout>
    )
}

export default ViewMeScreen