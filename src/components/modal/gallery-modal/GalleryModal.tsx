import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import { GalleryModalStyles as styles } from './styles'
import Gallery from 'react-native-awesome-gallery';

type Props = {
    visible: boolean,
    setVisible: any,
    photos: any
}

const GalleryModal: React.FC<Props> = ({ visible, setVisible, photos }) => {
    const [index, setIndex] = useState(0);

    const images = [
        "https://picsum.photos/id/1/500/500",
        "https://picsum.photos/id/2/500/500",
        "https://picsum.photos/id/3/500/500",
    ];

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.dt_gallery_wrapper}>
                {/* Banner */}
                <View style={styles.dt_banner_container}>
                    <Text style={styles.dt_banner_text}>
                        Swipe down to close
                    </Text>
                    <Text style={styles.dt_banner_text}>
                        {index + 1} / {images.length}
                    </Text>
                </View>

                {/* Gallery */}
                <Gallery
                    data={images}
                    initialIndex={index}
                    onIndexChange={(i) => setIndex(i)}
                    onSwipeToClose={() => setVisible(false)}
                    keyExtractor={(_, i) => i.toString()}
                />
            </View>
        </Modal>
    )
}

export default GalleryModal