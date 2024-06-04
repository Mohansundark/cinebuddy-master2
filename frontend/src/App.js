import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import NavBar from "./components/NavBar.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
function App() {
  return (
    <div className="App">
      <div className="pages">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/welcome" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
