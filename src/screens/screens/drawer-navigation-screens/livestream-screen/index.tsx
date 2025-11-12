/**React Imports */
import { View,Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { LivestreamScreenStyles as styles } from './styles'
import { IconProps } from '../../../../utils/helpers/Iconprops'
import { ms } from '../../../../utils/helpers/responsive'
import { Colors } from '../../../../utils/constant/Constant'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'

/**Icons*/
import MaleIcon from '@svgs/male.svg'
import FemaleIcon from '@svgs/female.svg'
import ViewIcon from '@svgs/setting/views.svg'
import TimeIcon from '@svgs/setting/time.svg'

/**Main export*/
const LivestreamScreen: React.FC = () => {
    const Navigation = useNavigation<any>();
    
    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Live Stream</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={CommonStyles.dt_speed_date} onPress={() => Navigation.navigate("StreamScreen")}>
                        <Text style={CommonStyles.dt_speed_date_text}>Create Stream</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={CommonStyles.dt_container}>
                    <UserInfoCard
                        {...{
                            type: "livestream",
                            isMore: true,
                            isOption: true,
                            isFilterOption: true,
                        }}
                    >
                        <View style={styles.dt_intrest}>
                            <View style={styles.dt_intrest}>
                                <View style={[styles.dt_age_container, { marginTop: ms(10) }]}>
                                    <View style={styles.dt_age}>
                                        <FemaleIcon {...IconProps(ms(20))} fill={Colors.dt_error} />
                                        <Text style={styles.dt_age_text}>5</Text>
                                    </View>
                                    <View style={styles.dt_age}>
                                        <MaleIcon {...IconProps(ms(20))} fill={Colors.dt_card_blue} />
                                        <Text style={styles.dt_age_text}>2</Text>
                                    </View>
                                </View>
                                <View style={[styles.dt_intrest_container, { alignItems: "flex-end" }]}>
                                    <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>Location</Text>
                                    <View style={[styles.dt_location_container]}>
                                        <Text style={[styles.dt_location_text, { color: Colors.dt_error }]}>
                                            helo
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.dt_age_container, { marginTop: ms(5), gap: ms(8) }]}>
                            <View style={styles.dt_live_info_container}>
                                <ViewIcon {...IconProps(ms(20))} fill={Colors.dt_gray} />
                                <Text style={styles.dt_location_text}>56</Text>
                            </View>
                            <View style={styles.dt_live_info_container}>
                                <TimeIcon {...IconProps(ms(16))} fill={Colors.dt_gray} />
                                <Text style={styles.dt_location_text}>55 min</Text>
                            </View>
                        </View>
                    </UserInfoCard>

                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default LivestreamScreen