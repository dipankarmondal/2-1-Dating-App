/**React Imports */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { ProfileMenuItems } from '../../../../components/common/helper'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { GetMediaLibrary, GetUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import TopMenu from '../../../../components/top-menu'
import ProfileContent from '../../../../components/profile-screen-content/profile-content/ProfileContent'
import EditContent from '../../../../components/profile-screen-content/edit-content/EditContent'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'
import PicturesContent from '../../../../components/profile-screen-content/pictures-content/PicturesContent'
import VideoContent from '../../../../components/profile-screen-content/video-content/VideoContent'
import AlbumContent from '../../../../components/profile-screen-content/album-content/AlbumContent'

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
                {activeKey === "profile" && <ProfileContent data={data?.data} />}
                {activeKey === "edit" && <EditContent data={data?.data}/>}
                {activeKey === "pictures" && <PicturesContent data={data?.data} />}
                {activeKey === "videos" && <VideoContent />}
                {activeKey === "album" && <AlbumContent 
                    {...{
                        userId: data?.data?.id
                    }}
                />}
        </ScreenLayout>
    )
}

export default ProfileScreen