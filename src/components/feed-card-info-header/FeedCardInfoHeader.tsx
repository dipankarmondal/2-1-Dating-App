import { View, Text } from 'react-native'
import React from 'react'
import {FeedCardInfoHeaderStyles as styles} from './styles'

type props = {
  title: string,
  subtext: string
}

const FeedCardInfoHeader: React.FC<props> = ({title, subtext}) => {
  return (
    <View style={styles.dt_container}>
      <Text style={styles.dt_title_text}>{title}</Text>
      <Text style={styles.dt_date_text}>{subtext}</Text>
    </View>
  )
}

export default FeedCardInfoHeader