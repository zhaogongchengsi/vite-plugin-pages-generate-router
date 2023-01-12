import "./App.css";
import { Link } from "react-router-dom";

const App = function ({ children }: any) {
  return (
    <div className="App">
      <nav className="nav-bar">
        <Link to="/about">About</Link>
        <Link to="/">Home</Link>
      </nav>
      <div className="main">{children}</div>
    </div>
  );
};

export default App;
