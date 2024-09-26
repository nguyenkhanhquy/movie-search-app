import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme as usePaperTheme } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";

const Layout = () => {
    const { theme } = useTheme();
    const paperTheme = usePaperTheme();

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color }) => {
                    let iconName = "";

                    if (route.name === "index") {
                        iconName = "home";
                    } else if (route.name === "movies") {
                        iconName = "movie";
                    } else if (route.name === "tvshows") {
                        iconName = "television";
                    } else if (route.name === "user") {
                        iconName = "account";
                    }

                    return <MaterialCommunityIcons name={iconName} size={28} color={color} />;
                },

                tabBarActiveTintColor: theme === "dark" ? "#BB86FC" : "#6200EE",
                tabBarInactiveTintColor: theme === "dark" ? "#B0B0B0" : "#A0A0A0",
                tabBarStyle: {
                    backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
                },
            })}
        >
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="movies" options={{ title: "Movies" }} />
            <Tabs.Screen name="tvshows" options={{ title: "TVShows" }} />
            <Tabs.Screen name="user" options={{ title: "Profile" }} />
            <Tabs.Screen name="detail" options={{ title: "Details", tabBarButton: () => null }} />
            <Tabs.Screen name="search" options={{ title: "search", tabBarButton: () => null }} />
        </Tabs>
    );
};

export default Layout;
