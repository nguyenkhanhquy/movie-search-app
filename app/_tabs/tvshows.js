import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TVshows = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.container}>TVshows Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default TVshows;
