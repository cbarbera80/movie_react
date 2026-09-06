import { useParams } from 'react-router-dom'
import { useMovieDetail, useMovieCredits, useMovieVideos } from '../hooks/useMovies'
import { Link } from "react-router-dom"

export default function MovieDetail() {
  const { id } = useParams()
  const { data: movie, isLoading, isError, error, refetch } = useMovieDetail(id)
  const { data: credits } = useMovieCredits(id)
  const { data: videos } = useMovieVideos(id)

  const director = credits?.crew.find((person) => person.job === 'Director')
  const topCast = credits?.cast.slice(0, 8)
  const trailer = videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  if (isLoading) return <p>Loading...</p>

  if (isError) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null
  const year = movie.release_date?.slice(0, 4)

  return (
    <div>
      {backdropUrl && (
        <img src={backdropUrl} alt="" className="w-full aspect-video max-h-80 object-cover rounded-lg mb-4" />
      )}
      <div className="flex flex-col sm:flex-row gap-6">
        {posterUrl && (
          <img src={posterUrl} alt={movie.title} className="w-40 sm:w-48 mx-auto sm:mx-0 rounded-lg shrink-0" />
        )}
        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          {movie.original_title !== movie.title && (
            <p className="text-gray-500 text-sm">{movie.original_title}</p>
          )}
          <p className="text-sm text-gray-600 mt-2">
            {year} &middot; {movie.runtime} min &middot; {movie.original_language?.toUpperCase()}
          </p>
          <p className="mt-1">⭐ {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {movie.genres?.map((g) => (
              <span key={g.id} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                {g.name}
              </span>
            ))}
          </div>
          <p className="mt-4">{movie.overview}</p>
        </div>
      </div>

      {director && (
        <p className="mt-4 text-sm">
          <span className="text-gray-500">Director:</span> {director.name}
        </p>
      )}

      {topCast && topCast.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold mb-3">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {topCast.map((actor) => (
              <ActorBadge key={actor.key} actor={actor} />
            ))}
          </div>
        </section>
      )}

      {trailer && (
        <MovieTrailer trailer={trailer} />
      )}
    </div>
  )
}

function ActorBadge({ actor }) {
  return (
    <Link to={`/person/${actor.id}`} className="w-24 shrink-0 text-center">
      {actor.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
          alt={actor.name}
          className="w-24 h-24 object-cover rounded-full mb-1"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-1" />
      )}
      <p className="text-xs font-medium truncate">{actor.name}</p>
      <p className="text-xs text-gray-500 truncate">{actor.character}</p>
    </Link>
  )
}

function MovieTrailer({ trailer }) {
  return <section className="mt-6">
    <h2 className="text-lg font-bold mb-3">Trailer</h2>
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </div>
  </section>
}