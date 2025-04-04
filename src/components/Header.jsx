import { useFetch } from "../context/FetchContext"

export default function Header() {
    const { findMovie, setFindMovie } = useFetch();

    return (
        <>
            <header className="bg-dark text-white py-3">
                <div className="container d-flex align-items-center justify-content-between">
                    <h1 className="h3 mb-0">Boolflix</h1>

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

                    <button className="btn btn-outline-light">Login</button>
                </div>
            </header>
        </>
    )
}