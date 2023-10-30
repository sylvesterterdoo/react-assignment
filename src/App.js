import "./App.css";
import AboutMe from "./AboutMe";
import MyTown from "./MyTown";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">About me</Link>
          </li>
          <li>
            <Link to="/town">My Town</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<AboutMe />} />
        <Route path="/town" element={<MyTown />} />
      </Routes>
    </>
  );
}

export default App;
