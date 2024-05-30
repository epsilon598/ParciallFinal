package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.Tournament;
import com.example.demo.models.User;
import com.example.demo.repositories.TournamentRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Util {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    public User getUser(Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()){
            throw new ResourceNotFoundException(User.class, userId);
        }

        return userOptional.get();
    }

    public Tournament getTournament(Long tournamentId){
        Optional<Tournament> tournamentOptional = tournamentRepository.findById(tournamentId);
        if(tournamentOptional.isEmpty()){
            throw new ResourceNotFoundException(Tournament.class, tournamentId);
        }

        return tournamentOptional.get();
    }
}
