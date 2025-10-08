import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScreenHeader from '../../../../components/screen-header/ScreenHeader'
import { CommonStyles } from '../../common/CommonStyle'
import { Colors } from '../../../../utils/constant/Constant'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalSelectContent from '../../../../components/modal/modal-content/modal-select-content/ModalSelectContent'
import { VideoOptions, WallofFameItems } from '../../../../components/common/helper'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import TopMenu from '../../../../components/top-menu'
import { WallOfFameScreenStyles as styles } from './styles'
import Slider from '@react-native-community/slider'
import WallOfFameCard from '../../../../components/wall-of-fame-card/WallOfFameCard'

const WallOfFameScreen: React.FC = () => {
    const [showDropdown, setShowDropdown] = React.useState(false)
    const [selected, setSelected] = useState<string>("");
    const [activeKey, setActiveKey] = useState("most_photos");
    const [distance, setDistance] = useState(5000);

    const Navigation = useNavigation<any>()
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setSelected("");
        }
    }, [isFocused]);

    const OnModalFormClick = () => {
        setShowDropdown(false);
    };
    return (
        <ScreenLayout>
            <ScreenHeader>
                <Text style={CommonStyles.dt_header_title}>Wall of Fame</Text>
                <View style={CommonStyles.dt_filter_container_btn}>
                    <TouchableOpacity style={[CommonStyles.dt_filter, { borderColor: Colors.dt_error }]} onPress={() => { setShowDropdown((prev) => !prev); }}>
                        <Text style={[CommonStyles.dt_filter_text, { color: Colors.dt_error }]}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </ScreenHeader>
            <TopMenu {...{
                MenuData: WallofFameItems,
                activeKey,
                setActiveKey,
            }} />
            <ScrollContent
                contentContainerStyle={{ flexGrow: 1 }}
                onRefresh={() => { }} // just pass refetch here
            >
                <View style={CommonStyles.dt_container}>
                    <Text style={styles.wall_of_fame_text}>Find the most popular online members closest to you, or use the slider to find out who is the most popular worldwide. The results are based on your primary location or location added in the options menu. Our wall will be forever changing, so check back often to see who have taken the top spots!</Text>
                    <View style={styles.slider_container}>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5000}
                            value={distance}
                            step={1}
                            minimumTrackTintColor={Colors.dt_card_blue}
                            maximumTrackTintColor={Colors.dt_gray}
                            thumbTintColor={Colors.dt_card_blue}
                            onValueChange={setDistance}
                        />
                        <Text style={styles.slider_text}>{distance}mi</Text>
                    </View>
                    <View style={styles.location_container}>
                        <Text style={styles.location_text}>Local</Text>
                        <Text style={styles.location_text}>Worldwide</Text>
                    </View>

                    <View style={styles.wall_of_fame_content}>
                        <WallOfFameCard />
                    </View>
                </View>
            </ScrollContent>
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
                        filterData: VideoOptions,
                        setModalVisible: setShowDropdown,
                        selected: selected,
                        setSelected: setSelected
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default WallOfFameScreen 