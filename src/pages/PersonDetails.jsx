import { useParams } from 'react-router-dom'
import { usePersonDetails, usePersonMovieCredits } from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'

export default function PersonDetails() {
  const { id } = useParams()
  const { data: person, isLoading, isError, error, refetch } = usePersonDetails(id)
  const { data: credits } = usePersonMovieCredits(id)

  if (isLoading) return <p>Loading...</p>

  if (isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  const photoUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : null

  const movies = credits?.cast
    ?.slice()
    .sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''))

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6">
        {photoUrl ? (
          <img src={photoUrl} alt={person.name} className="w-40 sm:w-48 mx-auto sm:mx-0 self-start rounded-lg shrink-0" />
        ) : (
          <div className="w-40 sm:w-48 mx-auto sm:mx-0 self-start aspect-[2/3] rounded-lg bg-gray-200 shrink-0" />
        )}
        <div>
          <h1 className="text-2xl font-bold">{person.name}</h1>
          {person.birthday && (
            <p className="text-sm text-gray-600 mt-1">Born: {person.birthday}</p>
          )}
          {person.biography && (
            <p className="mt-3 whitespace-pre-line">{person.biography}</p>
          )}
        </div>
      </div>

      {movies && movies.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-3">Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}