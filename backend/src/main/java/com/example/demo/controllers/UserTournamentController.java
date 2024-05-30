package com.example.demo.controllers;

import com.example.demo.dtos.UserDTO;
import com.example.demo.mappers.UserMapper;
import com.example.demo.models.User;
import com.example.demo.services.UserTournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserTournamentController {

    @Autowired
    private UserTournamentService userTournamentService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/users/{userId}/tournaments/{tournamentId}")
    public ResponseEntity<UserDTO> addTournamentToUser(@PathVariable Long userId, @PathVariable Long tournamentId) {
        User user = userTournamentService.addTournamentToUser(userId, tournamentId);
        return ResponseEntity.ok(userMapper.toDTO(user));
    }

    @DeleteMapping("/users/{userId}/tournaments/{tournamentId}")
    public ResponseEntity<UserDTO> removeTournamentFromUser(@PathVariable Long userId, @PathVariable Long tournamentId) {
        User user = userTournamentService.removeTournamentFromUser(userId, tournamentId);
        return ResponseEntity.ok(userMapper.toDTO(user));
    }

    @GetMapping("/tournament/{tournamentId}/users")
    public ResponseEntity<List<UserDTO>> getTournamentUsers(@PathVariable Long tournamentId){
        return ResponseEntity.ok(userTournamentService.getTournamentUsers(tournamentId));
    }
}
