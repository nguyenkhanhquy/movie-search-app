import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

const Settings = () => {
    const { clearAsyncStorage } = useUser();
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }]}>
            <Text style={[styles.headerText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>Settings</Text>

            <Text style={[styles.sectionText, { color: theme === "dark" ? "#FFFFFF" : "#000000" }]}>
                User Information
            </Text>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme === "dark" ? "#303030" : "#F5F5F5" }]}
                onPress={clearAsyncStorage}
            >
                <View style={styles.buttonContent}>
                    <Text style={[styles.buttonText, { color: theme === "dark" ? "#E0E0E0" : "#000000" }]}>
                        Clear All Data
                    </Text>
                    <MaterialIcons name="delete" size={28} color={"red"} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 20,
    },
    sectionText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "left",
    },
    button: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        marginHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        shadowColor: "#000000",
        elevation: 4,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 8,
    },
});

export default Settings;
