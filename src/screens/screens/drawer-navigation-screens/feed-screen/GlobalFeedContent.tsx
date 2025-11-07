/**React Imports */
import { View, Text } from 'react-native'
import React from 'react'

/**Local imports*/
import { useAuth } from '../../../../utils/context/auth-context/AuthContext'
import { GetGlobalFeed, GetUser } from '../../../../utils/api-calls/content-api-calls/ContentApiCall'
import { CommonStyles } from '../../common/CommonStyle'
import { ms } from '../../../../utils/helpers/responsive'

/** Liabary*/
import { useQuery } from '@tanstack/react-query'

/**Components */
import ScrollContent from '../../../../components/scrollcontent/ScrollContent'
import Loader from '../../../../components/loader/Loader'

type Props = {
    activeKey: string
}

/**Main export*/
const GlobalFeedContent: React.FC<Props> = ({ activeKey }) => {
    const { Token } = useAuth()

    const { data, isLoading } = useQuery({
        queryKey: ['GetUser'],
        queryFn: () => GetUser(Token),
        enabled: !!Token,
    })
    const { data: GlobalFeedData, isLoading: globalLiader, refetch } = useQuery({
        queryKey: ['global_feed', activeKey === "global_feeds"],
        queryFn: () => GetGlobalFeed(Token),
        enabled: !!Token,
    })

    const NewData = GlobalFeedData?.data?.filter((item: any) => item?.type === "friend_request") ?? [];

    return (
        <ScrollContent
            contentContainerStyle={{ flexGrow: 1, }}
            onRefresh={refetch}
        >
            <View style={[CommonStyles.dt_container, { gap: ms(16), }]}>
                {
                    globalLiader ? <Loader/> :
                    <Text style={{color:"white"}}>
                        Work in progress...
                    </Text>
                }
            </View>
        </ScrollContent>
    )
}

export default GlobalFeedContent