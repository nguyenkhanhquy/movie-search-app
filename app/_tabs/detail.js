import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

import { fetchMovieDetails, fetchTVShowDetails, fetchMovieTrailer, fetchTVShowTrailer } from "../../utils/api";

const Detail = () => {
    const { movieId, tvShowId } = useLocalSearchParams();
    const isMovie = Boolean(movieId);
    const isTVShow = Boolean(tvShowId);

    const [details, setDetails] = useState(null);
    const [trailerId, setTrailerId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (isMovie) {
                    const movie = await fetchMovieDetails(movieId);
                    setDetails(movie);

                    const movieTrailerId = await fetchMovieTrailer(movieId);
                    setTrailerId(movieTrailerId);
                } else if (isTVShow) {
                    const tvShow = await fetchTVShowDetails(tvShowId);
                    setDetails(tvShow);

                    const tvShowTrailerId = await fetchTVShowTrailer(tvShowId);
                    setTrailerId(tvShowTrailerId);
                }
            } catch (error) {
                console.error("Failed to load data: ", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [movieId, tvShowId]);

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
