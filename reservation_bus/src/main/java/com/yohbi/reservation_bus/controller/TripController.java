package com.yohbi.reservation_bus.controller;

import com.yohbi.reservation_bus.dto.TripDTO;
import com.yohbi.reservation_bus.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping
    public TripDTO createTrip(@RequestBody TripDTO tripDTO) {
        return tripService.createTrip(tripDTO);
    }

    @GetMapping("/{id}")
    public TripDTO getTripById(@PathVariable Long id) {
        return tripService.getTripById(id);
    }

    @GetMapping
    public List<TripDTO> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/search")
    public List<TripDTO> searchTrips(
            @RequestParam String villeDepart,
            @RequestParam String villeDestination,
            @RequestParam LocalDate dateDepart) {

        return tripService.searchTrips(
                villeDepart,
                villeDestination,
                dateDepart);
    }

    @PutMapping("/{id}")
    public TripDTO updateTrip(
            @PathVariable Long id,
            @RequestBody TripDTO tripDTO) {

        return tripService.updateTrip(id, tripDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
    }
}