package com.yohbi.reservation_bus.exception;

public class TicketNotFoundException extends RuntimeException {

    public TicketNotFoundException(Long id) {
        super("Le ticket numero " + id + " n'existe pas encore");
    }
}