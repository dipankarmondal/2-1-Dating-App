/**React Imports */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { ProfileScreenStyles as styles } from './styles'
import { ProfileMenuItems } from '../../../../components/common/helper'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { GetUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import TopMenu from '../../../../components/top-menu'
import ProfileContent from '../../../../components/profile-screen-content/profile-content/ProfileContent'
import EditContent from '../../../../components/profile-screen-content/edit-content/EditContent'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'

/**Main export*/
const ProfileScreen: React.FC = () => {
    const [activeKey, setActiveKey] = React.useState("profile");
    const { Token } = useAuth()

    const {data} = useQuery({
        queryKey: ["user"],
        queryFn: () => GetUser(Token),
        enabled: !!Token
    });

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Profile"
            }}
        >
            <TopMenu {...{
                MenuData: ProfileMenuItems,
                activeKey,
                setActiveKey
            }} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {activeKey === "profile" && <ProfileContent data={data?.data} />}
                {activeKey === "edit" && <EditContent />}
            </ScrollView>
        </ScreenLayout>
    )
}

export default ProfileScreen