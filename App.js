import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "Un thriller de science-fiction où les rêves deviennent réalité.",
      posterURL: "https://via.placeholder.com/150",
      note: 9,
      trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
      id: 2,
      title: "Titanic",
      description: "Une romance tragique à bord d’un navire inoubliable.",
      posterURL: "https://via.placeholder.com/150",
      note: 8,
      trailer: "https://www.youtube.com/embed/kVrqfYjkTdQ"
    }
  ]);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterNote, setFilterNote] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    note: 0,
    trailer: ""
  });

  const handleAddMovie = () => {
    const newId = Date.now();
    setMovies([...movies, { ...newMovie, id: newId, note: Number(newMovie.note) }]);
    setNewMovie({ title: "", description: "", posterURL: "", note: 0, trailer: "" });
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
      movie.note >= filterNote
  );

  return (
    <Router>
      <div className="App">
        <h1>🎬 Ma bibliothèque de films</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Filtres */}
                <div className="filter">
                  <input
                    type="text"
                    placeholder="Filtrer par titre"
                    onChange={(e) => setFilterTitle(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Note minimum"
                    min="0"
                    max="10"
                    onChange={(e) => setFilterNote(Number(e.target.value))}
                  />
                </div>

                {/* Formulaire d'ajout */}
                <div className="add-movie">
                  <input
                    type="text"
                    placeholder="Titre"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newMovie.posterURL}
                    onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Lien bande-annonce (YouTube embed)"
                    value={newMovie.trailer}
                    onChange={(e) => setNewMovie({ ...newMovie, trailer: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Note"
                    value={newMovie.note}
                    onChange={(e) => setNewMovie({ ...newMovie, note: e.target.value })}
                    min="0"
                    max="10"
                  />
                  <button onClick={handleAddMovie}>Ajouter</button>
                </div>

                {/* Liste des films */}
                <div className="movie-list">
                  {filteredMovies.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className="card-link">
                      <div className="card">
                        <img src={movie.posterURL} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>⭐ Note : {movie.note}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            }
          />

          <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

// ✅ Composant page de détails
function MovieDetails({ movies }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) return <p>Film non trouvé</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>⭐ Note : {movie.note}</p>
      <div style={{ margin: "20px 0" }}>
        <iframe
          width="560"
          height="315"
          src={movie.trailer}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button onClick={() => navigate("/")}>⬅ Retour à l'accueil</button>
    </div>
  );
}

export default App;
