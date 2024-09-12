import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import { MdCopyright } from "react-icons/md";


function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState({});

  return (
    <div className="App">
      <header>
        <h1>Exercise tracker</h1>
        <p>Full Stack Mern App Demonstration</p>
      </header>

      <Router>
        <div className="App-header">
          <Navigation />
		<Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}/>
          <Route path="/add-exercise" element={<AddExercisePage />}/>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}/>
		  </Routes>
          </div>
      </Router>

      <footer>
        <MdCopyright/>2024 Gomes Lucas
      </footer>
    </div>
  );
}

export default App;