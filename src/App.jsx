import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import './App.css'
import Favorites from './pages/Favorites'
import MovieDetail from './pages/MovieDetail'
import Navbar from './components/Navbar'
import { PersonDetails } from './pages/PersonDetails'
function App() {

  return (
    <>
      <Navbar />
      <main className="px-4 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/person/:id' element={<PersonDetails />} />
        </Routes>
      </main>
    </>
  )
}

export default App
