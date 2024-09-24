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
        return response.data.results;
    } catch (error) {
        console.error("Error Fetching Popular Movies: ", error);
        return [];
    }
};

// Fetching Popular TVShows
export const fetchPopularTVShows = async () => {
    try {
        const response = await api.get("/tv/popular");
        return response.data.results;
    } catch (error) {
        console.error("Error Fetching Popular TVShows: ", error);
        return [];
    }
};

// Fetching Recommend Movies
export const fetchRecommendMovies = async () => {
    try {
        const response = await api.get("/movie/top_rated");
        return response.data.results;
    } catch (error) {
        console.error("Error Fetching Recommend Movies: ", error);
        return [];
    }
};

// Fetching Recommend TVShows
export const fetchRecommendTVShows = async () => {
    try {
        const response = await api.get("/tv/top_rated");
        return response.data.results;
    } catch (error) {
        console.error("Error Fetching Recommend TVShows: ", error);
        return [];
    }
};

// Fetching Movie Details
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}`, {
            params: {
                append_to_response: "videos",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error Fetching Movie Details: ", error);
        throw error;
    }
};

// Fetching TVShow Details
export const fetchTVShowDetails = async (tvShowId) => {
    try {
        const response = await api.get(`/tv/${tvShowId}`, {
            params: {
                append_to_response: "videos",
            },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error Fetching TVShow Details: ", error);
        return [];
    }
};
