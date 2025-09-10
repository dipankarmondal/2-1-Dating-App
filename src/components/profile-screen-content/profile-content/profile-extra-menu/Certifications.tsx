import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {ProfileContentStyles as styles} from '../styles'
import UserInfoCard from '../../../feed-content/userinfo-card/UserInfoCard'
import { ms } from '../../../../utils/helpers/responsive'
import { ProfileExtraMenuItems } from '../../../common/helper'

type Props = {
    activeKey: string
}
const Certifications: React.FC<Props> = ({activeKey}) => {

    const activeItem = ProfileExtraMenuItems.find(item => item.key === activeKey);

  return (
    <View style={styles.dt_container}>
        <View style={[styles.dt_profile_header, {marginBottom: ms(10)}]}>
            <Text style={styles.dt_view_all_header_text}>{activeItem?.label}</Text>
            <TouchableOpacity style={styles.dt_view_all}>
                <Text style={styles.dt_view_all_text}>View All</Text>
            </TouchableOpacity>
        </View>
        <UserInfoCard/>
    </View>
  )
}

export default Certifications