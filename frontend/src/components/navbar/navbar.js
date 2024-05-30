import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../searchbar/searchbar';
import './navbar.scss';

function NavBar({ handleSearch }) {
    const user = JSON.parse(localStorage.getItem("user-complete"));
    const userId = user.id;
    const userRole = user.role;
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate(`/users/${userId}`);
    }

    const handleCreateTournament = () => {
        navigate('/create-tournament');
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Navbar className="navbar" expand="lg">
            <Form className="d-flex w-100 justify-content-between align-items-center">
                <Col xs={8} className="d-flex justify-content-center">
                    <SearchBar onSearch={handleSearch} />
                </Col>
                <Col xs={4} className="d-flex justify-content-end">
                    {userRole === "ADMIN" && (
                        <Button variant="success" onClick={handleCreateTournament} className="create-button mr-2">Create Tournament</Button>
                    )}
                    <Button className="profile-button mr-2" type="button" variant="outline-primary" onClick={handleProfile}>Profile</Button>
                    <Button className="logout-button" type="button" variant="outline-danger" onClick={logout}>Logout</Button>
                </Col>
            </Form>
        </Navbar>
    );
}

export default NavBar;
