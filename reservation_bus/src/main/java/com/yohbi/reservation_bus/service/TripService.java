package com.yohbi.reservation_bus.service;

import com.yohbi.reservation_bus.dto.TripDTO;

import java.time.LocalDate;
import java.util.List;

public interface TripService {

    TripDTO createTrip(TripDTO tripDTO);

    TripDTO getTripById(Long id);

    List<TripDTO> getAllTrips();

    List<TripDTO> searchTrips(
            String villeDepart,
            String villeDestination,
            LocalDate dateDepart);

    TripDTO updateTrip(Long id, TripDTO tripDTO);

    void deleteTrip(Long id);

}