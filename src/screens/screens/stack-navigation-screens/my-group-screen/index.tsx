/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { use } from 'react'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import GroupCard from '../../../../components/group-card/GroupCard'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { GetMyGroups } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'

/**Main export*/
const MyGroupScreen: React.FC = () => {

    const Navigation = useNavigation<any>()
    const { Token } = useAuth()

    const { data, isLoading,refetch } = useQuery({
        queryKey: ["my_groups"],
        queryFn: () => GetMyGroups(Token),
        enabled: !!Token
    })


    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "My Group",
            }}
        >
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Groups</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("CreateGroup") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.goBack() }}>
                        <Text style={CommonStyles.dt_speed_date_text}>All Groups</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch}
            >
                <View style={CommonStyles.dt_container}>
                    {
                        data?.data?.groups?.map((item: any, index: number) => {
                            return (
                                <GroupCard
                                    key={index}
                                    {...{
                                        item: item
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default MyGroupScreen