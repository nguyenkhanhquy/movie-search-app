import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

import Carousel from "../components/Carousel";
import TVShowCard from "../components/TVShowCard";

import { fetchRecommendTVShows, fetchPopularTVShows } from "../../utils/api";

const TVshows = () => {
    const router = useRouter();
    const [recommendTVShows, setRecommendTVShows] = useState([]);
    const [popularTVShows, setPopularTVShows] = useState([]);
    const { theme } = useTheme();

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
        <ScrollView style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }]}>
            <Text style={[styles.headerText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>TV Shows</Text>

            <Text style={[styles.sectionText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                Recommend TV Shows
            </Text>
            <Carousel data={recommendTVShows} renderItem={renderShowItem} />

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
