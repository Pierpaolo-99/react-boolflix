import { useFetch } from "../context/FetchContext";

export default function SearchBar() {
    const { findMovie, setFindMovie } = useFetch();

    return (
        <form className="input-group w-50">
            <input
                type="text"
                className="form-control"
                placeholder="Cerca un film o una serie TV..."
                aria-label="Cerca un film o una serie TV"
                value={findMovie}
                onChange={(e) => setFindMovie(e.target.value)}
            />
        </form>
    );
}