import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import AppNavbar from './component/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppNavbar/>
      </div>
    </BrowserRouter>
  );
}

export default App;
