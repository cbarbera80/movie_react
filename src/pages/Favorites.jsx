import { useFavoritesStore } from '../store/useFavoritesStore'
import MovieCard from '../components/MovieCard'

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites)

  if (favorites.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12">
        <p className="text-lg">No favorites yet</p>
        <p className="text-sm mt-1">Movies you save will show up here.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}