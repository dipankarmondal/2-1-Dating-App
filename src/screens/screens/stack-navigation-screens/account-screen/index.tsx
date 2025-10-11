/**React Imports */
import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'

/**Local imports*/
import { AccountScreenStyles as styles } from './styles'
import { EditAccountBuilder } from '../../../../utils/builders'
import { ms } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import CustomInput from '../../../../components/form-utils/custom-input'
import SubmitButton from '../../../../components/submit-button'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'

/** Liabary*/
import { useForm } from 'react-hook-form'

/**Main export*/
const AccountScreen: React.FC = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { control, handleSubmit, setValue } = useForm()

    const onSubmit = (data: any) => {
        console.log("object", data)
    }

    const handleDeleteAcount = () => {
        setShowDeleteModal(true)
    }

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
                                loading: false,
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