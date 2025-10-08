/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import GroupCard from '../../../../components/group-card/GroupCard'

/**Main export*/
const MyGroupScreen: React.FC = () => {
    const Navigation = useNavigation<any>()
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
                onRefresh={() => { }} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    <GroupCard />
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default MyGroupScreen