import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { tmdbFetch } from '../api/tmdb'

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
export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => tmdbFetch(`/genre/movie/list`),
    staleTime: 1000 * 60 * 60
  })
}
export function useDiscoverMovies(filters) {
  return useQuery({
    queryKey: ['discover', filters],
    queryFn: () => tmdbFetch('/discover/movie', {
      with_genres: filters.genre || undefined,
      primary_release_year: filters.year || undefined,
      'vote_average.gte': filters.minRating || undefined,
      'vote_count.gte': 100,
      sort_by: filters.sortBy,
    }),
  })
}
export function useSearchMoviesInfinite(query) {
  return useInfiniteQuery({
    queryKey: ['search', 'infinite', query],
    queryFn: ({ pageParam }) => tmdbFetch('/search/movie', { query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.trim().length > 0,
  })
}