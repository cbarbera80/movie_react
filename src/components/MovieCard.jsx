import { Link } from "react-router-dom"
import { useFavoritesStore } from '../store/useFavoritesStore'

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null
  const year = movie.release_date?.slice(0, 4)

  const isFavorite = useFavoritesStore((state) => state.isFavorite(movie.id))
  const addFavorite = useFavoritesStore((state) => state.addFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  function handleToggleFavorite(e) {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <Link to={`/movie/${movie.id}`} className="relative rounded-lg shadow-md overflow-hidden bg-white block">
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center text-lg"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      {posterUrl ? (
        <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
      ) : (
        <div className="w-full aspect-2/3 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          No image
        </div>
      )}
      <div className="p-2">
        <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{year}</span>
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}