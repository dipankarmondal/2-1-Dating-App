import { View, Text } from 'react-native'
import React from 'react'
import AuthLayout from '../common/AuthLayout'

const ProfileSetup: React.FC = () => {
    return (
        <AuthLayout
            {...{
                titile: "Profile Setup",
                type: "profileSetup"
            }}
        >
            <Text>ProfileSetup</Text>
        </AuthLayout>
    )
}

export default ProfileSetup