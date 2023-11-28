import './App.css';
import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './core/Home';
import Header from "./components/Header";
import Member from "./components/Member";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    }
  return (
      <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path={"/"} extract={true} Component={Home}/>
                  <Route path={"/login"} Component={Login}/>
                  <Route path={"/member"} Component={Member}/>
                  <Route path={"/member/signup"} Component={SignUp}/>
              </Routes>
      </BrowserRouter>
  );
}

export default App;
