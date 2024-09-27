import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from "react-native-paper";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme === "dark" ? "dark" : "light");

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem("theme");
                if (savedTheme) {
                    setTheme(savedTheme);
                }
            } catch (error) {
                console.error("Failed to load theme from AsyncStorage", error);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);

        try {
            await AsyncStorage.setItem("theme", newTheme);
        } catch (error) {
            console.error("Failed to save theme to AsyncStorage", error);
        }
    };

    const paperTheme = useMemo(() => {
        return theme === "dark" ? DarkTheme : DefaultTheme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <PaperProvider theme={paperTheme}>{children}</PaperProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
