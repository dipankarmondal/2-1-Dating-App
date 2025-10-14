import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import { TravelOptions } from '../../../../components/common/helper'
import { useIsFocused } from '@react-navigation/native'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'

const ViewScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = React.useState(false)

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Who I viewed"
            }}
        >
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={() => { }}>
                <View style={CommonStyles.dt_container}>
                    <View>
                        <UserInfoCard
                            type="view"
                            isMore
                            isOption
                            isUserContent={false}
                            isFilterOption={false}
                            isGallery
                        />
                    </View>
                </View>
            </ScrollContent>
        </ScreenLayout>
    )
}

export default ViewScreen