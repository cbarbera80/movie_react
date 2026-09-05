import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from './tmdb'

export function useMoviesByCategory(category) {
  return useQuery({
    queryKey: ['movies', category],
    queryFn: () => tmdbFetch(`/movie/${category}`),
  })
}
export function useMovieDetail(id) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => tmdbFetch(`/movie/${id}`),
    enabled: !!id,
  })
}
export function useMovieCredits(id) {
  return useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => tmdbFetch(`/movie/${id}/credits`),
    enabled: !!id
  })
}
export function useMovieVideos(id) {
  return useQuery({
    queryKey: ['movie', id, 'videos'],
    queryFn: () => tmdbFetch(`/movie/${id}/videos`),
    enabled: !!id
  })
}
export function useSearchMovies(query) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => tmdbFetch(`/search/movie`, { query }),
    enabled: query.trim().length > 0
  })
}
export function usePersonDetails(id) {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => tmdbFetch(`/person/${id}`),
    enabled: !!id
  })
}
export function usePersonMovieCredits(id) {
  return useQuery({
    queryKey: ['person', id, 'movie_credits'],
    queryFn: () => tmdbFetch(`/person/${id}/movie_credits`),
    enabled: !!id
  })
}