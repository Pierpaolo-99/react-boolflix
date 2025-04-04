import { useFetch } from "../context/FetchContext";
import Card from "../card/Card";

export default function Main() {
    const { movies, isLoading, error } = useFetch();

    if (isLoading) {
        return <p>Caricamento...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <main className="container my-4">
            <div className="row">
                {movies.map(movie => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </div>
        </main>
    );
}