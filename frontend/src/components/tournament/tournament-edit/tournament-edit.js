import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from 'react-router-dom';
import "./tournament-edit.scss";

function EditTournament() {
    const { tournamentId } = useParams();
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTournamentData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/tournaments/${tournamentId}`);
                const tournament = await response.json();
                console.log(tournament)

                setName(tournament.name);
                setDeadline(tournament.deadline);
                setMaxParticipants(tournament.maxParticipants);
                setCurrentImage(`data:image/jpeg;base64,${tournament.image}`);
            } catch (error) {
                console.error('Error fetching tournament:', error);
            }
        };

        fetchTournamentData();
    }, [tournamentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const tournamentData = JSON.stringify({ name, deadline, maxParticipants: parseInt(maxParticipants) });
        if (image) {
            formData.append('image', image);
        }
        formData.append('tournament', new Blob([tournamentData], { type: "application/json" }));

        try {
            const response = await fetch(`http://localhost:8080/api/v1/tournaments/${tournamentId}`, {
                method: 'PATCH',
                body: formData
            });

            if (response.ok) {
                alert('Tournament updated successfully');
                navigate('/tournaments');
            } else {
                alert('Failed to update tournament');
            }
        } catch (error) {
            console.error('Error updating tournament:', error);
            alert('Error updating tournament');
        }
    };

    const handleBack = () => {
        navigate('/tournaments');
    };

    return (
        <div className="edit-tournament-container">
            <Card className="edit-tournament-card">
                <Card.Body>
                    <h3>Edit Tournament</h3>
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
                            <Form.Label>Current Image</Form.Label>
                            {currentImage && <img src={currentImage} alt="Current" className="current-image" />}
                            <Form.Label>New Image (Optional)</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="secondary" onClick={handleBack}>Back to List</Button>
                            <Button variant="primary" type="submit">Update</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditTournament;
