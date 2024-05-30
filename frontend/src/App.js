import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/login/create/create";
import Login from "./components/login/signin/signin";
import Main from "./components/main/main";
import CreateTournament from "./components/tournament/tournament-create/tournament-create";
import EditTournament from "./components/tournament/tournament-edit/tournament-edit";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import UserDetail from "./components/user/user-detail/user-detail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Create />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Create />}></Route>
            <Route path='/tournaments' element={<Main />}></Route>
            <Route path='/users/:userid' element={<UserDetail />}></Route>
            <Route path="/create-tournament" element={<CreateTournament />} />
            <Route path="/edit-tournament/:tournamentId" element={<EditTournament />} /> s
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
