/**React Imports */
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

/**Local imports*/
import { ms, spacing, toast } from '../../../utils/helpers/responsive'
import { AudltPhotoBuilder, NonAudltPhotoBuilder, UploadPhotoBuilder } from '../../../utils/builders'
import { Colors, Fonts } from '../../../utils/constant/Constant'

/** Liabary*/
import { useForm } from 'react-hook-form'

/**Components */
import FilePickerInput from '../../form-utils/file-picker-input/FilePickerInput'
import SubmitButton from '../../submit-button'
import ToggleSwitch from '../../toggle-switch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UploadProfilePhotos, UploadSingleContent } from '../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../utils/context/auth-context/AuthContext'

type Props = {
    data: any
}

/**Main export*/
const photoConfigs = [
    {
        key: "profile",
        builder: UploadPhotoBuilder,
        mutationFn: UploadProfilePhotos,
        formField: "profile_photo",
        folder: "profile",
        extraFields: { optimize: true },
        buttonText: "Submit Profile",
        invalidate: true,
    },
    {
        key: "adult",
        builder: AudltPhotoBuilder,
        mutationFn: UploadSingleContent,
        formField: "adult_photo",
        folder: "posts",
        extraFields: { isAdultContent: true, optimize: true },
        buttonText: "Submit Adult",
    },
    {
        key: "nonAdult",
        builder: NonAudltPhotoBuilder,
        mutationFn: UploadSingleContent,
        formField: "non_adult_photo",
        folder: "posts",
        extraFields: { isAdultContent: false, optimize: true },
        buttonText: "Submit NonAdult",
    },
];

const PicturesContent: React.FC<Props> = ({ data }) => {
    const { Token, user } = useAuth();
    const queryClient = useQueryClient();

    // reusable function to generate each section
    const renderPhotoSection = ({
        key,
        builder,
        mutationFn,
        formField,
        folder,
        extraFields,
        buttonText,
        invalidate,
    }: any) => {
        const { control, handleSubmit, reset } = useForm();

        const mutation = useMutation({
            mutationFn: (formData: any) => mutationFn(Token, formData),
            onSuccess: (res: any) => {
                if (res?.success) {
                    toast("success", { title: res?.message });
                    reset();
                    if (invalidate)
                        queryClient.invalidateQueries({
                            queryKey: ["userPhotoLiabary", user?.id],
                        });
                }
            },
        });

        const onSubmit = (formData: any) => {
            const file = formData?.[formField]?.[0];
            if (!file) return;

            const data = new FormData();
            data.append(
                folder === "profile" ? "profilePhoto" : "file",
                {
                    uri: file.uri,
                    type: file.type,
                    name: file.fileName || "photo.jpg",
                }
            );

            data.append("folder", folder);
            Object.entries(extraFields).forEach(([k, v]) => data.append(k, v));

            mutation.mutate(data);
        };

        return (
            <View key={key} style={{ marginBottom: ms(20) }}>
                {builder(control)
                    .filter((item: any) => item.type === "photo")
                    .map((item: any, i: number) => (
                        <FilePickerInput key={i} {...item} />
                    ))}

                <View style={{ marginTop: ms(5) }}>
                    <SubmitButton
                        text={buttonText}
                        loading={mutation.isPending}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.dt_container}>
                <Text style={styles.dt_header_text}>
                    Your primary picture has to be a vanilla (non-adult) picture. Due to
                    Google & Apple policy we do not allow adult pictures as primary profile
                    pictures.
                </Text>

                {photoConfigs.map((config) => renderPhotoSection(config))}
            </View>
        </ScrollView>
    );
};

export default PicturesContent;

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
    },
    dt_audlt_container: {
        width: "100%",
        backgroundColor: Colors.dt_border,
        elevation: 3,
        shadowColor: Colors.dt_white,
        padding: ms(10),
        borderRadius: ms(8),
        marginBottom: ms(20),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dt_audlt_text: {
        fontSize: ms(15),
        fontFamily: Fonts.Font_500,
        color: Colors.dt_white,
        flexShrink: 1
    }
})
