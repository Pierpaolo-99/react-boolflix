import { useState, useEffect } from "react"
import Flag from "react-world-flags";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function App() {

  const [movies, setMovies] = useState([])
  const [findMovie, setFindMovie] = useState('')

  const languageToCountryCode = {
    en: "US",
    it: "IT",
    fr: "FR",
    ja: "JP",
    ko: "KR",
    es: "ES",
    de: "DE",
    zh: "CN",
    ru: "RU",
    pt: "PT",
    hi: "IN",
    ar: "SA",
    bn: "BD",
    ur: "PK",
    tr: "TR",
    vi: "VN",
    fa: "IR",
    sw: "KE",
    nl: "NL",
    pl: "PL",
  };

  const api_key = import.meta.env.VITE_API_KEY;

  function fetchMoviesAndSeries() {
    if (!findMovie.trim()) {
      setMovies([]);
      return;
    }

    const movieFetch = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${findMovie}&language=it-IT`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjZlYTIwMTgyZjNlZTViMDk3M2YzOTdjYTZiZGIyMCIsIm5iZiI6MTc0Mzc1NTg3MS4yNTUsInN1YiI6IjY3ZWY5YTVmZWRlOGQ4MmYzYmFkMTEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-V8nK3SDho9kkjdmq-uQ_omnBaq1mhHG7CB2QPG1Vc'
        },
      }
    ).then((res) => res.json());

    const seriesFetch = fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${findMovie}&language=it-IT`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjZlYTIwMTgyZjNlZTViMDk3M2YzOTdjYTZiZGIyMCIsIm5iZiI6MTc0Mzc1NTg3MS4yNTUsInN1YiI6IjY3ZWY5YTVmZWRlOGQ4MmYzYmFkMTEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-V8nK3SDho9kkjdmq-uQ_omnBaq1mhHG7CB2QPG1Vc'
        },
      }
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
      .catch((err) => console.error("Errore durante la fetch:", err));
  }

  useEffect(() => {
    fetchMoviesAndSeries();
  }, [findMovie]);

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
  );
}