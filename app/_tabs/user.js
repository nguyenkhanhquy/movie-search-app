import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../context/UserContext";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import Carousel from "../components/Carousel";
import { MaterialIcons } from "@expo/vector-icons";

const User = () => {
    const router = useRouter();

    const { username, updateUsername, watched, setWatched, toWatch, setToWatch, clearAsyncStorage } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(username);

    const handleEditPress = () => {
        setIsEditing(true);
    };

    const handleSavePress = () => {
        updateUsername(newUsername);
        setIsEditing(false);
    };

    const handleAddToWatched = async (item) => {
        setWatched((prev) => [...prev, item]);
        setToWatch((prev) => prev.filter((i) => i.id !== item.id));
    };

    const handleAddToToWatch = async (item) => {
        setToWatch((prev) => [...prev, item]);
        setWatched((prev) => prev.filter((i) => i.id !== item.id));
    };

    const handleRemoveFromWatched = async (item) => {
        setWatched((prev) => prev.filter((i) => i.id !== item.id));
    };

    const handleRemoveFromToWatch = async (item) => {
        setToWatch((prev) => prev.filter((i) => i.id !== item.id));
    };

    const renderItems = (item, listType) => {
        const isWatched = listType === "watched";
        const isToWatch = listType === "toWatch";

        return (
            <View style={styles.cardContainer} key={item.id}>
                {item.title ? (
                    <MovieCard movie={item} onPress={() => router.push(`/detail?movieId=${item.id}`)} />
                ) : (
                    <TVShowCard show={item} onPress={() => router.push(`/detail?tvShowId=${item.id}`)} />
                )}

                <View style={styles.cardActions}>
                    {isWatched && !isToWatch && (
                        <TouchableOpacity onPress={() => handleAddToToWatch(item)}>
                            <MaterialIcons name="playlist-add" size={28} color="black" />
                        </TouchableOpacity>
                    )}
                    {isToWatch && !isWatched && (
                        <TouchableOpacity onPress={() => handleAddToWatched(item)}>
                            <MaterialIcons name="done-outline" size={28} color="black" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => (isWatched ? handleRemoveFromWatched(item) : handleRemoveFromToWatch(item))}
                    >
                        <MaterialIcons name="remove-circle-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topPadding}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {isEditing ? (
                            <TextInput
                                style={styles.usernameInput}
                                value={newUsername}
                                onChangeText={setNewUsername}
                                onSubmitEditing={handleSavePress}
                                returnKeyType="done"
                            />
                        ) : (
                            <Text style={styles.username}>Hi, {username}!</Text>
                        )}

                        <TouchableOpacity onPress={isEditing ? handleSavePress : handleEditPress}>
                            <MaterialIcons name={isEditing ? "check" : "edit"} size={28} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Watched Movies and TV Shows</Text>
                {watched.length > 0 ? (
                    <Carousel data={watched} renderItem={({ item }) => renderItems(item, "watched")} />
                ) : (
                    <Text style={styles.noItemsText}>No items in this list</Text>
                )}

                <Text style={styles.sectionTitle}>To Watch Movies and TV Shows</Text>
                {toWatch.length > 0 ? (
                    <Carousel data={toWatch} renderItem={({ item }) => renderItems(item, "toWatch")} />
                ) : (
                    <Text style={styles.noItemsText}>No items in this list</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={clearAsyncStorage}>
                    <Text>Clear All Data</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    button: {
        backgroundColor: "gray",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    topPadding: {
        paddingTop: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    username: {
        fontSize: 32,
        fontWeight: "bold",
        marginRight: 8,
    },
    usernameInput: {
        fontSize: 24,
        fontWeight: "bold",
        marginRight: 8,
        borderBottomWidth: 1,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8,
    },
    noItemsText: {
        fontSize: 16,
        marginTop: 8,
        marginBottom: 16,
        textAlign: "left",
    },
    cardContainer: {
        marginBottom: 16,
    },
    cardActions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 8,
    },
    themeButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
});

export default User;
