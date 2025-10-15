/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { ProfileContentStyles as styles } from '../styles'
import { ms } from '../../../../utils/helpers/responsive'
import { ProfileExtraMenuItems } from '../../../common/helper'

/**Components */
import UserInfoCard from '../../../feed-content/userinfo-card/UserInfoCard'
import GroupCard from '../../../group-card/GroupCard'

type Props = {
    activeKey: string
}
/**Main export*/
const Certifications: React.FC<Props> = ({ activeKey }) => {

    const activeItem = ProfileExtraMenuItems.find(item => item.key === activeKey);

    return (
        <View style={styles.dt_container}>
            <View style={[styles.dt_profile_header, { marginBottom: ms(10) }]}>
                <Text style={styles.dt_view_all_header_text}>{activeItem?.label}</Text>
                <TouchableOpacity style={styles.dt_view_all}>
                    <Text style={styles.dt_view_all_text}>View All</Text>
                </TouchableOpacity>
            </View>
            {
                activeItem?.key === "groups" ?
                    <GroupCard /> :
                    <UserInfoCard />
            }
        </View>
    )
}

export default Certifications