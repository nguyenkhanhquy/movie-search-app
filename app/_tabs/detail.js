import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import Carousel from "../components/Carousel";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    fetchMovieDetails,
    fetchTVShowDetails,
    fetchMovieTrailer,
    fetchTVShowTrailer,
    fetchSimilarMovies,
    fetchSimilarTVShows,
} from "../../utils/api";

const Detail = () => {
    const router = useRouter();
    const { movieId, tvShowId } = useLocalSearchParams();
    const isMovie = Boolean(movieId);
    const isTVShow = Boolean(tvShowId);

    const [details, setDetails] = useState(null);
    const [trailerId, setTrailerId] = useState(null);
    const [similar, setSimilar] = useState([]);
    const { watched, toWatch, setWatched, setToWatch } = useUser();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (isMovie) {
                    const movie = await fetchMovieDetails(movieId);
                    setDetails(movie);

                    const movieTrailerId = await fetchMovieTrailer(movieId);
                    setTrailerId(movieTrailerId);

                    const similarMovies = await fetchSimilarMovies(movieId);
                    setSimilar(similarMovies);
                } else if (isTVShow) {
                    const tvShow = await fetchTVShowDetails(tvShowId);
                    setDetails(tvShow);

                    const tvShowTrailerId = await fetchTVShowTrailer(tvShowId);
                    setTrailerId(tvShowTrailerId);

                    const similarTVShows = await fetchSimilarTVShows(tvShowId);
                    setSimilar(similarTVShows);
                }
            } catch (error) {
                console.error("Failed to load data: ", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [movieId, tvShowId]);

    const handleMarkAsWatched = async () => {
        if (details) {
            const newWatched = [...watched, details];
            setWatched(newWatched);
            await AsyncStorage.setItem("watched", JSON.stringify(newWatched));
            console.log(`${details.title || details.name} added to watched list`);
        }
    };

    const handleMarkAsToWatch = async () => {
        if (details) {
            const newToWatch = [...toWatch, details];
            setToWatch(newToWatch);
            await AsyncStorage.setItem("toWatch", JSON.stringify(newToWatch));
            console.log(`${details.title || details.name} added to to watch list`);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loadingContainer} />;
    }

    if (!details) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No Details Available</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {trailerId ? (
                <View style={styles.videoContainer}>
                    <WebView
                        source={{ uri: `https://www.youtube.com/embed/${trailerId}` }}
                        style={styles.video}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsInlineMediaPlayback={true}
                        onError={(error) => console.error("Failed to load video: ", error)}
                    />
                </View>
            ) : (
                <Text style={styles.noTrailerText}>No Trailer Available</Text>
            )}

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{details.title || details.name}</Text>
                <Text style={styles.sectionTitle}>Overview</Text>
                <Text style={styles.text}>{details.overview}</Text>
                <Text style={styles.sectionTitle}>Rating</Text>
                <Text style={styles.text}>{details.vote_average}</Text>
                <Text style={styles.sectionTitle}>Release Date</Text>
                <Text style={styles.text}>{details.release_date || details.first_air_date}</Text>
                <Text style={styles.sectionTitle}>Runtime</Text>
                <Text style={styles.text}>{details.runtime ? `${details.runtime} minutes` : "N/A"}</Text>
                <Text style={styles.sectionTitle}>Genres</Text>
                <Text style={styles.text}>{details.genres?.map((genre) => genre.name).join(", ")}</Text>
                <Text style={styles.sectionTitle}>Production Companies</Text>
                <Text style={styles.text}>
                    {details.production_companies?.map((company) => company.name).join(", ") || "N/A"}
                </Text>
                <Text style={styles.sectionTitle}>Budget</Text>
                <Text style={styles.text}>{details.budget ? `$${details.budget.toLocaleString()}` : "N/A"}</Text>
                <Text style={styles.sectionTitle}>Revenue</Text>
                <Text style={styles.text}>{details.revenue ? `$${details.revenue.toLocaleString()}` : "N/A"}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleMarkAsWatched}>
                    <Text style={styles.buttonText}>Mark As Watched</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleMarkAsToWatch}>
                    <Text style={styles.buttonText}>Mark As To Watch</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.similarContainer}>
                <Text style={styles.similarTitle}>Similar {isMovie ? "Movies" : "TV Shows"}</Text>
                <Carousel
                    data={similar}
                    renderItem={({ item }) =>
                        movieId ? (
                            <MovieCard movie={item} onPress={() => router.push(`/detail?movieId=${item.id}`)} />
                        ) : (
                            <TVShowCard show={item} onPress={() => router.push(`/detail?tvShowId=${item.id}`)} />
                        )
                    }
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    videoContainer: {
        height: 200,
        marginBottom: 16,
        marginTop: 45,
    },
    video: {
        flex: 1,
    },
    detailsContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    noTrailerText: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 16,
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        marginHorizontal: 8,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    similarContainer: {
        marginTop: 16,
    },
    similarTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
});

export default Detail;
