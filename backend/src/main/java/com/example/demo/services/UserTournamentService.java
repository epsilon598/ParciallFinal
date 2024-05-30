package com.example.demo.services;

import com.example.demo.dtos.UserDTO;
import com.example.demo.mappers.UserMapper;
import com.example.demo.models.Tournament;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserTournamentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private Util util;

    public User addTournamentToUser(Long userId, Long tournamentId) {
        User user = util.getUser(userId);
        Tournament tournament = util.getTournament(tournamentId);

        user.getTournaments().add(tournament);
        return userRepository.save(user);
    }

    public User removeTournamentFromUser(Long userId, Long tournamentId) {
        User user = util.getUser(userId);
        Tournament tournament = util.getTournament(tournamentId);

        user.getTournaments().remove(tournament);
        return userRepository.save(user);
    }

    public List<UserDTO> getTournamentUsers(Long tournamentId){
        List<User> users = userRepository.getTournamentUsers(tournamentId);
        return users.stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }
}
