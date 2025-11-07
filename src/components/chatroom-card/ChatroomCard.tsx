/**React Imports */
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

/**Local imports*/
import { ChatroomCardStyles as styles } from './styles'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms, toast } from '../../utils/helpers/responsive'
import { Colors } from '../../utils/constant/Constant'
import { useAuth } from '../../utils/context/auth-context/AuthContext'
import { JoinRoom } from '../../utils/api-calls/content-api-calls/ContentApiCall'

/** Liabary*/
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'

/**Icons*/
import GroupIcon from '@svgs/group.svg'
import DeleteIcon from '@svgs/cross.svg'
import LeaveIcon from '@svgs/user-logout.svg'
import InfoIcon from '@svgs/info.svg'

type Props = {
    item: any,
    handleDeleteModal?: () => void,
    handleLeaveModal?: () => void,
    deleteLoader: any,
    leaveLoader: any
}

const ChatroomCard: React.FC<Props> = ({ item, handleDeleteModal, handleLeaveModal, deleteLoader, leaveLoader }) => {
    const { Token, user } = useAuth()
    const QueryInvalidater = useQueryClient();
    const formatDate = (date?: string) =>
        date ? moment.utc(date).local().format("MMM DD, YYYY") : "-";

    const Navigation = useNavigation<any>()

    const JoinChatroomMutation = useMutation({
        mutationFn: () => JoinRoom(Token, item?._id),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                QueryInvalidater.invalidateQueries({ queryKey: ['GetChatRoom'] });
            }
        },
    })

    const handleJoinChatroom = () => {
        JoinChatroomMutation.mutate()
    }

    const isUser = user?.id === item?.createdBy?._id

    const isLeaveLoaderId = leaveLoader?.variables === item?._id
    const isDeleteLoaderId = deleteLoader?.variables === item?._id

    return (
        <View style={styles.dt_room_container_wrapper}>
            <View style={styles.dt_room_container}>
                <View style={styles.dt_room_image}>
                    <Image source={require('@images/chatroom.png')} style={styles.dt_image} />
                    <View style={styles.dt_image_overlay}>
                        <View style={styles.dt_group_container}>
                            <GroupIcon {...IconProps(ms(13))} fill={Colors.dt_white} />
                            <Text style={styles.dt_group_text}>{item?.participants?.length}</Text>
                        </View>
                        {
                            isUser && (
                                <TouchableOpacity style={[styles.dt_group_container, { backgroundColor: Colors.dt_error }]} activeOpacity={0.5} onPress={handleDeleteModal}>
                                    {
                                        isDeleteLoaderId && deleteLoader?.isPending ?
                                            <ActivityIndicator size={ms(13)} color={Colors.dt_white} /> :
                                            <DeleteIcon {...IconProps(ms(17))} fill={Colors.dt_white} />

                                    }
                                </TouchableOpacity>
                            )
                        }
                        {
                            item?.isParticipant && !isUser && (
                                <TouchableOpacity style={[styles.dt_group_container, { backgroundColor: Colors.dt_error }]} activeOpacity={0.5} onPress={handleLeaveModal}>
                                    {
                                        isLeaveLoaderId && leaveLoader?.isPending ?
                                            <ActivityIndicator size={ms(13)} color={Colors.dt_white} /> :
                                            <LeaveIcon {...IconProps(ms(16))} fill={Colors.dt_white} />
                                    }
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
                <View style={styles.dt_room_info}>
                    <View>
                        <Text style={styles.dt_room_name}>{item?.name ?? "__"}</Text>
                        <Text style={styles.dt_room_member}>{formatDate(item?.createdAt)}</Text>
                    </View>
                    {
                        item?.isParticipant ? (
                            <TouchableOpacity
                                style={styles.dt_button}
                                onPress={() => Navigation.navigate("ChatroomChatboxScreen", { RoomData: item })}
                            >
                                <Text style={styles.dt_button_text}>Make Chat</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[
                                    styles.dt_button,
                                    item?.blockSingleMales && { opacity: 0.5 }
                                ]}
                                onPress={handleJoinChatroom}
                                disabled={item?.blockSingleMales}
                            >
                                {
                                    JoinChatroomMutation?.isPending ?
                                        <ActivityIndicator size={ms(19)} color={Colors.dt_white} /> :
                                        <Text style={styles.dt_button_text}>Join Room</Text>
                                }
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            {
                !isUser && item?.blockSingleMales && (
                    <View style={styles.dt_block_container}>
                        <InfoIcon {...IconProps(ms(10))} fill={Colors.dt_coin_yellow} />
                        <Text style={styles.dt_block_text}>Sorry! This chatroom isn’t open to single males</Text>
                    </View>
                )
            }
        </View>
    )
}

export default ChatroomCard