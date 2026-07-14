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
public class TicketDTO {

    private Long id;

    private String numeroTicket;

    private LocalDateTime dateGeneration;

    private Long reservationId;
}
