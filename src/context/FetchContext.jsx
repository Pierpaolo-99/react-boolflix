import { createContext, useContext, useState, useEffect } from "react";

const FetchContext = createContext();

export function FetchProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
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

        const movieFetch = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${findMovie}&language=it-IT`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjZlYTIwMTgyZjNlZTViMDk3M2YzOTdjYTZiZGIyMCIsIm5iZiI6MTc0Mzc1NTg3MS4yNTUsInN1YiI6IjY3ZWY5YTVmZWRlOGQ4MmYzYmFkMTEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-V8nK3SDho9kkjdmq-uQ_omnBaq1mhHG7CB2QPG1Vc'
            }
        })
            .then((res) => res.json());

        const seriesFetch = fetch(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${findMovie}&language=it-IT`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjZlYTIwMTgyZjNlZTViMDk3M2YzOTdjYTZiZGIyMCIsIm5iZiI6MTc0Mzc1NTg3MS4yNTUsInN1YiI6IjY3ZWY5YTVmZWRlOGQ4MmYzYmFkMTEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-V8nK3SDho9kkjdmq-uQ_omnBaq1mhHG7CB2QPG1Vc'
            }
        })
            .then((res) => res.json());

        Promise.all([movieFetch, seriesFetch])
            .then(async ([movieData, seriesData]) => {
                const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=it-IT`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjZlYTIwMTgyZjNlZTViMDk3M2YzOTdjYTZiZGIyMCIsIm5iZiI6MTc0Mzc1NTg3MS4yNTUsInN1YiI6IjY3ZWY5YTVmZWRlOGQ4MmYzYmFkMTEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-V8nK3SDho9kkjdmq-uQ_omnBaq1mhHG7CB2QPG1Vc'
                    }
                });
                const genreData = await genreResponse.json();
                const genreMap = (genreData.genres || []).reduce((map, genre) => {
                    map[genre.id] = genre.name;
                    return map;
                }, {});
                setGenres(genreData.genres);

                const Movies = await Promise.all(
                    (movieData.results || []).map(async (movie) => {
                        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}`, {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjZlYTIwMTgyZjNlZTViMDk3M2YzOTdjYTZiZGIyMCIsIm5iZiI6MTc0Mzc1NTg3MS4yNTUsInN1YiI6IjY3ZWY5YTVmZWRlOGQ4MmYzYmFkMTEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-V8nK3SDho9kkjdmq-uQ_omnBaq1mhHG7CB2QPG1Vc'
                            }
                        });
                        const castData = await castResponse.json();
                        const cast = (castData.cast || []).slice(0, 5).map(actor => `${actor.name}`);
                        const genres = (movie.genre_ids || []).map(id => genreMap[id] || "Unknown");
                        return {
                            id: movie.id,
                            title: movie.title,
                            original_title: movie.original_title,
                            original_language: movie.original_language,
                            poster_path: movie.poster_path,
                            vote_average: movie.vote_average,
                            overview: movie.overview,
                            type: "movie",
                            cast,
                            genres,
                        };
                    })
                );

                const Series = await Promise.all(
                    (seriesData.results || []).map(async (series) => {
                        const castResponse = await fetch(`https://api.themoviedb.org/3/tv/${series.id}/credits?api_key=${api_key}`, {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjZlYTIwMTgyZjNlZTViMDk3M2YzOTdjYTZiZGIyMCIsIm5iZiI6MTc0Mzc1NTg3MS4yNTUsInN1YiI6IjY3ZWY5YTVmZWRlOGQ4MmYzYmFkMTEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-V8nK3SDho9kkjdmq-uQ_omnBaq1mhHG7CB2QPG1Vc'
                            }
                        });
                        const castData = await castResponse.json();
                        const cast = (castData.cast || []).slice(0, 5).map(actor => `${actor.name}`);
                        const genres = (series.genre_ids || []).map(id => genreMap[id] || "Unknown");
                        return {
                            id: series.id,
                            title: series.name,
                            original_title: series.original_name,
                            original_language: series.original_language,
                            poster_path: series.poster_path,
                            vote_average: series.vote_average,
                            type: "tv",
                            cast,
                            genres,
                        };
                    })
                );

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
                genres,
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