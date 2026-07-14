package com.yohbi.reservation_bus.repository;

import com.yohbi.reservation_bus.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    // Recherche par ville de départ et destination
    List<Trip> findByVilleDepartAndVilleDestination(
            String villeDepart,
            String villeDestination
    );

    // Recherche par date
    List<Trip> findByDateDepart(LocalDate dateDepart);

    // Recherche complète
    List<Trip> findByVilleDepartAndVilleDestinationAndDateDepart(
            String villeDepart,
            String villeDestination,
            LocalDate dateDepart
    );

}