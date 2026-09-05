import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) =>
        set((state) => ({ favorites: [...state.favorites, movie] })),

      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),

      isFavorite: (movieId) =>
        get().favorites.some((m) => m.id === movieId),
    }),
    { name: 'movie-favorites' }
  )
)