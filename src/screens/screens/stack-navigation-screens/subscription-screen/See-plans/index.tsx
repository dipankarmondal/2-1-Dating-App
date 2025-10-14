/**React Imports */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

/** Liabary*/
import RazorpayCheckout from 'react-native-razorpay';

/**Local imports*/
import { SubscriptionScreenStyles as styles } from '../styles'
import { ms } from '../../../../../utils/helpers/responsive'
import { IconProps } from '../../../../../utils/helpers/Iconprops'
import { Colors } from '../../../../../utils/constant/Constant'

/**Components */
import ScreenLayout from '../../../common/ScreenLayout'

/**Icons*/
import AngleDown from '@svgs/angle-down.svg'
import AngleUp from '@svgs/angle-up.svg'
import FetaureCheck from '@svgs/feature_check.svg'
import ShieldCheck from '@svgs/shield-check.svg'

/**Main export*/
const SeePlans: React.FC = () => {
    const [expandedFeatureIndex, setExpandedFeatureIndex] = useState(null);
    const [expandedPermissionIndex, setExpandedPermissionIndex] = useState(null);

    const toggleFeature = (index: number) => {
        setExpandedFeatureIndex(expandedFeatureIndex === index ? null : index);
    };

    const togglePermission = (index: number) => {
        setExpandedPermissionIndex(expandedPermissionIndex === index ? null : index);
    };

    const handlePayment = async (orderId: string, amount: string) => {
        const amountInCents = Number(amount) * 100;

        // if (!orderId) {
        //     toast("error", { title: "Order ID not found. Please try again." });
        //     return;
        // }
        try {
            const options = {
                description: 'Get your subscription',
                image: 'https://your-logo-url.png',
                currency: 'INR',
                key: 'rzp_test_3WmknLIqcUo9er',
                amount: amountInCents,
                name: '2+1 Dating',
                // order_id: orderId,
                prefill: {
                    email: 'test@example.com',
                    contact: '9999999999',
                    name: 'Test User',
                },
                theme: { color: Colors.dt_border }
            };

            RazorpayCheckout.open(options)
                .then((data: any) =>
                    console.log("object", data)
                )
                .catch((error: any) => {
                    console.log(`Payment Error: ${error.code} | ${error.description}`);
                });
        } catch (err) {
            console.error('HandlePayment error:', err);
        }
    };

    return (
        <ScreenLayout
            {...{
                type: "stack",
                title: "All Plans",
            }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.dt_container}>
                    <View style={styles.dt_content_header}>
                        <Text style={styles.dt_content_header_text}>Subscription plan</Text>
                        <Text style={styles.dt_content_header_subtext}>Simple, transparent pricing</Text>
                    </View>
                    {
                        AllPlans.map((item, index) => {
                            const showAllFeatures = expandedFeatureIndex === index;
                            const showAllPermissions = expandedPermissionIndex === index;

                            const visibleFeatures = showAllFeatures
                                ? item?.featureItem
                                : item?.featureItem?.slice(0, 2);

                            const visiblePermissions = showAllPermissions
                                ? item?.permissionItem
                                : item?.permissionItem?.slice(0, 2);

                            return (
                                <View key={index} style={styles.dt_subscription_info_card}>
                                    <Text style={styles.dt_plan_header_text}>{item?.title}</Text>
                                    <Text style={[styles.dt_content_header_subtext, { textAlign: "left", marginTop: ms(-5) }]}>
                                        {item?.text}
                                    </Text>
                                    <View style={styles.dt_price_container}>
                                        <Text style={styles.dt_price_text}>₹ {item?.price}</Text>
                                        <TouchableOpacity style={styles.dt_price_button} onPress={() => handlePayment("", item?.price)}>
                                            <Text style={styles.dt_price_button_text}>Get</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.dt_content_info_box} onPress={() => toggleFeature(index)}>
                                            <Text style={styles.dt_content_info}>{item?.features}</Text>
                                            {showAllFeatures ? (
                                                <AngleUp {...IconProps(ms(19))} fill={Colors.dt_primary_green} />
                                            ) : (
                                                <AngleDown {...IconProps(ms(19))} fill={Colors.dt_primary_green} />
                                            )}

                                        </TouchableOpacity>
                                        <View style={styles.dt_features_container}>
                                            {
                                                visibleFeatures?.map((item) => {
                                                    return (
                                                        <View style={styles.dt_image_text_container} key={item.id}>
                                                            <FetaureCheck {...IconProps(ms(16))} fill={Colors.dt_primary_green} />
                                                            <Text style={styles.dt_image_text}>{item.text}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    <View style={{ marginTop: ms(20) }}>
                                        <TouchableOpacity style={styles.dt_content_info_box} onPress={() => togglePermission(index)}>
                                            <Text style={styles.dt_content_info}>Permissions</Text>
                                            {showAllPermissions ? (
                                                <AngleUp {...IconProps(ms(19))} fill={Colors.dt_primary_green} />
                                            ) : (
                                                <AngleDown {...IconProps(ms(19))} fill={Colors.dt_primary_green} />
                                            )}
                                        </TouchableOpacity>
                                        <View style={styles.dt_features_container}>
                                            {
                                                visiblePermissions?.map((item) => {
                                                    return (
                                                        <View style={styles.dt_image_text_container} key={item.id}>
                                                            <ShieldCheck {...IconProps(ms(16))} fill={Colors.dt_primary_green} />
                                                            <Text style={styles.dt_image_text}>{item.text}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </ScreenLayout>
    )
}

export default SeePlans


const AllPlans = [
    {
        title: "1 Month Premium",
        text: "Unlock all features and connect with like-minded individuals for 1 month",
        price: "2407",
        features: "Feature",
        featureItem: [
            {
                id: 1,
                text: "Unlimited likes per day"
            },
            {
                id: 2,
                text: "Super likes to stand out (5 limit)"
            },
            {
                id: 3,
                text: "Profile boosts for more visibility (1 limit)"
            },
            {
                id: 4,
                text: "Undo accidental swipes"
            },
        ],
        permissions: "Permissions",
        permissionItem: [
            {
                id: 1,
                text: "unlimited likes"
            },
            {
                id: 2,
                text: "see who liked"
            },
            {
                id: 3,
                text: "premium filters"
            },
            {
                id: 4,
                text: "boost profile"
            },
            {
                id: 5,
                text: "super likes"
            },
            {
                id: 6,
                text: "read receipts"
            },
            {
                id: 7,
                text: "unlimited rewinds"
            },
            {
                id: 8,
                text: "hide ads"
            },
        ]
    },
    {
        title: "3 Months Premium",
        text: "Best value for serious daters - 3 months of premium features",
        price: "4731",
        features: "Feature",
        featureItem: [
            {
                id: 1,
                text: "Unlimited likes per day"
            },
            {
                id: 2,
                text: "Super likes to stand out (5 limit)"
            },
            {
                id: 3,
                text: "Profile boosts for more visibility (1 limit)"
            },
            {
                id: 4,
                text: "Undo accidental swipes"
            },
        ],
        permissions: "Permissions",
        permissionItem: [
            {
                id: 1,
                text: "unlimited likes"
            },
            {
                id: 2,
                text: "see who liked"
            },
            {
                id: 3,
                text: "premium filters"
            },
            {
                id: 4,
                text: "boost profile"
            },
            {
                id: 5,
                text: "super likes"
            },
            {
                id: 6,
                text: "read receipts"
            },
            {
                id: 7,
                text: "unlimited rewinds"
            },
            {
                id: 8,
                text: "hide ads"
            },
        ]
    },
    {
        title: "6 Months Premium",
        price: "6972",
        text: "Most popular plan - 6 months of premium features with maximum value",
        features: "Feature",
        featureItem: [
            {
                id: 1,
                text: "Unlimited likes per day"
            },
            {
                id: 2,
                text: "Super likes to stand out (5 limit)"
            },
            {
                id: 3,
                text: "Profile boosts for more visibility (1 limit)"
            },
            {
                id: 4,
                text: "Undo accidental swipes"
            },
        ],
        permissions: "Permissions",
        permissionItem: [
            {
                id: 1,
                text: "unlimited likes"
            },
            {
                id: 2,
                text: "see who liked"
            },
            {
                id: 3,
                text: "premium filters"
            },
            {
                id: 4,
                text: "boost profile"
            },
            {
                id: 5,
                text: "super likes"
            },
            {
                id: 6,
                text: "read receipts"
            },
            {
                id: 7,
                text: "unlimited rewinds"
            },
            {
                id: 8,
                text: "hide ads"
            },
        ]
    },
    {
        title: "12 Months Premium",
        price: "11454",
        text: "Ultimate value - 1 year of premium features at the best price per month",
        features: "Feature",
        featureItem: [
            {
                id: 1,
                text: "Unlimited likes per day"
            },
            {
                id: 2,
                text: "Super likes to stand out (5 limit)"
            },
            {
                id: 3,
                text: "Profile boosts for more visibility (1 limit)"
            },
            {
                id: 4,
                text: "Undo accidental swipes"
            },
        ],
        permissions: "Permissions",
        permissionItem: [
            {
                id: 1,
                text: "unlimited likes"
            },
            {
                id: 2,
                text: "see who liked"
            },
            {
                id: 3,
                text: "premium filters"
            },
            {
                id: 4,
                text: "boost profile"
            },
            {
                id: 5,
                text: "super likes"
            },
            {
                id: 6,
                text: "read receipts"
            },
            {
                id: 7,
                text: "unlimited rewinds"
            },
            {
                id: 8,
                text: "hide ads"
            },
        ]
    },
]