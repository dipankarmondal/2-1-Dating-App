import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { useForm } from 'react-hook-form'
import { ms, spacing, toast } from '../../../../utils/helpers/responsive'
import CustomInput from '../../../../components/form-utils/custom-input'
import { CreateGroupBuilder } from '../../../../utils/builders'
import DropdownInput from '../../../../components/form-utils/dropdown-input'
import SubmitButton from '../../../../components/submit-button'
import FilePickerInput from '../../../../components/form-utils/file-picker-input/FilePickerInput'
import CountryInput from '../../../../components/form-utils/country-input/CountryInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateNewGroup, UpdateGroup, UploadSingleContent } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useNavigation } from '@react-navigation/native'

type Props = {
    route: any
}

const CreateGroup: React.FC<Props> = ({ route }) => {

    const [CreateGroupPauload, setCreateGroupPauload] = useState({})

    const { control, handleSubmit, reset, setValue } = useForm()
    const { Token } = useAuth()
    const Navigation = useNavigation()
    const QueryInvalidater = useQueryClient();
    const { type, data: updatedData } = route?.params || {}

    const CreateGroupsMutation = useMutation({
        mutationFn: (data: any) => CreateNewGroup(Token, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                reset()
                Navigation.goBack();
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['my_groups'] });
            }
        }
    })
    const UpdateGroupsMutation = useMutation({
        mutationFn: (data: any) => UpdateGroup(Token, updatedData?._id, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                toast("success", { title: res?.message });
                reset()
                QueryInvalidater.invalidateQueries({ queryKey: ['GroupAllData'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['my_groups'] });
                QueryInvalidater.invalidateQueries({ queryKey: ['single_group'] });
                Navigation.goBack();
            }
        }
    })

    const AddPhotoForGroupMutation = useMutation({
        mutationFn: (data: any) => UploadSingleContent(Token, data),
        onSuccess: (res) => {
            if (res?.success === true) {
                const payload = {
                    ...CreateGroupPauload,
                    coverImage: res?.data?.files?.original?.url
                }
                CreateGroupsMutation.mutate(payload)
            }
        }
    })

    const OnSubmit = (data: any) => {
        const TagsArray = Array.isArray(data?.tags)
            ? data?.tags // already array — use as-is
            : data?.tags
                ? data?.tags.split(',').map((item: string) => item.trim())
                : [];

        const GroupCreatePayload = {
            name: data?.group_name,
            location: data?.location?.name,
            category: data?.category,
            groupType: data?.group_type,
            targetAudience: data?.group_for,
            description: data?.group_desc,
            tags: TagsArray,
            rules: data?.rules
        }
        if (type === "edit") {
            UpdateGroupsMutation.mutate(GroupCreatePayload);
            return;
        }

        // ✅ Otherwise (create mode), first save payload and upload image
        setCreateGroupPauload(GroupCreatePayload);

        const Image = data?.file?.[0];
        if (Image?.uri) {
            const formData = new FormData();
            formData.append("file", {
                uri: Image.uri,
                type: Image.type,
                name: Image.fileName,
            });
            formData.append("folder", "groups");
            formData.append("optimize", true);
            formData.append("createThumbnail", true);

            AddPhotoForGroupMutation.mutate(formData);
        } else {
            // Optional fallback — if user didn’t pick a file, still create group
            toast("error", { title: "Please select a cover photo before creating the group" });
        }
    };

    useEffect(() => {
        if (updatedData) {
            setValue('group_name', updatedData?.name)
            setValue('location', updatedData?.location)
            setValue('category', updatedData?.category)
            setValue('group_type', updatedData?.groupType)
            setValue('group_for', updatedData?.targetAudience)
            setValue('group_desc', updatedData?.description)
            setValue('rules', updatedData?.rules)
            setValue('tags', updatedData?.tags)
            setValue('file', [{ uri: updatedData?.coverImage }])
        }
    }, [updatedData])


    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: type === "edit" ? "Edit Group" : "Create Group",
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style={styles.dt_container}>
                    {CreateGroupBuilder(control)
                        .filter(item => !(type === "edit" && item.name === "file"))
                        .map((item, index) => {
                            if (item.type === 'text' || item.type === 'textarea') {
                                return <CustomInput key={index} {...item} />;
                            } else if (item.type === "dropdown") {
                                return <DropdownInput key={index} {...item} />;
                            } else if (item.type === "photo") {
                                return <FilePickerInput key={index} {...item} />;
                            } else if (item.type === "location") {
                                return <CountryInput key={index} {...item} />;
                            } else {
                                return null;
                            }
                        })}
                    <View style={{ marginTop: ms(10) }}>
                        {
                            type === "edit" ?
                                <SubmitButton
                                    {...{
                                        text: "Edit Group",
                                        loading: UpdateGroupsMutation.isPending,
                                        onPress: handleSubmit(OnSubmit)
                                    }}
                                /> :
                                <SubmitButton
                                    {...{
                                        text: "Create Group",
                                        loading: CreateGroupsMutation.isPending || AddPhotoForGroupMutation.isPending,
                                        onPress: handleSubmit(OnSubmit)
                                    }}
                                />
                        }
                    </View>
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default CreateGroup

const styles = StyleSheet.create({
    dt_container: {
        flex: 1,
        padding: spacing.md
    },
})
