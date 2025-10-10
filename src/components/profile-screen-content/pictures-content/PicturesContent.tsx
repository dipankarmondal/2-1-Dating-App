/**React Imports */
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

/**Local imports*/
import { ms, spacing } from '../../../utils/helpers/responsive'
import { UploadPhotoBuilder } from '../../../utils/builders'
import { Colors, Fonts } from '../../../utils/constant/Constant'

/** Liabary*/
import { useForm } from 'react-hook-form'

/**Components */
import FilePickerInput from '../../form-utils/file-picker-input/FilePickerInput'
import SubmitButton from '../../submit-button'

/**Main export*/
const PicturesContent: React.FC = () => {

    const { control, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        console.log("object", data)
    }

    return (
        <View style={styles.dt_container}>
            <Text style={styles.dt_header_text}>Your primary picture has to be a vanilla (non-adult) picture. Due to Google & Apple policy we do not allow adult pictures as primary profile pictures.</Text>
            {UploadPhotoBuilder(control).map((item, index) => {
                if (item.type === 'photo') {
                    return <FilePickerInput key={index} {...item} />;
                } else {
                    return null;
                }
            })}
            <View style={{ marginTop: ms(5) }}>
                <SubmitButton
                    {...{
                        text: "Submit",
                        loading: false,
                        onPress: handleSubmit(onSubmit),
                    }}
                />
            </View>
        </View>
    )
}

export default PicturesContent

const styles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
    dt_header_text: {
        fontSize: ms(14),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white,
        marginBottom: ms(15)
    }
})
