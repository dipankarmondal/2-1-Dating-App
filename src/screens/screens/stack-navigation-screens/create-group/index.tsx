import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ScreenLayout from '../../common/ScreenLayout'
import { useForm } from 'react-hook-form'
import { ms, spacing } from '../../../../utils/helpers/responsive'
import CustomInput from '../../../../components/form-utils/custom-input'
import { CreateGroupBuilder } from '../../../../utils/builders'
import DropdownInput from '../../../../components/form-utils/dropdown-input'
import SubmitButton from '../../../../components/submit-button'

const CreateGroup: React.FC = () => {

    const { control, handleSubmit, reset } = useForm()

    const OnSubmit = (data: any) => {
        console.log("object", data);
    };

    return (
        <ScreenLayout
            {...{
                type: "stack", 
                title: "Create Group",
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    {CreateGroupBuilder(control).map((item, index) => {
                        if (item.type === 'text' || item.type === 'textarea') {
                            return <CustomInput key={index} {...item} />;
                        } else if (item?.type === "dropdown") {
                            return <DropdownInput key={index} {...item} />
                        } else {
                            return null;
                        }
                    })}
                    <View style={{ marginTop: ms(10) }}>
                        <SubmitButton
                            {...{
                                text: "Create Group",
                                loading: false,
                                onPress: handleSubmit(OnSubmit)
                            }}
                        />
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
