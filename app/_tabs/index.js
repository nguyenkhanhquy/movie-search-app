import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel from "../components/Carousel";

const sampleData = [
    { id: "1", title: "Movie 1" },
    { id: "2", title: "Movie 2" },
    { id: "3", title: "Movie 3" },
    { id: "4", title: "Movie 4" },
    { id: "5", title: "Movie 5" },
];
const renderItem = ({ item }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
        </View>
    );
};

const Home = () => {
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 16,
    },
    item: {
        width: Dimensions.get("window").width * 0.75,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 8,
        height: 180,
    },
    itemText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Home;
