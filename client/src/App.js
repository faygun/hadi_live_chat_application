import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import AppNavbar from './component/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import Register from './component/Register';
import AuthenticatedComponent from './component/AuthenticatedComponent';
import Channel from './component/Channel';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppNavbar/>
        <AuthenticatedComponent>
          <Route exact path="/login" component={Login} />          
          <Route exact path="/register" component={Register} />          
          <Route exact path="/channels" component={Channel} />          
        </AuthenticatedComponent>
      </div>
    </BrowserRouter>
  );
}

export default App;
