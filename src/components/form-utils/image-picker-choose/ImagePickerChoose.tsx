/**React Imports */
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

/** Liabary*/
import { Controller } from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';

/**Local imports*/
import { ImagePickerChooseStyles as styles } from './styles'
import Formfields from '../../../utils/models/FormFields.json';
import { ms } from '../../../utils/helpers/responsive';
import { IconProps } from '../../../utils/helpers/Iconprops';
import { Colors } from '../../../utils/constant/Constant';
import { ImagePickerChooseProps } from '../../../utils/types/types';

/**Icons*/
import CameraIcon from '@svgs/camera.svg';
import CrossIcon from '@svgs/cross.svg';

/**Main export*/
const ImagePickerChoose: React.FC<ImagePickerChooseProps> = ({ name, parent, control, label, }) => {

    const Fields = Formfields;
    const FieldName = parent ? Fields[parent][name] : Fields[name];

    const launchGallery = async (onChange: any, value: any[]) => {
        try {
            const result = await ImagePicker.launchImageLibrary({
                mediaType: "photo",
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
                        {label ? (
                            <Text style={styles.dt_select_label}>{FieldName?.label}</Text>
                        ) : null}
                        <View style={styles.imageContainer}>
                            {/* Add Photo Button */}
                            <TouchableOpacity
                                style={styles.addBox}
                                onPress={() => launchGallery(onChange, value)}
                            >
                                <View style={styles.cameraIcon}>
                                    <CameraIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                                </View>
                                <Text style={styles.addText}>Add Photos</Text>
                            </TouchableOpacity>
                            {/* Existing Images */}
                            {value?.map((uri: string, index: number) => (
                                <View key={index} style={styles.imageBox}>
                                    <Image source={{ uri }} style={styles.imagePreview} />
                                    <TouchableOpacity
                                        style={styles.removeBtn}
                                        onPress={() => {
                                            const updated = value.filter((_: any, i: number) => i !== index);
                                            onChange(updated);
                                        }}
                                    >
                                        <CrossIcon {...IconProps(ms(13))} fill={Colors.dt_white} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                );
            }}
        />
    )
}

export default ImagePickerChoose 