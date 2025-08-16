import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import EventsPage from './pages/EventsPage';
import CulinaryPage from './pages/CulinaryPage';
import ContactPage from './pages/ContactPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/culinary" element={<CulinaryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/detail" element={<DetailPage />} />
    </Routes>
  );
}

export default App;