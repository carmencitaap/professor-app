import React, { useState, useEffect } from 'react';
import './static/App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import GetTask from './api/answerTask';
import Register from './api/Register';
import Login from './api/Login'
import CreateTask from './api/createTask';
import GetStudentInfo from './api/getStudentInfo';
import GetNumeric from './api/getNumeric';

function App() {
  // const [currentUser, setCurrentUser] = useState(true);

  // if (currentUser) { 
  return (
      <div>
        
        {/* <CreateTask/> */}
        <Router>
          <GetStudentInfo/>
          <Routes>
            <Route path="/:studentId" Component={CreateTask} />
            <Route path="/:studentId/answertask/:taskId" Component={GetTask}/> 
            <Route path="/:studentId/getNumeric/:taskId" Component={GetNumeric} />
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
