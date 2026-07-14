package com.yohbi.reservation_bus.mapper;

import com.yohbi.reservation_bus.dto.ReservationDTO;
import com.yohbi.reservation_bus.entity.Reservation;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {

    public ReservationDTO toDTO(Reservation reservation) {
        if (reservation == null) {
            return null;
        }

        ReservationDTO dto = new ReservationDTO();

        dto.setId(reservation.getId());
        dto.setReservationDate(reservation.getReservationDate());
        dto.setStatus(reservation.getStatus());
        dto.setSeatNumber(reservation.getSeatNumber());

        dto.setClientId(reservation.getClient().getId());
        dto.setTripId(reservation.getTrip().getId());

        // Cette ligne manquait — c'est elle qui manquait pour que ticketId
        // apparaisse dans le JSON renvoyé au frontend.
        if (reservation.getTicket() != null) {
            dto.setTicketId(reservation.getTicket().getId());
        }

        return dto;
    }
}