/**React Imports */
import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { GalleryModalStyles as styles } from './styles'
import { GalleryModalProps } from '../../../utils/types/types';

/** Liabary*/
import Gallery from 'react-native-awesome-gallery';

/**Main export*/
const GalleryModal: React.FC<GalleryModalProps> = ({ visible, setVisible, photos, isSingle }) => {
    const [index, setIndex] = useState(0);

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.dt_gallery_wrapper}>
                {/* Banner */}
                <View style={styles.dt_banner_container}>
                    <Text style={styles.dt_banner_text}>
                        Swipe down to close
                    </Text>
                    {
                        !isSingle && (
                            <Text style={styles.dt_banner_text}>
                                {index + 1} / {photos?.length}
                            </Text>
                        )
                    }
                </View>

                {/* Gallery */}
                <Gallery
                    data={photos}
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