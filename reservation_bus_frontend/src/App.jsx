import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import TripListPage from './pages/TripListPage';
import TravelerInfoPage from './pages/TravelerInfoPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import ConfirmationPage from './pages/ConfirmationPage';
import TicketPage from './pages/TicketPage';
import MyReservationsPage from './pages/MyReservationsPage';
import EditReservationPage from './pages/EditReservationPage';
import './index.css';

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recherche" element={<SearchPage />} />
              <Route path="/trajets" element={<TripListPage />} />
              <Route path="/voyageur" element={<TravelerInfoPage />} />
              <Route path="/siege" element={<SeatSelectionPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/ticket/:id" element={<TicketPage />} />
              <Route path="/mes-reservations" element={<MyReservationsPage />} />
              <Route path="/mes-reservations/:id/modifier" element={<EditReservationPage />} />
            </Routes>
          </main>
          <footer className="footer">🚌 IvoireBus — Projet de soutenance</footer>
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
