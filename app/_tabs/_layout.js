import React from "react";
import { Tabs } from "expo-router";

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="movies" options={{ title: "Movies" }} />
            <Tabs.Screen name="tvshows" options={{ title: "TVShows" }} />
            <Tabs.Screen name="user" options={{ title: "Profile" }} />
            <Tabs.Screen name="detail" options={{ title: "Details" }} />
        </Tabs>
    );
};

export default Layout;
