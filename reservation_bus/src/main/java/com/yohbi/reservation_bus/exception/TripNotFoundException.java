package com.yohbi.reservation_bus.exception;

public class TripNotFoundException extends RuntimeException {

    public TripNotFoundException(Long id) {
        super("Trajet introuvable avec l'id : " + id);
    }
}