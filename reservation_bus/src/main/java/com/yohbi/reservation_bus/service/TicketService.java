package com.yohbi.reservation_bus.service;

import com.yohbi.reservation_bus.dto.TicketDTO;

import java.util.List;

public interface TicketService {

    TicketDTO generateTicket(Long reservationId);

    TicketDTO getTicketById(Long id);

    List<TicketDTO> getAllTickets();

    TicketDTO updateTicket(Long id,
                           TicketDTO ticketDTO);

    void deleteTicket(Long id);

}
