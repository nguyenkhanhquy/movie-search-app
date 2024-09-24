import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Detail = () => {
    const { movieId, tvShowId } = useLocalSearchParams();
    const isMovie = Boolean(movieId);
    const isTVShow = Boolean(tvShowId);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {isMovie && `Id: ${movieId} form MovieCard`}
                {isTVShow && `Id: ${tvShowId} form TVShowCard`}
                {!isMovie && !isTVShow && "No Id Received"}
            </Text>
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
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Detail;
