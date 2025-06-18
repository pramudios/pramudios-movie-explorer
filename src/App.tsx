import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { MovieDetailSection } from './components/Detail/MovieDetailSection';
import { Favorites } from './components/Favorites';
import { MovieContext, useMovieProvider } from '@/context/MovieContext';

function App() {
  const movieProvider = useMovieProvider();
  return (
    <MovieContext.Provider value={movieProvider}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/detail/:id' element={<MovieDetailSection />} />
        </Routes>
      </Router>
    </MovieContext.Provider>
  );
}

export default App;
