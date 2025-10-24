/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { SingleGroupScreenstyles as styles } from "../styles"
import { IconProps } from '../../../../../utils/helpers/Iconprops'
import { ms } from '../../../../../utils/helpers/responsive'
import { Colors } from '../../../../../utils/constant/Constant'

/**Components */
import UserInfoCard from '../../../../../components/feed-content/userinfo-card/UserInfoCard'

/**Icons*/
import UserIcon from '@svgs/setting/user.svg'
import CameraIcon from '@svgs/camera.svg'
import PlayIcon from '@svgs/play.svg'
import LikeThumbIcon from '@svgs/like.svg'
import { useAuth } from '../../../../../utils/context/auth-context/AuthContext'


type Props = {
    Data: any
}

/**Main export*/
const MembersTab: React.FC<Props> = ({ Data }) => {

    const {user} = useAuth()

    const NewMemberActions = (data: any) => [
        { id: 1, icon: CameraIcon, size: ms(13), count: data?.user?.profile?.photos?.length ?? 0 },
        { id: 2, icon: LikeThumbIcon, size: ms(17), count: data?.user?.likeCount ?? 0},
        { id: 4, icon: UserIcon, size: ms(14), count: data?.user?.friendsCount?.length ?? 0 },
        { id: 3, icon: PlayIcon, size: ms(13), count: 0 },
    ];

    return (
        <View style={{gap: ms(16)}}>
            {
                Data?.map((item: any, index: number) => {
                    const isUser = item?.user?._id === user?.id
                    return (
                        <UserInfoCard
                            key={index}
                            {...{
                                isMore: true,
                                isOption: isUser === true ? false : true,
                                isFilterOption: true,
                                isGallery: item?.user?.profile?.photos?.length > 0 ? true : false,
                                profileImages: item?.user?.profile?.photos,
                                UserName: item?.user?.username,
                            }}
                        >   
                            <View style={[styles.dt_profile_content, { marginTop: ms(10) }]}>
                                {NewMemberActions(item).map(({ id, icon: Icon, size, count }) => (
                                    <TouchableOpacity
                                        key={id}
                                        style={[styles.dt_button_two, { backgroundColor: Colors.dt_gray + '33' }]}
                                    >
                                        <Icon {...IconProps(size)} fill={Colors.dt_card_blue} />
                                        <Text style={styles.dt_profile_text}>{count}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </UserInfoCard>
                    )
                })
            }
        </View>
    )
}

export default MembersTab