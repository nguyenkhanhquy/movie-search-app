import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";

import { fetchRecommendMovies, fetchPopularMovies } from "../../utils/api";

const Movies = () => {
    const router = useRouter();
    const [recommendMovies, setRecommendMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        const loadData = async () => {
            try {
                const rcmMovies = await fetchRecommendMovies();
                setRecommendMovies(rcmMovies);

                const movies = await fetchPopularMovies();
                setPopularMovies(movies);
            } catch (error) {
                console.error("Failed to load data: ", error);
            }
        };

        loadData();
    }, []);

    const renderMovieItem = ({ item }) => (
        <MovieCard movie={item} onPress={() => router.push(`/detail?movieId=${item.id}`)} />
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }]}>
            <Text style={[styles.headerText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>Movies</Text>

            <Text style={[styles.sectionText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                Recommend Movies
            </Text>
            <Carousel data={recommendMovies} renderItem={renderMovieItem} />

            <Text style={[styles.sectionText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                Popular Movies
            </Text>
            <Carousel data={popularMovies} renderItem={renderMovieItem} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#FFFFFF",
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 20,
    },
    sectionText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "left",
    },
});

export default Movies;
