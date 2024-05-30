import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import "./create.scss";

function Create() {
    const [formData, setFormData] = useState({ email: "", password: "", name: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createCliente = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to create user');
            const data = await response.json();
            localStorage.setItem("user", data.id);
            localStorage.setItem("user-complete", JSON.stringify(data));
            navigate(`/tournaments`);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCliente();
    };

    return (
        <div className="register-container">
            <Card className="register-card">
                <Card.Body>
                    <h3>Register</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Please enter your name"
                                    minLength={6}
                                    name="name"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a Name
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Please enter your email"
                                    minLength={6}
                                    name="email"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Please enter your password"
                                minLength={8}
                                name="password"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a password. Minimum 8 characters!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br />
                        <div className="d-flex justify-content-center">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </Button>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                    </Form>
                    <br />
                    <div className="text-center">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Create;
