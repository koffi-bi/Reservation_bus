package com.yohbi.reservation_bus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {

    private Long id;

    private String lastName;

    private String firstName;

    private String phoneNumber;

    private String email;
}