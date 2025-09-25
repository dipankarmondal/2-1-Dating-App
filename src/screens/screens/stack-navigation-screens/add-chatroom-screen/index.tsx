import { View, Text } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { AddChatroomScreenStyles as styles } from './styles'
import { useForm } from 'react-hook-form'
import { ChatroomBuilder } from '../../../../utils/builders'
import CustomInput from '../../../../components/form-utils/custom-input'
import DropdownInput from '../../../../components/form-utils/dropdown-input'
import SubmitButton from '../../../../components/submit-button'
import { ms } from '../../../../utils/helpers/responsive'

const AddChatroomScreen: React.FC = () => {
    const { control, handleSubmit, setValue, formState: { errors }, reset, } = useForm()

    const OnSubmit = (data: any) => {
        console.log("object", data);
    }
    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Personal Chatroom"
            }}
        >
            <View style={styles.dt_container}>
                <View >
                    <Text style={styles.dt_rules_text}>Create your own personal chatroom by choosing a topic of your liking or as a chatroom for a private event. You can turn on or off the visibility of your chatroom and decide if your chatroom is accessible by anybody or by invitation only. Once your chatroom is created you will receive a unique link to your chatroom to share with other members (e.g. friends, group members, party guests). A chatroom will be closed 2 hours after the last member has left or the chatroom being inactive.</Text>
                    <View style={styles.dt_form_container}>
                        {ChatroomBuilder(control)?.map((item, index) => {
                            if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                                return <CustomInput key={index} {...item} />;
                            } else if (item?.type === "dropdown") {
                                return <DropdownInput key={index} {...item} />
                            }
                        })}
                        <View style={{ marginTop: ms(10) }}>
                            <SubmitButton
                                {...{
                                    text: "Create Chatroom",
                                    loading: false,
                                    onPress: handleSubmit(OnSubmit)
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScreenLayout>
    )
}

export default AddChatroomScreen