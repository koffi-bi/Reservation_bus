package com.yohbi.reservation_bus.mapper;

import com.yohbi.reservation_bus.dto.TripDTO;
import com.yohbi.reservation_bus.entity.Trip;

public class TripMapper {

    public static TripDTO toDTO(Trip trip) {

        if (trip == null) {
            return null;
        }

        TripDTO dto = new TripDTO();

        dto.setId(trip.getId());
        dto.setVilleDepart(trip.getVilleDepart());
        dto.setVilleDestination(trip.getVilleDestination());
        dto.setDateDepart(trip.getDateDepart());
        dto.setHeureDepart(trip.getHeureDepart());
        dto.setPrix(trip.getPrix());
        dto.setNumeroBus(trip.getNumeroBus());
        dto.setDistanceValiditeKm(trip.getDistanceValiditeKm());
        dto.setNombrePlaceDisponibles(trip.getNombrePlaceDisponibles());

        return dto;
    }

    public static Trip toEntity(TripDTO dto) {

        if (dto == null) {
            return null;
        }

        Trip trip = new Trip();

        trip.setId(dto.getId());
        trip.setVilleDepart(dto.getVilleDepart());
        trip.setVilleDestination(dto.getVilleDestination());
        trip.setDateDepart(dto.getDateDepart());
        trip.setHeureDepart(dto.getHeureDepart());
        trip.setPrix(dto.getPrix());
        trip.setNumeroBus(dto.getNumeroBus());
        trip.setDistanceValiditeKm(dto.getDistanceValiditeKm());
        trip.setNombrePlaceDisponibles(dto.getNombrePlaceDisponibles());

        return trip;
    }

}