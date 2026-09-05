import { useState } from "react"
import { useSearchMovies } from "../api/useMovies"
import MovieCard from '../components/MovieCard'

export default function Search() {
  const [query, setQuery] = useState('')
  const { data, isLoading, isError, error } = useSearchMovies(query)

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full border rounded-lg px-4 py-2 mb-6"
      />

      {query.trim().length === 0 && (
        <p className="text-gray-500">Start typing to search for movies.</p>
      )}

      {isLoading && <p>Searching...</p>}

      {isError && <p>Error: {error.message}</p>}

      {data && data.results.length === 0 && (
        <p className="text-gray-500">No movies found for "{query}".</p>
      )}

      {data && data.results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}