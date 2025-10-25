/**React Imports */
import { View, ScrollView } from 'react-native'
import React, { use, useEffect, useState } from 'react'

/**Local imports*/
import { AccountScreenStyles as styles } from './styles'
import { EditAccountBuilder } from '../../../../utils/builders'
import { ms, toast } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import CustomInput from '../../../../components/form-utils/custom-input'
import SubmitButton from '../../../../components/submit-button'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'

/** Liabary*/
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { UpdateAccount } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountSchema } from '../../../../utils/schemas/Schemas'
import { useNavigation } from '@react-navigation/native'

/**Main export*/
const AccountScreen: React.FC = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { control, handleSubmit, setValue } = useForm<any>({
        resolver: yupResolver(AccountSchema),
    })

    const { user, Token } = useAuth()
    const Navigation = useNavigation<any>()

    const AccountUpdateMutation = useMutation({
        mutationFn: (data: any) => UpdateAccount(Token, data),
        onSuccess: (res) => {
            console.log("object", res)
            if (res?.success === true) {
                toast("success", { title: res?.message });
                Navigation.goBack()
            }
        }
    })


    const onSubmit = (data: any) => {
        const payload = {
            email: data?.email,
            password: data?.confirm_password
        }
        AccountUpdateMutation.mutate(payload)
    }

    const handleDeleteAcount = () => {
        setShowDeleteModal(true)
    }

    useEffect(() => {
        setValue("email", user?.email || "")
    }, [])

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "Account",
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    {EditAccountBuilder(control).map((item, index) => {
                        if (item.type === 'text' || item.type === 'textarea' || item.type === 'password') {
                            return <CustomInput key={index} {...item} />;
                        } else {
                            return null;
                        }
                    })}
                    <View style={{ marginTop: ms(10) }}>
                        <SubmitButton
                            {...{
                                text: "Submit",
                                loading: AccountUpdateMutation.isPending,
                                onPress: handleSubmit(onSubmit)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: ms(10) }}>
                        <SubmitButton
                            {...{
                                text: "Delete Account",
                                loading: false,
                                onPress: handleDeleteAcount,
                                type: "delete"
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <ModalAction
                isModalVisible={showDeleteModal}
                setModalVisible={setShowDeleteModal}
                headerText="Delete your account?"
            >
                <ModalContent
                    {...{
                        setModal: setShowDeleteModal,
                        title: `Are you sure you want to delete your account?`,
                        successText: "Yes, Delete",
                        cancelText: "No, Keep it",
                        onSuccess: () => {
                            setShowDeleteModal(false);
                        }
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default AccountScreen