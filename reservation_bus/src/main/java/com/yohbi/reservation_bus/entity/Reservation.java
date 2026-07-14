package com.yohbi.reservation_bus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "Reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Reservation_date", nullable = false)
    private LocalDateTime reservationDate;

    @Column(name = "status", nullable = false)
    private String status; // Exemple: "PENDING", "CONFIRMED", "CANCELLED"

    @Column(name = "seat_number", nullable = false)
    private Integer seatNumber;

    // --- LIENS ENTRE TABLES (RELATIONS) ---

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client; // Le client/passager qui réserve

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip; // Le trajet choisi

    // Constructeurs, Getters and Setters

    @OneToOne(mappedBy = "reservation")
    private Ticket ticket;
}