import React, { useState } from "react";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import MainBackGround from "../UI/MainBackGround";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorBackDrop from "../components/ErrorMessages/ErrorBackDrop";
import { setAuthToken } from "../hooks/auth/setAuthToken";
import api from "../services/api";

export default function Login(props) {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [ErrorMessages, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const reciveLoginFormData = async (reciveData) => {
    const response = await api.post("/auth/login", {
      email: reciveData.userEmail,
      password: reciveData.userPassword,
    });
    if (response.data.auth) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setAuthToken();
      // window.location.href = "/Home";
      navigate("/Home");
    } else {
      //navigate("/Login");
      setErrorMessage("Invalid Username or Password , Please Try again");
      setShowBackdrop(true);
    }
  };
  const closeErrorHandler = () => {
    setShowBackdrop(false);
  };
  return (
    <MainBackGround>
      <LoginForm sendLoginData={reciveLoginFormData} />
      <ErrorBackDrop
        CloseBackDrop={closeErrorHandler}
        show={showBackdrop}
        HandelMessage={ErrorMessages}
      />
    </MainBackGround>
  );
}
