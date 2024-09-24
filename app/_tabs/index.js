import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";

const sampleMovieData = [
    { id: "1", title: "Inception", poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", vote_average: 8.8 },
    { id: "2", title: "Interstellar", poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", vote_average: 8.6 },
    { id: "3", title: "The Dark Knight", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", vote_average: 9.0 },
    { id: "4", title: "Pulp Fiction", poster_path: "/dM2w364MScsjFf8pfMbaWUcWrR.jpg", vote_average: 8.9 },
    { id: "5", title: "The Shawshank Redemption", poster_path: "/q6y0Go1tsGEsmtFryD0Jo3dEmqu.jpg", vote_average: 9.3 },
];

const sampleShowData = [
    { id: 1, title: "Stranger Things", poster_path: "/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg", vote_average: 8.6 },
    { id: 2, title: "Breaking Bad", poster_path: "/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg", vote_average: 8.9 },
    { id: 3, title: "The Witcher", poster_path: "/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg", vote_average: 8.2 },
    { id: 4, title: "The Queen's Gambit 1", poster_path: "/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg", vote_average: 8.8 },
    { id: 5, title: "The Mandalorian", poster_path: "/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg", vote_average: 8.9 },
    { id: 6, title: "The Crown", poster_path: "/hJfG3f5Hjs5f7JTmKa9uPzGUnfj.jpg", vote_average: 8.7 },
    { id: 7, title: "Dark", poster_path: "/apbrbWs8M9ly0pJYU5WXrpFbk1Z.jpg", vote_average: 8.8 },
    { id: 8, title: "The Boys", poster_path: "/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg", vote_average: 8.4 },
    { id: 9, title: "The Queen's Gambit 2", poster_path: "/340GjFEbHj0E3lE2w0iTUVq0CBz.jpg", vote_average: 8.6 },
    { id: 10, title: "Chernobyl", poster_path: "/hlLXt2t0PT6RRnjiUmoxyG1LTFi.jpg", vote_average: 9.4 },
];

const Home = () => {
    const renderMovieItem = ({ item }) => (
        <MovieCard
            movie={item}
            onPress={() => {
                console.log(`Pressed ${item.title} Card`);
            }}
        />
    );

    const renderShowItem = ({ item }) => (
        <TVShowCard
            show={item}
            onPress={() => {
                console.log(`Pressed ${item.title} Card`);
            }}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Movie Search App</Text>

            <Text>Movies</Text>
            <Carousel data={sampleMovieData} renderItem={renderMovieItem} />

            <Text>TV Shows</Text>
            <Carousel data={sampleShowData} renderItem={renderShowItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 16,
    },
});

export default Home;
