/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { TravelOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import GroupCard from '../../../../components/group-card/GroupCard'

/** Liabary*/
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { GetAllGroups } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'

/**Main export*/
const GroupsScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [selected, setSelected] = useState<string>("");

    const isFocused = useIsFocused();
    const Navigation = useNavigation<any>()
    const { Token } = useAuth()

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
    };

    const { data: GroupAllData, isLoading, refetch } = useQuery({
        queryKey: ["GroupAllData"],
        queryFn: () => GetAllGroups(Token),
        enabled: !!Token
    })


    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Groups</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("CreateGroup") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>Create Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => { Navigation.navigate("MyGroupScreen") }}>
                        <Text style={CommonStyles.dt_speed_date_text}>My Groups</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]} onPress={() => { setShowDropdown((prev) => !prev); }}>
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>

            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={refetch} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    {isLoading ? <Loader /> :
                        GroupAllData?.data?.groups?.length > 0 ? (
                            GroupAllData?.data?.groups?.map((item: any, index: number) => {
                                return (
                                    <GroupCard
                                        key={index}
                                        {...{
                                            item: item,
                                        }}
                                    />
                                )
                            }) 
                        ) :(
                            <NotFound
                                {...{
                                    title: "We couldn’t find any groups. Please refresh the page or create your first group",
                                    photo: require("@images/notFound/group_create.png")
                                }}
                            />
                        )
                    }
                </View>
            </ScrollContent>

            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Filters"
                type="filters"
                onModalClick={OnModalFormClick}
                selected={selected}
                setSelected={setSelected}
            >
                <ModalSelectContent
                    {...{
                        filterData: TravelOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default GroupsScreen 