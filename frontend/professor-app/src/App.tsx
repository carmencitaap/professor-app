import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './static/App.css';
import NavBar from './components/NavBar';
import GeneralDashboard from './components/GeneralDashboard';
import StudentDashboard from './components/StudentDashboard';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <NavBar />
      
        <Router>
          <Routes>
            <Route path='/' Component={Welcome} />
            <Route path="/generaldashboard" Component={GeneralDashboard}/> 
            <Route path="/studentdashboard" Component={StudentDashboard}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
