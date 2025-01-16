import logo from './logo.svg';
import './App.css';
import {Route,Router,Routes} from "react-router-dom"
import Register from './Pages/Login/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
