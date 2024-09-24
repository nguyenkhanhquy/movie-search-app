import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Movies = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.container}>Movies Screen</Text>
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

export default Movies;
