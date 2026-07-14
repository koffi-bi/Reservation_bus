package com.yohbi.reservation_bus.mapper;

import com.yohbi.reservation_bus.dto.TicketDTO;
import com.yohbi.reservation_bus.entity.Ticket;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {

    public TicketDTO toDTO(Ticket ticket) {

        if (ticket == null) {
            return null;
        }

        TicketDTO dto = new TicketDTO();

        dto.setId(ticket.getId());
        dto.setNumeroTicket(ticket.getNumeroTicket());
        dto.setDateGeneration(ticket.getDateGeneration());

        dto.setReservationId(ticket.getReservation().getId());

        return dto;
    }

}
