/**React Imports */
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'

/**Local imports*/
import { FilePickerInputStyles as styles } from './styles'
import { ImagePickerChooseProps } from '../../../utils/types/types'
import Formfields from '../../../utils/models/FormFields.json';
import { ms } from '../../../utils/helpers/responsive';
import { Colors } from '../../../utils/constant/Constant';
import { IconProps } from '../../../utils/helpers/Iconprops';

/** Liabary*/
import * as ImagePicker from 'react-native-image-picker';
import { Controller } from 'react-hook-form';

/**Icons*/
import UploadIcon from '@svgs/upload.svg';

/**Main export*/
const FilePickerInput: React.FC<ImagePickerChooseProps> = ({ name, parent, control, label,isVideo }) => {

    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    const launchGallery = async (onChange: any, value: any[]) => {
        try {
            const result = await ImagePicker.launchImageLibrary({
                mediaType: isVideo ? "video" : "photo",
                selectionLimit: 0,
            });

            if (!result.didCancel && result.assets?.length > 0) {
                const newImages = result.assets.map(asset => asset.uri);
                onChange([...(value || []), ...newImages]);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, }, fieldState: { error } }) => {
         
                return (
                    <View style={{ marginBottom: ms(15) }}>
                        <TouchableOpacity style={styles.dt_container} activeOpacity={0.8} onPress={() => launchGallery(onChange, value)}>
                            <UploadIcon {...IconProps(ms(24))} fill={Colors.dt_white} />
                            <Text style={styles.dt_text}>{FieldName?.placeholder}</Text>
                        </TouchableOpacity>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[[styles.dt_images_wrapper, { marginTop: value?.length > 0 ? ms(16) : 0 }]]}
                        >
                            {Array.isArray(value) && value.map((imgPath, index) => (
                                <View key={index} style={styles.dt_image_container}>
                                    <Image
                                        source={isVideo ? require("@images/play.png") : { uri: imgPath }}
                                        style={[styles.dt_image,{resizeMode: isVideo ? "contain" : "cover"}]}
                                    />
                                    <View style={styles.dt_image_overlay}>
                                        <TouchableOpacity
                                            style={styles.dt_remove_btn}
                                            onPress={() => onChange(value.filter((_, i) => i !== index))}
                                        >
                                            <Text style={styles.dt_remove_text}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )
            }}
        />
    )
}

export default FilePickerInput