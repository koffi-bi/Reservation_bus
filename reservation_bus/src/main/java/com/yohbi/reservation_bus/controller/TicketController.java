package com.yohbi.reservation_bus.controller;

import com.yohbi.reservation_bus.dto.TicketDTO;
import com.yohbi.reservation_bus.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/{id}")
    public TicketDTO getTicketById(@PathVariable Long id) {

        return ticketService.getTicketById(id);
    }

    @GetMapping
    public List<TicketDTO> getAllTickets() {

        return ticketService.getAllTickets();
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {

        ticketService.deleteTicket(id);
    }
}