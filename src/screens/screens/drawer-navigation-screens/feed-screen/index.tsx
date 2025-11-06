/**React Imports */
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

/**Local imports*/
import { FeedTabs, FrindItems, GeneralItems } from '../../../../components/common/helper'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import Notification from './Notification'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import TopMenu from '../../../../components/top-menu'
import YourFeedContent from './YourFeedContent'
import GlobalFeedContent from './GlobalFeedContent'

/**Main export*/
const FeedScreen: React.FC<{ route: any }> = ({ route }) => {
    const [activeKey, setActiveKey] = React.useState("global_feeds");
    const [showDropdown, setShowDropdown] = useState(false);
    const [filterType, setFilterType] = useState<"general" | "friend" | null>(null);
    const [selected, setSelected] = useState<string>("");

    const { key } = route.params || {}
    const { Token } = useAuth()

    useEffect(() => {
        if (key) {
            setActiveKey(key);
        }
    }, [key]);

    const handleFilterPress = (type: "general" | "friend") => {
        setShowDropdown(true);
        setFilterType(type);
    }

    const OnModalFormClick = () => {
        setShowDropdown(false);
        console.log("clicked")
        setSelected("");
    };

    return (
        <ScreenLayout
            {...{
                setUpdateKey: setActiveKey,
                type: "feed"
            }}
        >
            <ScreenHeader>
                {/* <View style={commonstyle.dt_header}>{HeaderBtn.map(renderTab)}</View> */}
                <Text style={commonstyle.dt_header_title}>Feeds</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={commonstyle.dt_filter} onPress={() => handleFilterPress("general")}>
                        <Text style={commonstyle.dt_filter_text}>General Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[commonstyle.dt_filter, { borderColor: Colors.dt_error }]}
                        onPress={() => handleFilterPress("friend")}
                    >
                        <Text style={[commonstyle.dt_filter_text, { color: Colors.dt_error }]}>Friend Filter</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <TopMenu {...{
                    MenuData: FeedTabs,
                    activeKey,
                    setActiveKey,
                    isThreeItem: true
                }} />
                {
                    activeKey === "your_feeds" ?
                        <YourFeedContent
                            {...{
                                activeKey: activeKey
                            }}
                        /> :
                        activeKey === "global_feeds" ?
                            <GlobalFeedContent
                            {...{
                                activeKey: activeKey
                            }}
                        />
                            :
                            <Notification />
                }
            </ScrollView>
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
                        filterData: filterType === "general" ? GeneralItems : FrindItems,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default FeedScreen