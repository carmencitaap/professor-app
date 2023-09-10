import React, { useState, useEffect } from 'react';
import './static/App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import AnswerTask from './components/AnswerTask';
import Register from './api/Register';
import Login from './api/Login'
import CreateTask from './api/createTask';

function App() {
  // const [currentUser, setCurrentUser] = useState(true);

  // if (currentUser) { 
  return (
      <div>
        <NavBar />
        
        {/* <CreateTask/> */}
        <Router>
          <Routes>
            <Route path="/:studentId" Component={CreateTask} />
            {/* <Route path="/answertask/" Component={AnswerTask}/> */}
          </Routes>
          
        </Router>
      </div>
    );
  // } else {
  //   return (
  //     <div>
  //     <Login/>
  //       <Router>
  //         <Routes>
  //           <Route path="/register" Component={Register}/>
  //           <Route path="/home" Component={Home}/>
  //         </Routes>
  //       </Router>
  //     </div>
  //   )
  // }
}

export default App;
