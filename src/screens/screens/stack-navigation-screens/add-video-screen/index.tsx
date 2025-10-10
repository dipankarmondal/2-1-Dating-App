/**React Imports */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import SubmitButton from '../../../../components/submit-button'

/**Local imports*/
import { ms } from '../../../../utils/helpers/responsive'
import { AddVideoScreenStyles as styles } from './styles'

/** Liabary*/
import { pick, types } from '@react-native-documents/picker'

/**Main export*/
const AddVideoScreen: React.FC = () => {
    const [videoInfo, setVideoInfo] = useState({ uri: "", name: "" });

    const handlePickVideo = async () => {
        try {
            const res = await pick({
                type: [types.video],
            });

            if (res && res.length > 0) {
                setVideoInfo({ uri: res[0]?.uri, name: res[0]?.name });

            }
        } catch (err: any) {
            // The library throws an error with a `code` when user cancels
            if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
                console.log('User cancelled picker');
            } else {
                console.error('Error picking video:', err);
            }
        }
    };

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Add Videos"
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: ms(50) }}>
                <View style={styles.dt_container} >
                    <Text style={styles.heading}>Helpdesk will make the final decision on whether your videos will be approved and posted. Videos with children, animals, weapons, URLs, or drug paraphernalia will not be posted. Politically or religiously offensive videos or videos with contact details, external links or referrals to other social networks will not be published either. Please make sure that all videos are yours. You can change your videos whenever you want. The maximum size per video is 250 MB and we support the formats 3gp, avi, wmv, mpeg, mov and mp4.</Text>

                    {
                        <TouchableOpacity onPress={handlePickVideo} style={styles.uploadBox}>
                            {
                                !videoInfo?.uri ?
                                    <Text style={styles.uploadText}>🎬 Tap to select a video</Text> :
                                    <Text style={styles.uploadText}>{videoInfo?.name}</Text>
                            }
                        </TouchableOpacity>
                    }

                    <View style={{ marginTop: ms(10) }}>
                        <SubmitButton
                            {...{
                                text: "Send",
                                loading: false,
                                onPress: () => { }
                            }}
                        />
                    </View>

                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default AddVideoScreen 