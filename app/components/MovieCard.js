import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const MovieCard = ({ movie, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
            <View style={styles.shadowContainer}>
                <Card style={[styles.card, { backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF" }]}>
                    <Card.Cover
                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                        style={styles.cover}
                    />
                    <Card.Content style={styles.content}>
                        <Title style={[styles.title, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                            {movie.title}
                        </Title>
                        <Paragraph style={styles.paragraph}>Rating: {movie.vote_average}</Paragraph>
                    </Card.Content>
                </Card>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 150,
        margin: 8,
    },
    shadowContainer: {
        borderRadius: 8,
        overflow: "hidden",
        elevation: 4,
    },
    card: {
        flex: 1,
        borderRadius: 8,
        width: "100%",
        height: 300,
    },
    cover: {
        width: "100%",
        height: 200,
    },
    content: {
        paddingVertical: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    paragraph: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
    },
});

export default MovieCard;
