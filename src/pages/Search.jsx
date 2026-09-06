import { useState, useRef, useEffect } from "react"
import { useSearchMoviesInfinite } from "../hooks/useMovies"
import { useDebouncedValue } from "../hooks/useDebouncedValue"
import MovieCard from '../components/MovieCard'

export default function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 400)
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchMoviesInfinite(debouncedQuery)

  const movies = data?.pages.flatMap((page) => page.results) ?? []
  const sentinelRef = useRef(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '400px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

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

      {data && movies.length === 0 && (
        <p className="text-gray-500">No movies found for "{debouncedQuery}".</p>
      )}

      {movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {hasNextPage && (
            <div ref={sentinelRef} className="h-10" />
          )}
          {isFetchingNextPage && (
            <p className="text-center text-gray-500 mt-4">Loading more...</p>
          )}
        </>
      )}
    </div>
  )
}