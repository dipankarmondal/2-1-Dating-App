import { View, Text } from 'react-native'
import React from 'react'
import { RegistrationScreenStyles as styles } from './styles'
import AuthLayout from '../common/AuthLayout'

const RegistrationScreen: React.FC = () => {
    return (
        <AuthLayout
            {...{
                titile: "Create Member Account"
            }}
        >
            <Text>RegistrationScreen</Text>
        </AuthLayout>
    )
}

export default RegistrationScreen