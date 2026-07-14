package com.yohbi.reservation_bus.mapper;

import com.yohbi.reservation_bus.dto.ClientDTO;
import com.yohbi.reservation_bus.entity.Client;

public class ClientMapper {

    public static ClientDTO toDTO(Client client) {

        if (client == null) {
            return null;
        }

        ClientDTO dto = new ClientDTO();

        dto.setId(client.getId());
        dto.setFirstName(client.getFirstName());
        dto.setLastName(client.getLastName());
        dto.setEmail(client.getEmail());
        dto.setPhoneNumber(client.getPhoneNumber());

        return dto;
    }

    public static Client toEntity(ClientDTO dto) {

        if (dto == null) {
            return null;
        }

        Client client = new Client();

        client.setId(dto.getId());
        client.setFirstName(dto.getFirstName());
        client.setLastName(dto.getLastName());
        client.setEmail(dto.getEmail());
        client.setPhoneNumber(dto.getPhoneNumber());

        return client;
    }

}