package com.yohbi.reservation_bus.controller;

import com.yohbi.reservation_bus.dto.ReservationDTO;
import com.yohbi.reservation_bus.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService ReservationService;

    @PostMapping
    public ReservationDTO createReservation(@RequestBody ReservationDTO reservationDTO) {
        return ReservationService.createReservation(reservationDTO);
    }

    @GetMapping("/{id}")
    public ReservationDTO getReservationById(@PathVariable Long id) {
        return ReservationService.getReservationById(id);
    }

    @GetMapping
    public List<ReservationDTO> getAllReservations() {
        return ReservationService.getAllReservations();
    }

    @GetMapping("/client/{clientId}")
    public List<ReservationDTO> getReservationsByClientId(@PathVariable Long clientId) {
        return ReservationService.getReservationsByClientId(clientId);
    }

    @PutMapping("/{id}")
    public ReservationDTO updateReservation(
            @PathVariable Long id,
            @RequestBody ReservationDTO reservationDTO) {

        return ReservationService.updateReservation(id, reservationDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        ReservationService.deleteReservation(id);
    }
}