import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
    timeout: 5000,
});

// Fetching Search Results
export const fetchSearchResults = async (query) => {
    try {
        const response = await api.get("/search/multi", {
            params: {
                query: query,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error Fetching Search Results: ", error);
        return [];
    }
};

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
        return response.data;
    } catch (error) {
        console.error("Error Fetching TVShow Details: ", error);
        throw error;
    }
};

// Fetching Movie Trailer
export const fetchMovieTrailer = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}/videos`, {
            params: {
                language: "en-US",
            },
        });

        const trailers = response.data.results.filter((video) => video.site === "YouTube" && video.type === "Trailer");
        return trailers.length ? trailers[0].key : null;
    } catch (error) {
        console.error("Error Fetching Movie Trailer: ", error);
        throw error;
    }
};

// Fetching TVShow Trailer
export const fetchTVShowTrailer = async (tvShowId) => {
    try {
        const response = await api.get(`/tv/${tvShowId}/videos`, {
            params: {
                language: "en-US",
            },
        });

        const trailers = response.data.results.filter((video) => video.site === "YouTube" && video.type === "Trailer");
        return trailers.length ? trailers[0].key : null;
    } catch (error) {
        console.error("Error Fetching TVShow Trailer: ", error);
        throw error;
    }
};

// Fetching Similar Movies
export const fetchSimilarMovies = async (movieId) => {
    try {
        const response = await api.get(`/movie/${movieId}/similar`);
        return response.data.results;
    } catch (error) {
        console.error("Error Fetching Similar Movies: ", error);
        return [];
    }
};

// Fetching Similar TVShows
export const fetchSimilarTVShows = async (tvShowId) => {
    try {
        const response = await api.get(`/tv/${tvShowId}/similar`);
        return response.data.results;
    } catch (error) {
        console.error("Error Fetching Similar TVShows: ", error);
        return [];
    }
};
