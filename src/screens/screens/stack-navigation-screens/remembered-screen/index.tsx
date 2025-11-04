/**React Imports */
import { View } from 'react-native'
import React  from 'react'

/**Local imports*/
import { CommonStyles } from '../../common/CommonStyle'
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { DeleteRemember, GetRemember } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { toast } from '../../../../utils/helpers/responsive'

/**Components */
import ScreenLayout from '../../common/ScreenLayout'
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import UserInfoCard from '../../../../components/feed-content/userinfo-card/UserInfoCard'
import InfoCardLayoutOne from '../../../../components/user-info-card-layouts/InfoCardLayoutOne'
import Loader from '../../../../components/loader/Loader'
import NotFound from '../../../../components/notfound/NotFound'
import ModalAction from '../../../../components/modal/modal-action/ModalAction'
import ModalContent from '../../../../components/modal/modal-content/logout-content/ModalContent'

/** Liabary*/
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'

/**Main export*/
const RememberedScreen: React.FC = () => {
    const { Token } = useAuth();
    const Navigation = useNavigation();

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['remembered_sent'],
        queryFn: () => GetRemember(Token, "sent"),
    })

    const DeleteRememberMutation = useMutation({
        mutationFn: (id: any) => DeleteRemember(Token, id),
        onSuccess: (res: any) => {
            if(res?.success === true) {
                Navigation.goBack();
                toast("success", { title: res?.message });
            }
        }
    })

    const openDropdown = (id: any) => {
        setShowDropdown(true);
        setDeleteId(id);
    }

    const handleDelete = () => {
        DeleteRememberMutation.mutate(deleteId);
        setShowDropdown(false);
    }

    return (
        <ScreenLayout type="stack" title="Remembered">
            <ScrollContent contentContainerStyle={{ flexGrow: 1 }} onRefresh={refetch}>
                <View style={CommonStyles.dt_container}>
                    {isLoading ? <Loader /> :
                        data?.data?.length > 0 ? (
                            data?.data?.map((item: any, index: number) => {
                                return (
                                    <UserInfoCard
                                        key={index}
                                        {...{
                                            type: "user",
                                            isMore: true,
                                            isFilterOption: true,
                                            isGallery: item?.receiverId?.profile?.photos?.length > 0 ? true : false,
                                            profileImages: item?.receiverId?.profile?.photos,
                                            UserName: item?.receiverId?.username,
                                            userId: item?.receiverId?._id,
                                            openDropdown:()=> openDropdown(item?._id),
                                            isDelete: true
                                        }}
                                    >
                                        <InfoCardLayoutOne
                                            {...{
                                                item,
                                            }}
                                        />
                                    </UserInfoCard>
                                )
                            })
                        ) : (
                            <NotFound
                                {...{
                                    title: "You haven’t remembered any sent wishes yet. Once you send and save a wish, it will appear here for easy viewing",
                                    photo: require("@images/notFound/remembered_not.png"),
                                }}
                            />
                        )
                    }
                </View>
            </ScrollContent>
            <ModalAction
                isModalVisible={showDropdown}
                setModalVisible={setShowDropdown}
                headerText="Delete Remembered"
            >
                <ModalContent
                    {...{
                        setModal: setShowDropdown,
                        title: "Do you want to delete this remembered wish?",
                        successText: "Yes, Delete",
                        cancelText: "No, Cancel",
                        onSuccess: handleDelete
                    }}
                />
            </ModalAction>
        </ScreenLayout>
    )
}

export default RememberedScreen