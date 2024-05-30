package com.example.demo.services;

import com.example.demo.dtos.TournamentDTO;
import com.example.demo.mappers.TournamentMapper;
import com.example.demo.models.Tournament;
import com.example.demo.repositories.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class TournamentService {
    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private Util util;

    @Autowired
    private TournamentMapper tournamentMapper;

    public List<TournamentDTO> getAllTournaments() {
        List<Tournament> tournaments = tournamentRepository.findAll();
        return tournaments.stream().map(tournamentMapper::toDTO).toList();
    }

    public TournamentDTO  getTournamentById(Long id) {
        Tournament tournament = util.getTournament(id);
        return tournamentMapper.toDTO(tournament);
    }

    public TournamentDTO createTournament(TournamentDTO tournamentDTO, MultipartFile image) {
        Tournament tournament = tournamentMapper.toEntity(tournamentDTO);
        if (image != null && !image.isEmpty()) {
            try{
                tournament.setImage(image.getBytes());
            }catch (IOException e){
                System.err.println(e);
            }
        }

        Tournament savedTournament = tournamentRepository.save(tournament);
        return tournamentMapper.toDTO(savedTournament);
    }

    public TournamentDTO updateTournament(Long id, TournamentDTO tournamentDetails, MultipartFile image) {
        Tournament existingTournament = util.getTournament(id);
        if (tournamentDetails != null) {
            tournamentMapper.updateEntity(existingTournament, tournamentDetails);
        }

        if (image != null && !image.isEmpty()) {
            try{
                existingTournament.setImage(image.getBytes());
            }catch (IOException e){
                System.err.println(e);
            }
        }
        Tournament updatedTournament = tournamentRepository.save(existingTournament);
        return tournamentMapper.toDTO(updatedTournament);
    }

    public String deleteTournament(Long id) {
        tournamentRepository.deleteById(id);
        return "Tournament " + id + " deleted";
    }
}
