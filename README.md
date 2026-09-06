# Movie Explorer

A movie catalog app built against [The Movie Database (TMDB)](https://www.themoviedb.org/) API. Built as a hands-on learning project for React, React Router, Zustand, and TanStack Query.

## Features

- **Home** — movies grouped into Popular, Now Playing, Top Rated, and Upcoming sections.
- **Search** — debounced input, infinite scroll (`useInfiniteQuery` + `IntersectionObserver`), and all loading/empty/error states.
- **Discover** — browse the full catalog filtered by genre, year, and minimum rating, with sort by popularity/rating/release date.
- **Movie detail** — overview, genres, runtime, cast & crew, and an embedded trailer when available.
- **Person detail** — bio and filmography, reachable by clicking a cast member.
- **Favorites** — save/remove movies, persisted to `localStorage`, with a dedicated Favorites page and empty state.
- Responsive layout throughout.

## Tech stack

- [React](https://react.dev/) (Vite)
- [React Router](https://reactrouter.com/) for routing
- [TanStack Query](https://tanstack.com/query) for server state, caching, and pagination
- [Zustand](https://zustand.docs.pmnd.rs/) (with the `persist` middleware) for favorites
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Setup

1. Clone the repo and install dependencies:

   ```bash
   git clone git@github.com:cbarbera80/movie_react.git
   cd movie_react
   npm install
   ```

2. Get a TMDB API Read Access Token:
   - Create an account at [themoviedb.org](https://www.themoviedb.org/)
   - Go to **Settings → API** and request an API key
   - Copy the **API Read Access Token (v4 auth)** — a long bearer token, not the shorter v3 key

3. Create a `.env` file in the project root:

   ```
   VITE_TMDB_TOKEN=your_v4_read_access_token_here
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

## Project structure

```
src/
  api/          TMDB fetch client (src/api/tmdb.js)
  hooks/        TanStack Query hooks + useDebouncedValue
  components/   Reusable UI (Navbar, MovieCard)
  pages/        Route-level pages (Home, Search, Discover, Favorites, MovieDetail, PersonDetails)
  store/        Zustand store (favorites)
```
