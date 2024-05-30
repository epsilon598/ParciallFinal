import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';
import "./tournament-create.scss";

function CreateTournament() {
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const tournamentData = JSON.stringify({ name, deadline, maxParticipants: parseInt(maxParticipants) });
        formData.append('image', image);
        formData.append('tournament', new Blob([tournamentData], { type: "application/json" }));

        try {
            const response = await fetch('http://localhost:8080/api/v1/tournaments', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Tournament created successfully');
                navigate('/tournaments');
            } else {
                alert('Failed to create tournament');
            }
        } catch (error) {
            console.error('Error creating tournament:', error);
            alert('Error creating tournament');
        }
    };

    return (
        <div className="create-tournament-container">
            <Card className="create-tournament-card">
                <Card.Body>
                    <h3>Create Tournament</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDeadline" className="mt-3">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMaxParticipants" className="mt-3">
                            <Form.Label>Max Participants</Form.Label>
                            <Form.Control
                                type="number"
                                value={maxParticipants}
                                onChange={(e) => setMaxParticipants(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage" className="mt-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit">Create</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CreateTournament;
