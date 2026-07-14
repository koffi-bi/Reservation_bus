package com.yohbi.reservation_bus.exception;

public class ReservationNotFoundException extends RuntimeException {

    public ReservationNotFoundException(Long id) {
        super("Réservation introuvable avec l'id : " + id);
    }
}
