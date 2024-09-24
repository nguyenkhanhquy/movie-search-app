import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import Carousel from "../components/Carousel";
import TVShowCard from "../components/TVShowCard";

import { fetchRecommendTVShows, fetchPopularTVShows } from "../../utils/api";

const TVshows = () => {
    const router = useRouter();
    const [recommendTVShows, setRecommendTVShows] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const rcmShows = await fetchRecommendTVShows();
                setRecommendTVShows(rcmShows);

                const shows = await fetchPopularTVShows();
                setPopularTVShows(shows);
            } catch (error) {
                console.error("Failed to load data: ", error);
            }
        };

        loadData();
    }, []);

    const renderShowItem = ({ item }) => (
        <TVShowCard show={item} onPress={() => router.push(`/detail?tvShowId=${item.id}`)} />
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>TV Shows</Text>

            <Text style={styles.sectionText}>Recommend TV Shows</Text>
            <Carousel data={recommendTVShows} renderItem={renderShowItem} />

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

export default TVshows;
