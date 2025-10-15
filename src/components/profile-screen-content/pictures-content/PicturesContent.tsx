/**React Imports */
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

/**Local imports*/
import { ms, spacing, toast } from '../../../utils/helpers/responsive'
import { AudltPhotoBuilder, UploadPhotoBuilder } from '../../../utils/builders'
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
const PicturesContent: React.FC<Props> = ({ data }) => {

    const { control: ProfileControl, handleSubmit: ProfileHandleSubmit, reset } = useForm()
    const { control: AudltControl, handleSubmit: AudltHandleSubmit } = useForm()
    const [isActiveAudlt, setIsActiveAudlt] = React.useState(false)
    const QueryInvalidater = useQueryClient();

    const { Token, user } = useAuth()

    const ProfilePhotoMutation = useMutation({
        mutationFn: (data: any) => UploadProfilePhotos(Token, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                reset();
                QueryInvalidater.invalidateQueries({ queryKey: ['userPhotoLiabary', user?.id] });
            }
        }
    })
    const AudltPhotoMutation = useMutation({
        mutationFn: (data: any) => UploadSingleContent(Token, data),
        onSuccess: (res) => {
            console.log("object",res)
            if (res?.success === true) {
                toast("success", { title: res?.message });
                reset();
                // QueryInvalidater.invalidateQueries({ queryKey: ['userPhotoLiabary', user?.id] });
            }
        }
    })

    const onProfileSubmit = (data: any) => {
        const file = data?.profile_photo[0];
        const formData = new FormData();
        formData.append("profilePhoto", {
            uri: file.uri,
            type: file.type,
            name: file.fileName || "photo.jpg"
        });
        formData.append("folder", "profile");
        formData.append("optimize", true);

        ProfilePhotoMutation.mutate(formData);
    }

    const onAudltSubmit = (data: any) => {
        const file = data?.adult_photo[0];
        const formData = new FormData();
        formData.append("file", {
            uri: file.uri,
            type: file.type,
            name: file.fileName || "photo.jpg"
        });
        formData.append("folder", "posts");
        formData.append("isAdultContent", data?.adult_photo?.length > 0);
        formData.append("optimize", true);

        AudltPhotoMutation.mutate(formData);
    }

    return (
        <View style={styles.dt_container}>
            <Text style={styles.dt_header_text}>Your primary picture has to be a vanilla (non-adult) picture. Due to Google & Apple policy we do not allow adult pictures as primary profile pictures.</Text>
            <View style={styles.dt_audlt_container}>
                <Text style={styles.dt_audlt_text}>Want to upload an adult picture?</Text>
                <ToggleSwitch
                    {...{
                        isActive: isActiveAudlt,
                        onToggle: () => {
                            setIsActiveAudlt(!isActiveAudlt)
                        },
                    }
                    }
                />
            </View>
            {UploadPhotoBuilder(ProfileControl).map((item, index) => {
                if (item.type === 'photo') {
                    return <FilePickerInput key={index} {...item} />;
                } else {
                    return null;
                }
            })}
            <View style={{ marginTop: ms(5), marginBottom: ms(20) }}>
                <SubmitButton
                    {...{
                        text: "Submit Profile",
                        loading: ProfilePhotoMutation.isPending,
                        onPress: ProfileHandleSubmit(onProfileSubmit),
                    }}
                />
            </View>

            {
                isActiveAudlt && (
                    <>
                        {AudltPhotoBuilder(AudltControl).map((item, index) => {
                            if (item.type === 'photo') {
                                return <FilePickerInput key={index} {...item} />;
                            } else {
                                return null;
                            }
                        })}
                        <View style={{ marginTop: ms(5) }}>
                            <SubmitButton
                                {...{
                                    text: "Submit Adult",
                                    loading: AudltPhotoMutation.isPending,
                                    onPress: AudltHandleSubmit(onAudltSubmit),
                                }}
                            />
                        </View>
                    </>
                )
            }
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
