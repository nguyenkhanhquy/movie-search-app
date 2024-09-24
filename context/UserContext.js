import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState("User");
    const [watched, setWatched] = useState([]);
    const [toWatch, setToWatch] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const storageUsername = await AsyncStorage.getItem("username");
            const watchedData = await AsyncStorage.getItem("watched");
            const toWatchData = await AsyncStorage.getItem("toWatch");

            if (storageUsername) {
                setUsername(JSON.parse(storageUsername));
            }

            if (watchedData) {
                setWatched(JSON.parse(watchedData));
            }

            if (toWatchData) {
                setToWatch(JSON.parse(toWatchData));
            }
        };

        loadData();
    }, []);

    const updateUsername = async (newUsername) => {
        setUsername(newUsername);
        await AsyncStorage.setItem("username", newUsername);
    };

    return (
        <UserContext.Provider value={{ username, updateUsername, watched, toWatch, setWatched, setToWatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
