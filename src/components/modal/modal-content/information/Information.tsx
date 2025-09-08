import { View, Text } from 'react-native'
import React from 'react'
import { InformationStyles as styles } from './styles'
import { benefitsData } from '../../../common/helper';

const Information: React.FC = () => {

    const BulletPoint = ({ text }: { text: string }) => (
        <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>{text}</Text>
        </View>
    );

    const BenefitSection = ({ title, items }: { title: string; items: { id: number; text: string }[] }) => (
        <View style={styles.benefitsSection}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.map((item) => (
                <BulletPoint key={item.id} text={item.text} />
            ))}
        </View>
    );
    return (
        <View>
            {/* Main Description */}
            <View style={styles.descriptionSection}>
                <Text style={styles.descriptionText}>
                    Your SDC membership offers access to both Website and iPhone / Android app.
                </Text>
            </View>

            {/* Render All Sections */}
            {benefitsData.map((section, index) => (
                <BenefitSection key={index} title={section.title} items={section.items} />
            ))}
        </View>
    )
}

export default Information
