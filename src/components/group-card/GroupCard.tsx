/**React Imports */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { GroupCardStyles as styles } from './styles'
import { Colors } from '../../utils/constant/Constant'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms, toast } from '../../utils/helpers/responsive'
import { useAuth } from '../../utils/context/auth-context/AuthContext'
import { JoinGroup } from '../../utils/api-calls/content-api-calls/ContentApiCall'
import { GroupCardProps } from '../../utils/types/types'

/**Icons*/
import GroupIcon from '@svgs/group.svg'
import MessageIcon from '@svgs/messages.svg'
import CrossIcon from '@svgs/cross.svg'
import LeaveGroupIcon from '@svgs/user-logout.svg'

/** Liabary*/
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import LoaderKitView from 'react-native-loader-kit'

/**Main export*/
const GroupCard: React.FC<GroupCardProps> = ({ type, GroupData, isDeleteModal, isLeaveModal, ModalSelectData, isMyGroup }) => {
    const Navigation = useNavigation<any>();
    const { Token, user } = useAuth()
    const QueryInvalidater = useQueryClient();

    const isUser = GroupData?.createdId === user?._id

    const formatDate = (date?: string) =>
        date ? moment.utc(date).local().format("MMM DD, YYYY") : "-";

    const JoinGroupMutation = useMutation({
        mutationFn: (id: any) => JoinGroup(Token, id),
        onSuccess: (res: any) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['my_groups'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['single_group'] });
            }
        }
    })

    const HandleModalOpen = () => {
        ModalSelectData(GroupData?.groupId)
        isDeleteModal(true)
    }
    const HandleModalLeave = () => {
        ModalSelectData(GroupData?.groupId)
        isLeaveModal(true)
    }

    const HandleJoinGroup = () => {
        JoinGroupMutation.mutate(GroupData?.groupId)
    }


    const CardContent = () => (
        <>
            <View style={styles.dt_image_container}>
                <Image
                    source={GroupData?.coverImage ? { uri: GroupData?.coverImage } : require('@images/dummy.png')}
                    style={styles.dt_image}
                />
                {
                    GroupData?.isUserJoined === "active" ?
                        <View style={[styles.dt_overlay, { flexDirection: "row", alignItems: "center", gap: ms(10) }]}>
                            {
                                isUser ?
                                    <TouchableOpacity style={[styles.dt_message_box, { backgroundColor: Colors.dt_error }]} onPress={HandleModalOpen}>
                                        <CrossIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={[styles.dt_message_box, { backgroundColor: Colors.dt_error }]} onPress={HandleModalLeave}>
                                        <LeaveGroupIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                                    </TouchableOpacity>
                            }
                            {/* <TouchableOpacity style={styles.dt_message_box} onPress={()=> Navigation.navigate("DrawerNavigator",{screen: 'MessengerScreen', params: { key: "group_messenger" },})}>
                                <MessageIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                            </TouchableOpacity>  */}
                        </View> :
                        <TouchableOpacity style={styles.dt_overlay} onPress={HandleJoinGroup}>
                            {
                                JoinGroupMutation.isPending ?
                                    <LoaderKitView
                                        style={{ width: 35, height: 35 }}
                                        name={'BallScaleMultiple'}
                                        animationSpeedMultiplier={1.0}
                                        color={Colors.dt_bg}
                                    /> :
                                    <Text style={styles.dt_join_text}>Join</Text>
                            }
                        </TouchableOpacity>
                }
            </View>

            <Text style={styles.dt_name}>{GroupData?.name ?? "--"}</Text>

            <View style={styles.dt_age_container}>
                <View style={[styles.dt_intrest_container]}>
                    <Text style={[styles.dt_intrest_text,  ]}>
                        Location
                    </Text>
                    <View style={[styles.dt_location_container]}>
                        <Text style={styles.dt_location_text}>
                            {GroupData?.location ?? "Not specified"}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.dt_intrest_text,{marginTop:ms(5)}]}>
                    by{" "}
                    <Text style={{ color: Colors.dt_primary_green }}>
                        {GroupData?.userName || "--"}
                    </Text>
                </Text>

            </View>

            <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                <View style={styles.dt_member_box}>
                    <GroupIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                    <Text style={styles.dt_member_text}>{GroupData?.memberCount ?? "0"}</Text>
                </View>
                <Text
                    style={[
                        styles.dt_location_text,
                        { textAlign: "left", marginTop: ms(5), color: Colors.dt_error },
                    ]}
                >
                    Since {formatDate(GroupData?.createDate)}
                </Text>
            </View>
        </>
    );

    return type === "single_group" ? (
        <View style={styles.dt_user_info_card}>
            <CardContent />
        </View>
    ) : (
        <TouchableOpacity
            style={styles.dt_user_info_card}
            onPress={() =>
                Navigation.navigate("SingleGroupScreen", {
                    groupName: GroupData?.name,
                    groupId: GroupData?.id,
                    isMyGroup
                })
            }
            activeOpacity={0.5}
        >
            <CardContent />
        </TouchableOpacity>
    );
};

export default GroupCard;
