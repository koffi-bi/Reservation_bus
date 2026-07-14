package com.yohbi.reservation_bus.service;

import com.yohbi.reservation_bus.dto.ReservationDTO;

import java.util.List;

public interface ReservationService {

    ReservationDTO createReservation(ReservationDTO reservationDTO);

    ReservationDTO getReservationById(Long id);

    List<ReservationDTO> getReservationsByClientId(Long clientId);

    List<ReservationDTO> getAllReservations();

    ReservationDTO updateReservation(Long id,
                                     ReservationDTO reservationDTO);

    void deleteReservation(Long id);

}