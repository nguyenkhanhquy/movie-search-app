import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";

import { fetchSearchResults, fetchSimilarMovies, fetchSimilarTVShows } from "../../utils/api";

import { useLocalSearchParams, useRouter } from "expo-router";

const Search = () => {
    const router = useRouter();
    const { query } = useLocalSearchParams();

    const [searchResults, setSearchResults] = useState([]);
    const [similarItems, setSimilarItems] = useState([]);
    const [itemType, setItemType] = useState(null);

    useEffect(() => {
        const searchMoviesOrShows = async () => {
            try {
                const results = await fetchSearchResults(query);
                if (results.length > 0) {
                    const isMovie = !!results[0].title;
                    setSearchResults(results);
                    setItemType(isMovie ? "movie" : "tv");

                    const fetchSimilar = isMovie ? fetchSimilarMovies : fetchSimilarTVShows;
                    const similarItems = await fetchSimilar(results[0].id);
                    setSimilarItems(similarItems);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        searchMoviesOrShows();
    }, [query]);

    const renderSearchResultItem = ({ item }) => {
        const isMovie = !!item.title;

        return isMovie ? (
            <MovieCard movie={item} onPress={() => router.push(`/detail?movieId=${item.id}`)} />
        ) : (
            <TVShowCard show={item} onPress={() => router.push(`/detail?tvShowId=${item.id}`)} />
        );
    };

    const renderSimilarItem = ({ item }) => {
        return itemType === "movie" ? (
            <MovieCard movie={item} onPress={() => router.push(`/detail?movieId=${item.id}`)} />
        ) : (
            <TVShowCard show={item} onPress={() => router.push(`/detail?tvShowId=${item.id}`)} />
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Search Results for "{query}"</Text>
            <Carousel data={searchResults} renderItem={renderSearchResultItem} />
            {similarItems.length > 0 && (
                <>
                    <Text style={styles.sectionText}>Similar {itemType === "movie" ? "Movies" : "TV Shows"}</Text>
                    <Carousel data={similarItems} renderItem={renderSimilarItem} />
                </>
            )}
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
        marginBottom: 20,
        marginTop: 20,
    },
    sectionText: {
        fontSize: 18,
        fontWeight: "500",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "left",
    },
});

export default Search;
