package com.yohbi.reservation_bus.service.impl;
import com.yohbi.reservation_bus.dto.TripDTO;
import com.yohbi.reservation_bus.entity.Trip;
import com.yohbi.reservation_bus.mapper.TripMapper;
import com.yohbi.reservation_bus.repository.TripRepository;
import com.yohbi.reservation_bus.service.TripService;
import com.yohbi.reservation_bus.exception.TripNotFoundException;
import com.yohbi.reservation_bus.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final ReservationRepository reservationRepository;

    @Override
    public TripDTO createTrip(TripDTO tripDTO) {

        Trip trip = TripMapper.toEntity(tripDTO);

        Trip savedTrip = tripRepository.save(trip);

        TripDTO dto = TripMapper.toDTO(savedTrip);

        long occupees = reservationRepository.countByTripId(savedTrip.getId());

        dto.setNombrePlaceOccupees((int) occupees);
        dto.setNombrePlaceLibres(
                savedTrip.getNombrePlaceDisponibles() - (int) occupees
        );

        return dto;
    }

    @Override
    public TripDTO getTripById(Long id) {

        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new TripNotFoundException(id));

        TripDTO dto = TripMapper.toDTO(trip);

        long occupees = reservationRepository.countByTripId(trip.getId());

        dto.setNombrePlaceOccupees((int) occupees);
        dto.setNombrePlaceLibres(
                trip.getNombrePlaceDisponibles() - (int) occupees
        );

        return dto;
    }

    @Override
    public List<TripDTO> getAllTrips() {

        return tripRepository.findAll()
                .stream()
                .map(trip -> {

                    TripDTO dto = TripMapper.toDTO(trip);

                    long occupees = reservationRepository.countByTripId(trip.getId());

                    dto.setNombrePlaceOccupees((int) occupees);
                    dto.setNombrePlaceLibres(
                            trip.getNombrePlaceDisponibles() - (int) occupees
                    );

                    return dto;
                })
                .toList();
    }

    @Override
    public List<TripDTO> searchTrips(
            String villeDepart,
            String villeDestination,
            LocalDate dateDepart) {

        return tripRepository
                .findByVilleDepartAndVilleDestinationAndDateDepart(
                        villeDepart,
                        villeDestination,
                        dateDepart)
                .stream()
                .map(trip -> {

                    TripDTO dto = TripMapper.toDTO(trip);

                    long occupees = reservationRepository.countByTripId(trip.getId());

                    dto.setNombrePlaceOccupees((int) occupees);
                    dto.setNombrePlaceLibres(
                            trip.getNombrePlaceDisponibles() - (int) occupees
                    );

                    return dto;
                })
                .toList();
    }

    @Override
    public TripDTO updateTrip(Long id, TripDTO tripDTO) {

        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new TripNotFoundException(id));

        trip.setVilleDepart(tripDTO.getVilleDepart());
        trip.setVilleDestination(tripDTO.getVilleDestination());
        trip.setDateDepart(tripDTO.getDateDepart());
        trip.setHeureDepart(tripDTO.getHeureDepart());
        trip.setPrix(tripDTO.getPrix());
        trip.setNumeroBus(tripDTO.getNumeroBus());
        trip.setDistanceValiditeKm(tripDTO.getDistanceValiditeKm());
        trip.setNombrePlaceDisponibles(tripDTO.getNombrePlaceDisponibles());

        Trip updatedTrip = tripRepository.save(trip);

        TripDTO dto = TripMapper.toDTO(updatedTrip);

        long occupees = reservationRepository.countByTripId(updatedTrip.getId());

        dto.setNombrePlaceOccupees((int) occupees);
        dto.setNombrePlaceLibres(
                updatedTrip.getNombrePlaceDisponibles() - (int) occupees
        );

        return dto;
    }

    @Override
    public void deleteTrip(Long id) {

        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new TripNotFoundException(id));

        tripRepository.delete(trip);
    }


}