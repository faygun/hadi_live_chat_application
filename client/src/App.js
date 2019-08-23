import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import AppNavbar from './component/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import AuthenticatedComponent from './component/AuthenticatedComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppNavbar/>
        <AuthenticatedComponent>
          <Route exact path="/login" component={Login} />          
        </AuthenticatedComponent>
      </div>
    </BrowserRouter>
  );
}

export default App;
