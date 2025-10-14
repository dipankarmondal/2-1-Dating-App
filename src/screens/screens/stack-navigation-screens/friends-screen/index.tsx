/**React Imports */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

/** Liabary*/
import { useIsFocused } from '@react-navigation/native'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { friendsfilterOptions } from '../../../../components/common/helper'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'

/**Main export*/
const FriendsScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState("");
    const [activeTab, setActiveTab] = useState("all_friends");
    const [isChecked, setIsChecked] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) setSelected("");
    }, [isFocused]);

    const TABS = [
        { key: "all_friends", label: "Friends" },
        { key: "friends_request", label: "Friend request" },
    ];

    return (
        <ScreenLayout type="stack" title="Friends">
            <ScreenHeader>
                <View style={CommonStyles.dt_filter_container_btn}>
                    {TABS.map(({ key, label }) => {
                        const isActive = activeTab === key;
                        return (
                            <TouchableOpacity
                                key={key}
                                style={[
                                    CommonStyles.dt_tab_btn,
                                    isActive && {
                                        backgroundColor: Colors.dt_card_blue,
                                        borderColor: Colors.dt_card_blue,
                                    },
                                ]}
                                onPress={() => setActiveTab(key)}
                            >
                                <Text
                                    style={[
                                        CommonStyles.dt_tab_btn_text,
                                        isActive && { color: Colors.dt_white },
                                    ]}
                                >
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity
                        style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]}
                        onPress={() => setShowDropdown((prev) => !prev)}
                    >
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>
                            Filter
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    activeTab === "all_friends" && (
                        <TouchableOpacity style={[CommonStyles.dt_speed_date, { backgroundColor: Colors.dt_success_green }]}>
                            <Text style={CommonStyles.dt_speed_date_text}>Broadcast</Text>
                        </TouchableOpacity>
                    )
                }
            </ScreenHeader>

            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={() => { }}>
                <View style={CommonStyles.dt_container}>

                    {
                        activeTab === "all_friends" &&
                        <View>
                            <UserInfoCard
                                type="friends"
                                isMore
                                isOption
                                isUserContent={false}
                                isFilterOption={false}
                                isGallery
                                isChecked={isChecked}
                                setIsChecked={setIsChecked}
                            />
                        </View>
                    }
                    {
                        activeTab === "friends_request" &&
                        <View>
                            <UserInfoCard
                                type="friends_request"
                                isMore
                                isOption
                                isUserContent={false}
                                isFilterOption={false}
                                isGallery
                            />
                        </View>
                    }

                </View>
            </ScrollContent>

            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Filters"
                type="filters"
                onModalClick={() => setShowDropdown(false)}
                selected={selected}
                setSelected={setSelected}
            >
                <ModalSelectContent
                    filterData={friendsfilterOptions}
                    setModalVisible={setShowDropdown}
                    selected={selected}
                    setSelected={setSelected}
                />
            </ModalAction>
        </ScreenLayout>
    );
};

export default FriendsScreen;