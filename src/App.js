//npm install react-router-dom
//npm install bootstrap
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Navbar from "./component/navbar"
import ExcercisesList from "./component/excerciseslist"
import EditExcercise from "./component/editexcercise"
import CreateExcercise from "./component/createexcercise"
import CreateUser from "./component/createuser"


function App() {
  return (
    <Router>
      <div className="container mt-2">
        <Navbar />
        <br />
        <Route path="/" exact component={ExcercisesList} />
        <Route path="/edit/:id" exact component={EditExcercise} />
        <Route path="/create" exact component={CreateExcercise} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
