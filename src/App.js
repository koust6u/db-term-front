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
import Logout from "./components/Logout";
import BookList from "./components/book/BookList";
import Dashboard from "./components/account/DashBoard";
import BookRegistrationForm from "./components/book/BookRegistrationForm";
import MyBookList from "./components/book/MyBookList";

axios.defaults.withCredentials = true;
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:8080/member/health',{
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        fetchLoginStatus();
    }, []);

    return (
      <BrowserRouter>
              <Header isLoggedIn={isLoggedIn}/>
              <Routes>
                  <Route path={"/"} extract={true} Component={Home}/>
                  <Route path={"/login"} Component={Login}/>
                  <Route path={"/member"} Component={Member}/>
                  <Route path={"/member/signup"} Component={SignUp}/>
                  <Route path={"/logout"} Component={Logout}/>
                  <Route path={"/books"} Component={BookList} />
                  <Route path={"/account"} Component={Dashboard}/>
                  <Route path={"/book/registration"} Component={BookRegistrationForm}/>
                  <Route path={"/book/my"} Component={MyBookList}/>
              </Routes>
      </BrowserRouter>
  );
}

export default App;
