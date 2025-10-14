import { View, Text } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import { CommonStyles } from '../../common/CommonStyle'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'

const LikeAndDislikeScreen: React.FC = () => {
    return (
        <ScreenLayout type="stack" title="Like/Dislike">
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={() => { }}>
                <View style={CommonStyles.dt_container}>
                    <UserInfoCard
                        type="like"
                        isMore
                        isOption
                        isUserContent={false}
                        isFilterOption={false}
                        isGallery
                    />
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default LikeAndDislikeScreen