package com.yohbi.reservation_bus.service.impl;

import com.yohbi.reservation_bus.dto.TicketDTO;
import com.yohbi.reservation_bus.entity.Reservation;
import com.yohbi.reservation_bus.entity.Ticket;
import com.yohbi.reservation_bus.mapper.TicketMapper;
import com.yohbi.reservation_bus.repository.ReservationRepository;
import com.yohbi.reservation_bus.repository.TicketRepository;
import com.yohbi.reservation_bus.service.TicketService;
import com.yohbi.reservation_bus.exception.TicketNotFoundException;
import com.yohbi.reservation_bus.exception.ReservationNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final ReservationRepository reservationRepository;
    private final TicketMapper ticketMapper;

    @Override
    public TicketDTO generateTicket(Long reservationId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException(reservationId));

        Ticket ticket = new Ticket();

        ticket.setNumeroTicket(UUID.randomUUID().toString());
        ticket.setDateGeneration(LocalDateTime.now());
        ticket.setReservation(reservation);

        Ticket savedTicket = ticketRepository.save(ticket);

        return ticketMapper.toDTO(savedTicket);
    }

    @Override
    public TicketDTO getTicketById(Long id) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException(id));

        return ticketMapper.toDTO(ticket);
    }

    @Override
    public List<TicketDTO> getAllTickets() {

        return ticketRepository.findAll()
                .stream()
                .map(ticketMapper::toDTO)
                .toList();
    }

    @Override
    public TicketDTO updateTicket(Long id, TicketDTO ticketDTO) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException(id));

        ticket.setNumeroTicket(ticketDTO.getNumeroTicket());
        ticket.setDateGeneration(ticketDTO.getDateGeneration());

        Ticket updatedTicket = ticketRepository.save(ticket);

        return ticketMapper.toDTO(updatedTicket);
    }

    @Override
    public void deleteTicket(Long id) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException(id));

        Reservation reservation = ticket.getReservation();

        reservation.setTicket(null);

        ticketRepository.delete(ticket);
    }
    }