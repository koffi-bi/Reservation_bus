package com.yohbi.reservation_bus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {

    private Long id;

    private LocalDateTime reservationDate;

    private String status;

    private Integer seatNumber;

    private Long clientId;

    private Long tripId;

    private Long ticketId;
}