import { View, Text, Image } from 'react-native'
import React from 'react'
import { NotFoundStyles as styles } from './styles'

type Props = {
    title: string,
    photo: any
}
const NotFound: React.FC<Props> = ({title, photo}) => {
    return (
        <View style={styles.dt_container}>
            <View style={styles.dt_image_container}>
                <Image source={photo} style={styles.dt_image} />
            </View>
            <Text style={styles.dt_text}>
                {title}
            </Text>
        </View>
    )
}

export default NotFound