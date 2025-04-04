import { useState, useEffect } from "react"


export default function App() {

  const [movies, setMovies] = useState([])
  const [findMovie, setFindMovie] = useState('')

  function fetchData() {

    const api_key = import.meta.env.VITE_API_KEY;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${findMovie}&language=it-IT`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjZlYTIwMTgyZjNlZTViMDk3M2YzOTdjYTZiZGIyMCIsIm5iZiI6MTc0Mzc1NTg3MS4yNTUsInN1YiI6IjY3ZWY5YTVmZWRlOGQ4MmYzYmFkMTEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-V8nK3SDho9kkjdmq-uQ_omnBaq1mhHG7CB2QPG1Vc'
      }
    })
      .then(res => res.json())
      .then(data => {
        setMovies(data.results)
        console.log(data.results);
      })
      .catch(err => console.error("Errore durante la fetch:", err));
  }

  function handleSearchSubmit(e) {
    e.preventDefault()

    fetchData()
  }

  return (
    <>
      <header className="bg-dark text-white py-3">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="h3 mb-0">Boolflix</h1>

          <form className="input-group w-50" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Cerca un film..."
              aria-label="Cerca un film"
              value={findMovie}
              onChange={(e) => setFindMovie(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Cerca
            </button>
          </form>

          <button className="btn btn-outline-light">Login</button>
        </div>
      </header>

      <main className="container my-4">
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-3 mb-4" key={movie.id}>
              <div className="card h-100">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    <strong>Titolo Originale:</strong> {movie.original_title} <br />
                    <strong>Lingua:</strong> {movie.original_language.toUpperCase()} <br />
                    <strong>Voto:</strong> {movie.vote_average.toFixed(1)}/10
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
