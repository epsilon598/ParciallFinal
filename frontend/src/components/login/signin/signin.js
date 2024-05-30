import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Card from "react-bootstrap/Card";
import "./signin.scss";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidated(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/api/v1/verifyUser", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData),
            });
            if (!response.ok) throw new Error('Invalid credentials');
            const user = await response.json();
            localStorage.setItem("user", user.id);
            localStorage.setItem("user-complete", JSON.stringify(user));
            navigate(`/tournaments`);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            setError("Username or password are incorrect!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <Card.Body>
                    <h3>Login</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="loginForm">
                        <Form.Group controlId="validationCustomUsername">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="validationCustomPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a password
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <br />
                        <div className="d-flex justify-content-center">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                        <br />
                        {error && <div className="error-message">{error}</div>}
                        <div>
                            Not registered yet? <Link to="/register">Register</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
