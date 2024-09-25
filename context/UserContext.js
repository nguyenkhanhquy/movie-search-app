import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState("User");
    const [watched, setWatched] = useState([]);
    const [toWatch, setToWatch] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [storageUsername, watchedData, toWatchData] = await Promise.all([
                    AsyncStorage.getItem("username"),
                    AsyncStorage.getItem("watched"),
                    AsyncStorage.getItem("toWatch"),
                ]);

                if (storageUsername) {
                    setUsername(JSON.parse(storageUsername));
                }
                if (watchedData) {
                    setWatched(JSON.parse(watchedData));
                }
                if (toWatchData) {
                    setToWatch(JSON.parse(toWatchData));
                }
            } catch (error) {
                console.error("Failed to load data from AsyncStorage", error);
            }
        };

        loadData();
    }, []);

    const updateUsername = async (newUsername) => {
        try {
            await AsyncStorage.setItem("username", JSON.stringify(newUsername));

            setUsername(newUsername);
        } catch (error) {
            console.error("Failed to update username in AsyncStorage", error);
        }
    };

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear();

            setUsername("User");
            setWatched([]);
            setToWatch([]);
        } catch (error) {
            console.error("Failed to clear AsyncStorage", error);
        }
    };

    return (
        <UserContext.Provider
            value={{ username, updateUsername, watched, setWatched, toWatch, setToWatch, clearAsyncStorage }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
