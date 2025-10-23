/**React Imports */
import { View } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { GetGroupMembers, GetSingleGroup } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { SingleGroupMenuItems } from '../../../../components/common/helper'
import { ms } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import TopMenu from '../../../../components/top-menu'
import MembersTab from './group-tab-content/MembersTab'
import GroupCard from '../../../../components/group-card/GroupCard'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'

type Props = {
    route: any
}

/**Main export*/
const SingleGroupScreen: React.FC<Props> = ({ route }) => {

    const [activeKey, setActiveKey] = useState("members");

    const { groupName, groupId } = route?.params || {}
    const { Token } = useAuth()

    const { data, isLoading } = useQuery({
        queryKey: ["single_group"],
        queryFn: () => GetSingleGroup(Token, groupId),
        enabled: !!Token
    })

    const { data: groupFriends, isLoading: groupFriendsLoading } = useQuery({
        queryKey: ["single_group_friends"],
        queryFn: () => GetGroupMembers(Token, groupId),
        enabled: !!Token
    })

    return (
        <ScreenLayout type="stack" title={groupName ?? "group"}>
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={() => { }}>
                <View style={CommonStyles.dt_container}>
                    <GroupCard
                        {...{
                            item: data?.data?.group,
                            type: "single_group"
                        }}
                    />
                    <View style={{ borderRadius: ms(5), overflow: "hidden" }}>
                        <TopMenu {...{
                            MenuData: SingleGroupMenuItems,
                            activeKey,
                            setActiveKey,
                        }} />
                    </View>
                    {
                        activeKey === "members" ? <MembersTab Data={groupFriends?.data?.members} /> : null
                    }

                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default SingleGroupScreen