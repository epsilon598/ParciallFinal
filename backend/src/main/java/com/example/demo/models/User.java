package com.example.demo.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "users")
public class User {
    public enum Role {
        ADMIN,
        CLIENT;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", columnDefinition = "ENUM('ADMIN', 'CLIENT') DEFAULT 'CLIENT' CHECK (role in ('ADMIN', 'CLIENT'))")
    private Role role;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_tournaments",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "tournament_id")
    )
    private Set<Tournament> tournaments = new HashSet<>();

    public void removeTournament(Tournament tournament){
        this.tournaments.remove(tournament);
        tournament.getUsers().remove(this);
    }

    @PrePersist
    public void prePersist() {
        if (this.role == null) {
            this.role = Role.CLIENT;
        }
    }
}
