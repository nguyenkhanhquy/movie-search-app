import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";

import { fetchPopularMovies, fetchPopularTVShows } from "../../utils/api";

const Home = () => {
    const router = useRouter();
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const movies = await fetchPopularMovies();
                setPopularMovies(movies);

                const shows = await fetchPopularTVShows();
                setPopularTVShows(shows);
            } catch (error) {
                console.error("Failed to load data: ", error);
            }
        };

        loadData();
    }, []);

    const renderMovieItem = ({ item }) => (
        <MovieCard movie={item} onPress={() => router.push(`/detail?movieId=${item.id}`)} />
    );

    const renderShowItem = ({ item }) => (
        <TVShowCard show={item} onPress={() => router.push(`/detail?tvShowId=${item.id}`)} />
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Movie Search App</Text>

            <Text style={styles.sectionText}>Popular Movies</Text>
            <Carousel data={popularMovies} renderItem={renderMovieItem} />

            <Text style={styles.sectionText}>Popular TV Shows</Text>
            <Carousel data={popularTVShows} renderItem={renderShowItem} />
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

export default Home;
