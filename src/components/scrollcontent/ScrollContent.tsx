import React, { useState } from "react";
import { ScrollView, RefreshControl, ScrollViewProps } from "react-native";
import { ScrollContentProps } from "../../utils/types/types";

const ScrollContent: React.FC<ScrollContentProps> = ({ onRefresh, children, ...props }) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await onRefresh();
        setRefreshing(false);
    };

    return (
        <ScrollView
            {...props}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >
            {children}
        </ScrollView>
    );
};

export default ScrollContent;
