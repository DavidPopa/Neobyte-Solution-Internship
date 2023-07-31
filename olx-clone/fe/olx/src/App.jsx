import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./register/Register-acc";
import LogIn from "./login-acc/Login";
import Main from "./main/Main";
import Create from "./main/Create";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/main/:id" element={<Main />} />
        <Route path="/create/:id" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
