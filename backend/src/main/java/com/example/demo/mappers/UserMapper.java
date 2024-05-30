package com.example.demo.mappers;

import com.example.demo.dtos.UserDTO;
import com.example.demo.models.Tournament;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole().name());
        dto.setTournamentIds(user.getTournaments().stream().map(Tournament::getId).collect(Collectors.toSet()));
        return dto;
    }

    public User toEntity(UserDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        if (dto.getRole() != null && !dto.getRole().isEmpty()) {
            user.setRole(User.Role.valueOf(dto.getRole()));
        } else {
            user.setRole(User.Role.CLIENT);
        }
        return user;
    }

    public User updateEntity(User existingUser, UserDTO dto) {
        if (dto.getName() != null && !dto.getName().isEmpty()) {
            existingUser.setName(dto.getName());
        }

        if (dto.getEmail() != null && !dto.getEmail().isEmpty()) {
            existingUser.setEmail(dto.getEmail());
        }

        if (dto.getRole() != null) {
            existingUser.setRole(User.Role.valueOf(dto.getRole()));
        }

        if(dto.getNewPassword() != null && passwordEncoder.matches(dto.getPassword(), existingUser.getPassword())){
            existingUser.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        }

        return existingUser;
    }
}
