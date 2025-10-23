/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ChatroomCard from '../../../../components/chatroom-card/ChatroomCard'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { GetChatRooms } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Main export*/
const ChatroomScreen: React.FC = () => {
    const Navigation = useNavigation<any>()
    const { Token } = useAuth()

    const { data: ChatRoomData, refetch, isLoading } = useQuery({
        queryKey: ['GetChatRoom'],
        queryFn: () => GetChatRooms(Token),
        enabled: !!Token
    })

    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Chatrooms</Text>
                <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("AddChatroomScreen") }}>
                    <Text style={CommonStyles.dt_speed_date_text}>Add Chatroom</Text>
                </TouchableOpacity>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    {isLoading ? <Loader /> :
                        ChatRoomData?.data?.length > 0 ? (
                            ChatRoomData?.data?.map((item: any, index: number) => {
                                return (
                                    <ChatroomCard
                                        key={index}
                                        {...{
                                            item
                                        }}
                                    />
                                )
                            })

                        ) : (
                            <NotFound
                                {...{
                                    title: "No chatrooms found. Start a new conversation by creating a chatroom and invite friends to join your group chat.",
                                    photo: require("@images/notFound/group_chat.png")
                                }}
                            />
                        )
                    }
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default ChatroomScreen

