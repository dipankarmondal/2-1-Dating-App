/**React Imports */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

/**Local imports*/
import { GroupCardStyles as styles } from './styles'
import { Colors } from '../../utils/constant/Constant'
import { IconProps } from '../../utils/helpers/Iconprops'
import { ms } from '../../utils/helpers/responsive'

/**Icons*/
import GroupIcon from '@svgs/group.svg'

/** Liabary*/
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'

type Props = {
    item: any,
    type?: any
}

/**Main export*/
const GroupCard: React.FC<Props> = ({ item, type }) => {
    const Navigation = useNavigation<any>();

    const formatDate = (date?: string) =>
        date ? moment.utc(date).local().format("MMM DD, YYYY") : "-";

    const CardContent = () => (
        <>
            <View style={styles.dt_image_container}>
                <Image
                    source={item?.coverImage ? { uri: item?.coverImage } : require('@images/dummy.png')}
                    style={styles.dt_image}
                />
                <TouchableOpacity style={styles.dt_overlay}>
                    <Text style={styles.dt_join_text}>Join</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.dt_name}>{item?.name ? item?.group?.name : "--"}</Text>

            <View style={styles.dt_age_container}>
                <Text style={styles.dt_intrest_text}>
                    by{" "}
                    <Text style={{ color: Colors.dt_primary_green }}>
                        {item?.creator?.username ?? "--"}
                    </Text>
                </Text>

                <View style={[styles.dt_intrest_container]}>
                    <Text style={[styles.dt_intrest_text, { textAlign: "right" }]}>
                        Location
                    </Text>
                    <View style={[styles.dt_location_container]}>
                        <Text style={styles.dt_location_text}>
                            {item?.location ?? "Not specified"}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={[styles.dt_age_container, { marginTop: ms(5) }]}>
                <View style={styles.dt_member_box}>
                    <GroupIcon {...IconProps(ms(15))} fill={Colors.dt_white} />
                    <Text style={styles.dt_member_text}>{item?.memberCount ?? "0"}</Text>
                </View>
                <Text
                    style={[
                        styles.dt_location_text,
                        { textAlign: "left", marginTop: ms(5), color: Colors.dt_error },
                    ]}
                >
                    Since {formatDate(item?.createdAt)}
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
                    groupName: item?.name,
                    groupId: item?._id,
                })
            }
            activeOpacity={0.5}
        >
            <CardContent />
        </TouchableOpacity>
    );
};

export default GroupCard;
