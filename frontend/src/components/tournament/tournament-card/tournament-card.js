import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Collapse from 'react-bootstrap/Collapse';
import { useNavigate } from 'react-router-dom';
import "./tournament-card.scss";

function TournamentCard({ id, name, deadline, image, maxParticipants, currentParticipants, isRegistered, userRole }) {
    const [registered, setRegistered] = useState(isRegistered);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const userId = localStorage.getItem('user');
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/tournament/${id}/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleToggle = () => {
        setOpen(!open);
        if (!open) {
            fetchUsers();
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/users/${userId}/tournaments/${id}`, {
                method: 'POST'
            });

            if (response.ok) {
                setRegistered(true);
            } else {
                console.error("Error registering for the tournament");
            }
        } catch (error) {
            console.error("Error registering for the tournament", error);
        }
    };

    const handleUnregister = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/users/${userId}/tournaments/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setRegistered(false);
            } else {
                console.error("Error unregistering from the tournament");
            }
        } catch (error) {
            console.error("Error unregistering from the tournament", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/tournaments/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Tournament deleted successfully");
                window.location.reload(); // Refresh the page to update the list of tournaments
            } else {
                console.error("Error deleting the tournament");
            }
        } catch (error) {
            console.error("Error deleting the tournament", error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-tournament/${id}`);
    };

    return (
        <Card className="tournament-card">
            <Row noGutters>
                <Col className="image-container">
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${image}`} alt={name} className="tournament-image" />
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>Fecha límite: {deadline}</Card.Text>
                        <Card.Text>Maximo de participantes: {maxParticipants}</Card.Text>
                        <div className="button-group">
                            {!registered && (
                                <Button variant="primary" className="mr-2" onClick={handleRegister}>Registrar</Button>
                            )}
                            {registered && (
                                <Button variant="danger" onClick={handleUnregister}>Cancelar</Button>
                            )}
                            {userRole === "ADMIN" && (
                                <>
                                    <Button variant="warning" onClick={handleEdit} className="ml-2">Editar</Button>
                                    <Button variant="danger" onClick={handleDelete} className="ml-2">Eliminar</Button>
                                    <Button
                                        variant="info"
                                        onClick={handleToggle}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                        className="ml-2"
                                    >
                                        Asistentes
                                    </Button>
                                </>
                            )}
                        </div>
                        {userRole === "ADMIN" && (
                            <Collapse in={open}>
                                <div id="collapse-text">
                                    <ul>
                                        {users.map(user => (
                                            <li key={user.id}>{user.name} ({user.email})</li>
                                        ))}
                                    </ul>
                                </div>
                            </Collapse>
                        )}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default TournamentCard;