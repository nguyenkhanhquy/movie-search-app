import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";

const sampleData = [
    { id: "1", title: "Inception", poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", vote_average: 8.8 },
    { id: "2", title: "Interstellar", poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", vote_average: 8.6 },
    { id: "3", title: "The Dark Knight", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", vote_average: 9.0 },
    { id: "4", title: "Pulp Fiction", poster_path: "/dM2w364MScsjFf8pfMbaWUcWrR.jpg", vote_average: 8.9 },
    { id: "5", title: "The Shawshank Redemption", poster_path: "/q6y0Go1tsGEsmtFryD0Jo3dEmqu.jpg", vote_average: 9.3 },
];

const Home = () => {
    const renderItem = ({ item }) => (
        <MovieCard
            movie={item}
            onPress={() => {
                console.log(`Pressed ${item.title} Card`);
            }}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Home Screen</Text>
            <Carousel data={sampleData} renderItem={renderItem} />
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
