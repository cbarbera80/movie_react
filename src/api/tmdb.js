const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

export async function tmdbFetch(endpoint, params = {}) {
  const url = buildUrl(endpoint, params)
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`)
  }

  return response.json()
}

function buildUrl(endpoint, params = {}) {
  const url = new URL(BASE_URL + endpoint)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value)
    }
  })
  return url.toString()
}