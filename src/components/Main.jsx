import { useFetch } from "../context/FetchContext";
import Flag from "react-world-flags";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import languageToCountryCode from '../mappings/languageToCountryCode'

export default function Main() {

    const { movies, isLoading, error } = useFetch();

    function renderStars(vote) {
        const fullStars = Math.ceil(vote);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-warning" />
                ))}
            </>
        );
    }

    if (isLoading) {
        return <p>Caricamento...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <>
            <main className="container my-4">
                <div className="row">
                    {movies.map((movie) => {
                        const countryCode = languageToCountryCode[movie.original_language] || "UN";

                        return (
                            <div className="col-md-3 mb-4" key={`${movie.type}-${movie.id}`}>
                                <div className="card h-100">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        className="card-img-top"
                                        alt={movie.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">
                                            <strong>Titolo Originale:</strong> {movie.original_title}
                                        </p>
                                        <p className="card-text d-flex align-items-center">
                                            <strong className="me-2">Lingua:</strong>
                                            <Flag
                                                code={countryCode}
                                                style={{ width: "24px", height: "16px" }}
                                                className="me-2"
                                            />
                                            {movie.original_language.toUpperCase()}
                                        </p>
                                        <p className="card-text">
                                            <strong>Voto:</strong> {renderStars(Math.floor(movie.vote_average / 2))}
                                        </p>
                                        <p className="card-text">
                                            <strong>Tipo:</strong> {movie.type === "movie" ? "Film" : "Serie TV"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </>
    )
}