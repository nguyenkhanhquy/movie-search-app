import React from "react";
import { View, Text, StyleSheet } from "react-native";

const User = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.container}>User Screen</Text>
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

export default User;
