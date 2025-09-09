import { View, Text, Share } from 'react-native'
import React, { useState } from 'react'
import { NotificationData } from '../../../../components/common/helper'
import NotificationCard from '../../../../components/notification-card/NotificationCard'
import { ms } from '../../../../utils/helpers/responsive'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import { CommonStyles as commonstyle } from '../../common/CommonStyle'

const Notification: React.FC = () => {

    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleShare = async (item: any) => {
        try {
            await Share.share({
                message: `${item?.title}\n\n${item?.text}`,
            });
        } catch (error) {
            console.log("Error sharing:", error);
        }
    };

    return (
        <View style={{ flex: 1, gap: ms(16), }}>
            {
                NotificationData?.map((item) => {
                    return (
                        <NotificationCard
                            key={item.id}
                            {...{
                                item,
                                setShowDropdown,
                                setSelectedItem
                            }}
                        />
                    )
                })
            }
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Notification"
                type="notification"
                onShare={() => handleShare(selectedItem)}
            >
                {selectedItem && (
                    <View style={{ gap: ms(8) }}>
                        <Text style={commonstyle.dt_title}>
                            {selectedItem.title}
                        </Text>
                        <Text style={commonstyle.dt_text}>{selectedItem.text}</Text>
                    </View>
                )}
            </ModalAction>
        </View>
    )
}

export default Notification

