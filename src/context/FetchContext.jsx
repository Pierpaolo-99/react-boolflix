import { createContext, useContext, useState, useEffect } from "react";

const FetchContext = createContext();

export function FetchProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [findMovie, setFindMovie] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const api_key = import.meta.env.VITE_API_KEY;

    function fetchMoviesAndSeries() {
        if (!findMovie.trim()) {
            setMovies([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        const movieFetch = fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${findMovie}&language=it-IT`
        ).then((res) => res.json());

        const seriesFetch = fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${findMovie}&language=it-IT`
        ).then((res) => res.json());

        Promise.all([movieFetch, seriesFetch])
            .then(([movieData, seriesData]) => {
                const Movies = (movieData.results || []).map((movie) => ({
                    id: movie.id,
                    title: movie.title,
                    original_title: movie.original_title,
                    original_language: movie.original_language,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    type: "movie",
                }));

                const Series = (seriesData.results || []).map((series) => ({
                    id: series.id,
                    title: series.name,
                    original_title: series.original_name,
                    original_language: series.original_language,
                    poster_path: series.poster_path,
                    vote_average: series.vote_average,
                    type: "tv",
                }));

                setMovies([...Movies, ...Series]);
            })
            .catch((err) => setError("Errore durante la fetch"))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        fetchMoviesAndSeries();
    }, [findMovie]);

    return (
        <FetchContext.Provider
            value={{
                movies,
                findMovie,
                setFindMovie,
                isLoading,
                error,
                fetchMoviesAndSeries,
            }}
        >
            {children}
        </FetchContext.Provider>
    );
}

export function useFetch() {
    return useContext(FetchContext);
}