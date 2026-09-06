import { useState } from 'react'
import { useGenres, useDiscoverMovies } from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)

const selectClass =
  'bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900'

export default function Discover() {
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [minRating, setMinRating] = useState('')
  const [sortBy, setSortBy] = useState('popularity.desc')

  const { data: genresData } = useGenres()
  const { data, isLoading, isError, error } = useDiscoverMovies({ genre, year, minRating, sortBy })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Discover Movies</h1>
      <p className="text-gray-500 text-sm mb-4">Browse the full catalog and filter by genre, year, rating or sort order.</p>

      <div className="flex flex-wrap gap-4 mb-6 bg-white rounded-lg shadow-sm p-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="genre-filter" className="text-xs font-medium text-gray-500 uppercase tracking-wide">Genre</label>
          <select id="genre-filter" value={genre} onChange={(e) => setGenre(e.target.value)} className={selectClass}>
            <option value="">All genres</option>
            {genresData?.genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="year-filter" className="text-xs font-medium text-gray-500 uppercase tracking-wide">Year</label>
          <select id="year-filter" value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
            <option value="">All years</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rating-filter" className="text-xs font-medium text-gray-500 uppercase tracking-wide">Min rating</label>
          <select id="rating-filter" value={minRating} onChange={(e) => setMinRating(e.target.value)} className={selectClass}>
            <option value="">Any rating</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="sort-filter" className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sort by</label>
          <select id="sort-filter" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
            <option value="popularity.desc">Most popular</option>
            <option value="vote_average.desc">Top rated</option>
            <option value="release_date.desc">Newest</option>
            <option value="release_date.asc">Oldest</option>
          </select>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      {data && data.results.length === 0 && (
        <p className="text-gray-500">No movies match these filters.</p>
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