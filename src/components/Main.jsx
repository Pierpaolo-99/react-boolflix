import { useFetch } from "../context/FetchContext";
import Card from "../card/Card";
import { useState } from "react";

export default function Main() {
    const { movies, genres, isLoading, error, findMovie } = useFetch();
    const [selectedGenre, setSelectedGenre] = useState("");

    const filteredMovies = selectedGenre
        ? movies.filter(movie => movie.genres.includes(selectedGenre))
        : movies;

    if (isLoading) {
        return <p>Caricamento...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <main className="container my-4 main-content">
            {findMovie && (
                <div className="mb-3">
                    <label htmlFor="genre-select" className="form-label">
                        Filtra per genere:
                    </label>
                    <select
                        id="genre-select"
                        className="form-select"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Tutti i generi</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.name}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="row">
                {filteredMovies.map(movie => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </div>
        </main>
    );
}