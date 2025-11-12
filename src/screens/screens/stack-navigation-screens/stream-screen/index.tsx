import { View, Text, ScrollView } from 'react-native'
import React, { use } from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import { CommonStyles } from '../../common/CommonStyle'
import { useForm } from 'react-hook-form'
import CustomInput from '../../../../components/form-utils/custom-input'
import { SteramCreateBuilder } from '../../../../utils/builders'
import DropdownInput from '../../../../components/form-utils/dropdown-input'
import FilePickerInput from '../../../../components/form-utils/file-picker-input/FilePickerInput'
import SubmitButton from '../../../../components/submit-button'
import MultiselectInput from '../../../../components/form-utils/multiselect-input/MultiselectInput'
import { useMutation } from '@tanstack/react-query'
import { CreateLivestream } from '../../../../utils/api-calls/auth-calls/AuthCall'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'

const StreamScreen: React.FC = () => {
    const { control, handleSubmit, reset } = useForm()
    const { Token } = useAuth()

    const CreateStreamMutation = useMutation({
        mutationFn: (data: any) => CreateLivestream(Token, data),
        onSuccess: (res) => {
            console.log("object", res)
        }
    })

    const OnSubmit = (data: any) => {
        console.log("data", data)

        const payload = {
            title: data?.title,
            description: data?.description,
            category: data?.category,
            tags: data?.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
            maxViewers: data?.max_viewers,
            settings: {
                allowComments: data?.settings?.includes('Comments') || false,
                allowGifts: data?.settings?.includes('Gifts') || false,
                ageRestriction: data?.age_restriction,
                language: data?.language
            }
        }
    }

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Create Stream",
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={[CommonStyles.dt_container, { gap: 0 }]}>
                    {SteramCreateBuilder(control).map((item, index) => {
                        if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                            return <CustomInput key={index} {...item} />;
                        } else if (item?.type === "dropdown") {
                            return <DropdownInput key={index} {...item} />;
                        } else if (item?.type === "photo") {
                            return <FilePickerInput key={index} {...item} />
                        } else if (item?.type === "multi") {
                            return <MultiselectInput key={index} {...item} />
                        }
                    })}

                    <SubmitButton
                        {...{
                            text: "Create Stream",
                            loading: false,
                            onPress: handleSubmit(OnSubmit)
                        }}
                    />

                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default StreamScreen