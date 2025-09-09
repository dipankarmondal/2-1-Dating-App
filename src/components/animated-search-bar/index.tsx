/**React Imports */
import React, { useRef, useState, forwardRef, useImperativeHandle, useMemo } from "react";
import { Animated, TextInput, TouchableOpacity, View, Text, ScrollView, Image, ActivityIndicator } from "react-native";

/**Local imports*/
import { Colors } from "../../utils/constant/Constant";
import { ms } from "../../utils/helpers/responsive";
import { IconProps } from "../../utils/helpers/Iconprops";
import { AnimatedSearchBarStyles as styles } from './styles'
import { SearchBarProps, SearchBarRef } from "../../utils/types/types";
import { SearchUser } from "../../utils/api-calls/content-api-calls/ContentApiCall";
import { useAuth } from "../../utils/context/auth-context/AuthContext";

/** Liabary*/
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";

/**Icons*/
import CrossIcon from "@svgs/cross.svg";
import RightIcon from "@svgs/angle-small-right.svg";

const AnimatedSearchBar = forwardRef<SearchBarRef, SearchBarProps>(({ headerHeight = 50 }, ref) => {
    const [visible, setVisible] = useState(false);
    const [inputText, setInputText] = useState(""); // immediate input
    const [query, setQuery] = useState(""); // debounced query for API

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const { Token } = useAuth();

    // Debounced function to update query
    const debouncedQuery = useMemo(
        () => debounce((text: string) => setQuery(text), 500),
        []
    );

    const handleChangeText = (text: string) => {
        setInputText(text);      // updates instantly for TextInput
        debouncedQuery(text);    // debounced for API
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["searchUser", query],
        queryFn: () => SearchUser(Token, query, 10),
        enabled: query.trim().length >= 3, // only search when query >= 3 chars
        staleTime: 0,
    });

    const open = () => {
        setVisible(true);
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const close = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setVisible(false);
            setInputText("");
            setQuery("");
        });
    };

    useImperativeHandle(ref, () => ({
        open,
        close,
    }));

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.searchContainer,
                {
                    top: headerHeight,
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <View style={styles.dt_search_input_wrapper}>
                <View style={styles.dt_search_box}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#ccc"
                        value={inputText}
                        onChangeText={handleChangeText}
                    />
                    {inputText.length > 0 && (
                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => {
                                setInputText("");
                                setQuery("");
                            }}
                        >
                            <CrossIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={styles.closeBtn_wrapper} onPress={close}>
                    <View style={styles.closeBtn}>
                        <CrossIcon {...IconProps(ms(18))} fill={Colors.dt_white} />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.dt_search_content}>
                    {isLoading && (
                        <View style={styles.dt_loading}>
                            <ActivityIndicator size={ms(13)} color={Colors.dt_border} />
                            <Text style={styles.dt_loading_text}>Loading...</Text>
                        </View>
                    )}
                    {!isLoading && !isError && data?.data?.length === 0 && (
                        <Text style={[styles.dt_loading_text, { textAlign: "center" }]}>No results found</Text>
                    )}
                    {
                        data?.data?.map((item: any, index: number) => {
                            const userImage = item?.profile?.photos?.[0]
                                ? { uri: item.profile.photos[0] } // remote image
                                : require("@images/user.png");
                            return (
                                <TouchableOpacity key={index} style={styles.dt_search_header}>
                                    <View style={styles.dt_search_header_wrapper}>
                                        <View style={styles.dt_search_user_image}>
                                            <Image source={userImage} style={styles.dt_image} />
                                        </View>
                                        <View>
                                            <Text style={styles.dt_search_user_name}>{item?.username}</Text>
                                            <Text style={styles.dt_search_user_id}>{item?.email}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.dt_search_header_action}>
                                        <RightIcon {...IconProps(ms(20))} fill={Colors.dt_white} />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </Animated.View>
    );
});

export default AnimatedSearchBar;
