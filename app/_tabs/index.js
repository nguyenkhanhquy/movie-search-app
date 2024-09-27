import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import SearchBar from "../components/SearchBar";

import { fetchPopularMovies, fetchPopularTVShows, fetchSearchResults } from "../../utils/api";

const Home = () => {
    const router = useRouter();
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { theme } = useTheme();

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

    const handleQueryChange = async (query) => {
        setSearchQuery(query);

        if (query.length > 1) {
            try {
                const results = await fetchSearchResults(query);
                setSuggestions(results);
            } catch (error) {
                console.error("Failed to load search suggestions: ", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleQuerySubmit = (event) => {
        const query = event.nativeEvent.text.trim();
        if (query.length > 0) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    const renderMovieItem = ({ item }) => (
        <MovieCard movie={item} onPress={() => router.push(`/detail?movieId=${item.id}`)} />
    );

    const renderShowItem = ({ item }) => (
        <TVShowCard show={item} onPress={() => router.push(`/detail?tvShowId=${item.id}`)} />
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }]}>
            <Text style={[styles.headerText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                Movie Search App
            </Text>

            <SearchBar
                query={searchQuery}
                onQueryChange={handleQueryChange}
                onQuerySubmit={handleQuerySubmit}
                suggestions={suggestions}
            />

            <Text style={[styles.sectionText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                Popular Movies
            </Text>
            <Carousel data={popularMovies} renderItem={renderMovieItem} />

            <Text style={[styles.sectionText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                Popular TV Shows
            </Text>
            <Carousel data={popularTVShows} renderItem={renderShowItem} />
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

export default Home;
