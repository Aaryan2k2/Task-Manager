// src/App.jsx (if you already have content)
import React from 'react';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import TaskList1 from './component/TaskList.jsx';
import TaskDetail1 from './component/TaskDetail.jsx';
// import TaskForm from './components/TaskForm';
// Add any other imports you have



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TaskList1/>} />
        <Route path="task/:id" element={<TaskDetail1/>} />



        {/* Add any other routes or logic you already have */}
      </Routes>
    </Router> 
  );
}

export default App;
