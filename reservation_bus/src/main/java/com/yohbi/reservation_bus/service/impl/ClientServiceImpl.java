package com.yohbi.reservation_bus.service.impl;

import com.yohbi.reservation_bus.dto.ClientDTO;
import com.yohbi.reservation_bus.entity.Client;
import com.yohbi.reservation_bus.mapper.ClientMapper;
import com.yohbi.reservation_bus.repository.ClientRepository;
import com.yohbi.reservation_bus.service.ClientService;
import com.yohbi.reservation_bus.exception.ClientNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    @Override
    public ClientDTO createClient(ClientDTO clientDTO) {

        Client client = ClientMapper.toEntity(clientDTO);

        Client savedClient = clientRepository.save(client);

        return ClientMapper.toDTO(savedClient);
    }

    @Override
    public ClientDTO getClientById(Long id) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(id));
        return ClientMapper.toDTO(client);
    }

    @Override
    public List<ClientDTO> getAllClients() {

        return clientRepository.findAll()
                .stream()
                .map(ClientMapper::toDTO)
                .toList();
    }

    @Override
    public ClientDTO updateClient(Long id, ClientDTO clientDTO) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(id));

        client.setFirstName(clientDTO.getFirstName());
        client.setLastName(clientDTO.getLastName());
        client.setEmail(clientDTO.getEmail());
        client.setPhoneNumber(clientDTO.getPhoneNumber());

        Client updatedClient = clientRepository.save(client);

        return ClientMapper.toDTO(updatedClient);
    }

    @Override
    public void deleteClient(Long id) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(id));

        clientRepository.delete(client);
    }
}