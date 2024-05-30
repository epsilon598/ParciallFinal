import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';
import "./user-detail.scss";

function UserDetail() {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const userId = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userURL = `http://localhost:8080/api/v1/users/${userId}`;
                const userResponse = await fetch(userURL);
                const userData = await userResponse.json();
                setUser(userData);
                setName(userData.name);
                setEmail(userData.email);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSave = async () => {
        const updateURL = `http://localhost:8080/api/v1/users/${userId}`;
        let updatedUser = { name, email, password };

        if (newPassword) {
            updatedUser = { ...updatedUser, newPassword };
        }

        try {
            const response = await fetch(updateURL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                alert('Profile updated successfully');
                navigate(`/users/${userId}`);
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handleDeleteAccount = async () => {
        const deleteAccountUrl = `http://localhost:8080/api/v1/users/${userId}`;
        try {
            const response = await fetch(deleteAccountUrl, {
                method: 'DELETE'
            });

            if (response.ok) {
                localStorage.clear();
                alert('Account deleted successfully');
                navigate('/register'); // Redirigir al usuario a la página de registro
            } else {
                alert('Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Error deleting account');
        }
    };

    const handleBack = () => {
        navigate('/tournaments');
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <Card className="profile-card">
                <Card.Body>
                    <h3>Profile</h3>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword" className="mt-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="primary" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="secondary" onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="danger" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    </Form>
                    <hr />
                    <p className="text-center">Oh no! Are you abandoning us? Is it something we said?</p>
                    <div className="d-flex justify-content-center">
                        <Button variant="danger" onClick={handleDeleteAccount} className="mt-3">
                            Delete Account
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UserDetail;
