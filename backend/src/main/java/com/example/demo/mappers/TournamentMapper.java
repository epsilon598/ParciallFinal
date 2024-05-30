package com.example.demo.mappers;

import com.example.demo.dtos.TournamentDTO;
import com.example.demo.models.Tournament;
import org.springframework.stereotype.Component;

@Component
public class TournamentMapper {
    public TournamentDTO toDTO(Tournament tournament) {
        TournamentDTO dto = new TournamentDTO();
        dto.setId(tournament.getId());
        dto.setName(tournament.getName());
        dto.setDeadline(tournament.getDeadline());
        dto.setImage(tournament.getImage());
        dto.setMaxParticipants(tournament.getMaxParticipants());
        return dto;
    }

    public Tournament toEntity(TournamentDTO dto) {
        Tournament tournament = new Tournament();
        tournament.setId(dto.getId());
        tournament.setName(dto.getName());
        tournament.setDeadline(dto.getDeadline());
        tournament.setImage(dto.getImage());
        tournament.setMaxParticipants(dto.getMaxParticipants());
        return tournament;
    }

    public Tournament updateEntity(Tournament existingTournament, TournamentDTO dto) {
        if (dto.getName() != null && !dto.getName().isEmpty()) {
            existingTournament.setName(dto.getName());
        }

        if (dto.getDeadline() != null) {
            existingTournament.setDeadline(dto.getDeadline());
        }
        if (dto.getMaxParticipants() != null) {
            existingTournament.setMaxParticipants(dto.getMaxParticipants());
        }

        if(dto.getImage() != null)
            existingTournament.setImage(dto.getImage());

        return existingTournament;
    }
}
