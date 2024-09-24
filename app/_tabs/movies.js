import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";

import { fetchRecommendMovies, fetchPopularMovies } from "../../utils/api";

const Movies = () => {
    const router = useRouter();
    const [recommendMovies, setRecommendMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);

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
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Movies</Text>

            <Text style={styles.sectionText}>Recommend Movies</Text>
            <Carousel data={recommendMovies} renderItem={renderMovieItem} />

            <Text style={styles.sectionText}>Popular Movies</Text>
            <Carousel data={popularMovies} renderItem={renderMovieItem} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
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
