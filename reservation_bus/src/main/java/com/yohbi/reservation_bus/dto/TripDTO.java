package com.yohbi.reservation_bus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripDTO {

    private Long id;

    private String villeDepart;

    private String villeDestination;

    private LocalDate dateDepart;

    private LocalTime heureDepart;

    private BigDecimal prix;

    private String numeroBus;

    private Integer distanceValiditeKm;

    private Integer nombrePlaceDisponibles;

    // calculé automatiquement
    private Integer nombrePlaceOccupees;

    // calculé automatiquement
    private Integer nombrePlaceLibres;


}