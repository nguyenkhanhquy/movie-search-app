import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../context/UserContext";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import Carousel from "../components/Carousel";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = () => {
    const router = useRouter();

    const { username, updateUsername, watched, setWatched, toWatch, setToWatch, clearAsyncStorage } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(username);
    const { theme, toggleTheme } = useTheme();

    const handleEditPress = () => {
        setIsEditing(true);
    };

    const handleSavePress = () => {
        updateUsername(newUsername);
        setIsEditing(false);
    };

    const handleAddToWatched = async (item) => {
        const newWatched = [...watched, item];
        setWatched(newWatched);
        await AsyncStorage.setItem("watched", JSON.stringify(newWatched));

        handleRemoveFromToWatch(item);
    };

    const handleAddToToWatch = async (item) => {
        const newToWatch = [...toWatch, item];
        setToWatch(newToWatch);
        await AsyncStorage.setItem("toWatch", JSON.stringify(newToWatch));

        handleRemoveFromWatched(item);
    };

    const handleRemoveFromWatched = async (item) => {
        const newWatched = watched.filter((i) => i.id !== item.id);
        setWatched(newWatched);
        await AsyncStorage.setItem("watched", JSON.stringify(newWatched));
    };

    const handleRemoveFromToWatch = async (item) => {
        const newToWatch = toWatch.filter((i) => i.id !== item.id);
        setToWatch(newToWatch);
        await AsyncStorage.setItem("toWatch", JSON.stringify(newToWatch));
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
                            <MaterialIcons
                                name="playlist-add"
                                size={28}
                                color={theme === "dark" ? "#FFFFFF" : "#000000"}
                            />
                        </TouchableOpacity>
                    )}
                    {isToWatch && !isWatched && (
                        <TouchableOpacity onPress={() => handleAddToWatched(item)}>
                            <MaterialIcons
                                name="done-outline"
                                size={28}
                                color={theme === "dark" ? "#FFFFFF" : "#000000"}
                            />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => (isWatched ? handleRemoveFromWatched(item) : handleRemoveFromToWatch(item))}
                    >
                        <MaterialIcons
                            name="remove-circle-outline"
                            size={28}
                            color={theme === "dark" ? "#FFFFFF" : "#000000"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }]}>
            <View style={styles.topPadding}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {isEditing ? (
                            <TextInput
                                style={[styles.usernameInput, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}
                                value={newUsername}
                                onChangeText={setNewUsername}
                                onSubmitEditing={handleSavePress}
                                returnKeyType="done"
                            />
                        ) : (
                            <Text style={[styles.username, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                                Hi, {username}!
                            </Text>
                        )}

                        <TouchableOpacity onPress={isEditing ? handleSavePress : handleEditPress}>
                            <MaterialIcons
                                name={isEditing ? "check" : "edit"}
                                size={28}
                                color={theme === "dark" ? "#FFFFFF" : "#000000"}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                        <Feather
                            name={theme === "dark" ? "sun" : "moon"}
                            size={28}
                            color={theme === "dark" ? "#FFFFFF" : "#000000"}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.sectionTitle, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                    Watched Movies and TV Shows
                </Text>
                {watched.length > 0 ? (
                    <Carousel data={watched} renderItem={({ item }) => renderItems(item, "watched")} />
                ) : (
                    <Text style={[styles.noItemsText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                        No items in this list
                    </Text>
                )}

                <Text style={[styles.sectionTitle, , { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                    To Watch Movies and TV Shows
                </Text>
                {toWatch.length > 0 ? (
                    <Carousel data={toWatch} renderItem={({ item }) => renderItems(item, "toWatch")} />
                ) : (
                    <Text style={[styles.noItemsText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                        No items in this list
                    </Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
        fontSize: 30,
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
        fontSize: 20,
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
