import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Header from "./core/Header";
import Member from "./components/Member";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

axios.defaults.withCredentials = true;
function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchLoginStatus = async () => {
            try {
                // Assuming your API endpoint returns a boolean value
                const response = await axios.get(`${process.env.REACT_APP_LOCAL}member/health`);
                console.log(response.data.isLoggedIn);
                setLoggedIn(response.data.isLoggedIn);
            } catch (error) {
                console.error('Error fetching login status:', error);
            }
        };

        fetchLoginStatus();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
      <BrowserRouter>
              <Header isLoggedIn={isLoggedIn}/>
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
