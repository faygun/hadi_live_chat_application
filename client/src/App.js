import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import AppNavbar from './component/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppNavbar/>
        <Route exact path="/" component={Login} />
      </div>
    </BrowserRouter>
  );
}

export default App;
