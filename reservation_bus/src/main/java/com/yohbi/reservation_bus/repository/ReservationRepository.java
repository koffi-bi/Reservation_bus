package com.yohbi.reservation_bus.repository;

import com.yohbi.reservation_bus.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // "ClientId" devient "ClientId" pour correspondre à "private Client Client"
    List<Reservation> findByClientId(Long clientId);
    List<Reservation> findByTripId(Long tripId);
    // Nombre de réservations pour un trajet
    long countByTripId(Long tripId);
}
