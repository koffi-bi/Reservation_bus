package com.yohbi.reservation_bus.repository;

import com.yohbi.reservation_bus.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository
        extends JpaRepository<Ticket, Long> {

}
