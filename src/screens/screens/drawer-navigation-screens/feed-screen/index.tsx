/**React Imports */
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

/**Local imports*/
import { FrindItems, GeneralItems, HeaderBtn } from '../../../../components/common/helper'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'
import GobalFeedContent from './GobalFeedContent'
import { Colors } from '../../../../utils/constant/Constant'
import { ms } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import Notification from './Notification'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'

/**Main export*/
const FeedScreen: React.FC<{ route: any }> = ({ route }) => {
    const [activeKey, setActiveKey] = React.useState("feed");
    const [showDropdown, setShowDropdown] = useState(false);
    const [filterType, setFilterType] = useState<"general" | "friend" | null>(null);
    const [selected, setSelected] = useState<string>("");

    const { key } = route.params || {}

    useEffect(() => {
        if (key) {
            setActiveKey(key);
        }
    }, [key]);

    const renderTab = (item: { key: string; title: string }) => {
        const isActive = item.key === activeKey;
        return (
            <TouchableOpacity
                key={item.key}
                style={[commonstyle.dt_title_container, isActive && { borderBottomWidth: ms(1), borderBottomColor: "white" }]}
                onPress={() => setActiveKey(item.key)}
            >
                <Text style={[commonstyle.dt_tab_title, { color: isActive ? Colors.dt_white : Colors.dt_gray + "89", }]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

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
                <View style={commonstyle.dt_header}>{HeaderBtn.map(renderTab)}</View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
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

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={commonstyle.dt_container}>
                    {
                        activeKey === "feed" ?
                            <GobalFeedContent /> :
                            <Notification />
                    }
                </View>
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