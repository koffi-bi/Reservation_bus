import { createContext, useContext, useState, useCallback } from 'react';

const BookingContext = createContext(null);

const emptyVoyageur = { nom: '', prenom: '', email: '', telephone: '' };

export function BookingProvider({ children }) {
  const [searchCriteria, setSearchCriteria] = useState({ villeDepart: '', villeDestination: '', dateDepart: '' });
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [voyageur, setVoyageur] = useState(emptyVoyageur);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [lastReservation, setLastReservation] = useState(null);

  const resetBooking = useCallback(() => {
    setSelectedTrip(null);
    setVoyageur(emptyVoyageur);
    setSelectedSeat(null);
    setLastReservation(null);
  }, []);

  const value = {
    searchCriteria, setSearchCriteria,
    selectedTrip, setSelectedTrip,
    voyageur, setVoyageur,
    selectedSeat, setSelectedSeat,
    lastReservation, setLastReservation,
    resetBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking doit être utilisé à l\'intérieur de <BookingProvider>');
  return ctx;
}
