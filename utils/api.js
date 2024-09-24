import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

// Fetching Popular Movies
export const fetchPopularMovies = async () => {
    try {
        const response = await api.get("/movie/popular");
        console.log("Popular Movies: ", response.data.results);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching Popular Movies: ", error);
        return [];
    }
};

// Fetching Popular TVShows
export const fetchPopularTVShows = async () => {
    try {
        const response = await api.get("/tv/popular");
        return response.data.results;
    } catch (error) {
        console.error("Error fetching Popular TVShows: ", error);
        return [];
    }
};
