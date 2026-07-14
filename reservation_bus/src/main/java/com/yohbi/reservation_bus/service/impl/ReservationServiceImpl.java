package com.yohbi.reservation_bus.service.impl;

import com.yohbi.reservation_bus.dto.ReservationDTO;
import com.yohbi.reservation_bus.entity.Client;
import com.yohbi.reservation_bus.entity.Reservation;
import com.yohbi.reservation_bus.entity.Ticket;
import com.yohbi.reservation_bus.entity.Trip;
import com.yohbi.reservation_bus.mapper.ReservationMapper;
import com.yohbi.reservation_bus.repository.ClientRepository;
import com.yohbi.reservation_bus.repository.ReservationRepository;
import com.yohbi.reservation_bus.repository.TicketRepository;
import com.yohbi.reservation_bus.repository.TripRepository;
import com.yohbi.reservation_bus.service.ReservationService;
import com.yohbi.reservation_bus.exception.ReservationNotFoundException;
import com.yohbi.reservation_bus.exception.ClientNotFoundException;
import com.yohbi.reservation_bus.exception.TripNotFoundException;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ClientRepository clientRepository;
    private final TripRepository tripRepository;
    private final TicketRepository ticketRepository;

    private final ReservationMapper reservationMapper;

    @Override
    public ReservationDTO createReservation(ReservationDTO dto) {

        // Recherche du client
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new ClientNotFoundException(dto.getClientId()));

        // Recherche du trajet
        Trip trip = tripRepository.findById(dto.getTripId())
                .orElseThrow(() -> new TripNotFoundException(dto.getTripId()));

        // Création de la réservation
        Reservation reservation = new Reservation();

        reservation.setReservationDate(dto.getReservationDate());
        reservation.setSeatNumber(dto.getSeatNumber());

        // Le statut est toujours CONFIRMED à la création
        reservation.setStatus("CONFIRMED");

        reservation.setClient(client);
        reservation.setTrip(trip);

        // Sauvegarde
        Reservation savedReservation =
                reservationRepository.save(reservation);

        // Création automatique du ticket
        Ticket ticket = new Ticket();

        ticket.setNumeroTicket(UUID.randomUUID().toString());

        ticket.setDateGeneration(LocalDateTime.now());

        ticket.setReservation(savedReservation);

        ticketRepository.save(ticket);

        // Retour vers le Controller
        return reservationMapper.toDTO(savedReservation);
    }
    @Override
    public ReservationDTO getReservationById(Long id) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException(id));
        return reservationMapper.toDTO(reservation);
    }
    @Override
    public List<ReservationDTO> getReservationsByClientId(Long clientId) {

        return reservationRepository.findByClientId(clientId)
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }
    @Override
    public List<ReservationDTO> getAllReservations() {

        return reservationRepository.findAll()
                .stream()
                .map(reservationMapper::toDTO)
                .toList();
    }
    @Override
    public ReservationDTO updateReservation(Long id,
                                            ReservationDTO reservationDTO) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException(id));

        reservation.setReservationDate(reservationDTO.getReservationDate());
        reservation.setSeatNumber(reservationDTO.getSeatNumber());
        reservation.setStatus(reservationDTO.getStatus());

        Reservation updatedReservation =
                reservationRepository.save(reservation);

        return reservationMapper.toDTO(updatedReservation);
    }
    @Override
    public void deleteReservation(Long id) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException(id));

        reservationRepository.delete(reservation);
    }
    }
