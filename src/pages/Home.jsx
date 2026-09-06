import { useMoviesByCategory } from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'

const CATEGORIES = [
  { key: 'popular', label: 'Popular' },
  { key: 'now_playing', label: 'Now Playing' },
  { key: 'top_rated', label: 'Top Rated' },
  { key: 'upcoming', label: 'Upcoming' },
]

function MovieSection({ category, label }) {
  const { data, isLoading, isError, error } = useMoviesByCategory(category)

  if (isLoading) return <p>Loading {label}...</p>
  if (isError) return <p>Error loading {label}: {error.message}</p>

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-3">{label}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      {CATEGORIES.map((cat) => (
        <MovieSection key={cat.key} category={cat.key} label={cat.label} />
      ))}
    </div>
  )
}