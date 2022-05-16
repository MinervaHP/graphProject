import { useState } from "react";
import "../App.css";
import React from 'react'
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const userNameRegex = RegExp(
    /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$/
  );
  const passwordRegex = RegExp(
    /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/
  )

  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });

    return valid;
  };

  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    password: null,
    formErrors: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: ""
    }
  })

  const handleSubmit = e => {
    e.preventDefault();
    
    if (formValid(state)) {
      console.log(`
          --SUBMITTING--
          First Name: ${state.firstName}
          Last Name: ${state.lastName}
          Last Name: ${state.userName}
          Email: ${state.email}
          Password: ${state.password}
        `);
        UserService.Register(state.firstName,state.lastName,state.userName,state.email,state.password).then((response) => {
        if(response.status==200){
          
          navigate('/log-in');
        }
        },
          (error) => { console.log(error); } )
          document.getElementById("reset-form").reset();
         } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  const { formErrors } = state;
  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 2 ? "השם הפרטי חייב להכיל לחות 2 תווים" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 2 ? " שם המשפחה חייב להכיל לפחות 2 תווים" : "";
        break;
        case "userName":
          formErrors.userName = userNameRegex.test(value)?""
          :"שם המשתמש חייב להיות באורך של לפחות 6 תווים ולהכיל רק אותיות באנגלית"
          break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "כתובת מייל שגויה";
        break;
      case "password":
        formErrors.password =
        passwordRegex.test(value)?"":"סיסמא צריכה להכיל לפחות תו ,מספר ואות גדולה אחת"
        break;
      default:
        break;
    }

   setState({  ...state, [name]: value, formErrors }, () => console.log(state));
  }
  return (

    <div className="wrapper">
      <div className="form-wrapper">
        <h1>צור/י חשבון</h1>
        <form  id="reset-form" onSubmit={handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">שם פרטי</label>
            <input
              className={formErrors.firstName.length > 0 ? "error" : null}
              placeholder="שם פרטי"
              type="text"
              name="firstName"
              noValidate
              onChange={handleChange}
            />
            {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}
          </div>
          <div className="lastName">
            <label htmlFor="lastName">שם משפחה</label>
            <input
              className={formErrors.lastName.length > 0 ? "error" : null}
              placeholder="שם משפחה"
              type="text"
              name="lastName"
              noValidate
              onChange={handleChange}
            />
            {formErrors.lastName.length > 0 && (
              <span className="errorMessage">{formErrors.lastName}</span>
            )}
          </div>
      
          <div className="userName">
            <label htmlFor="userName" style={{display:"block"}}>שם משתמש</label>
            <input 
              className={formErrors.userName.length > 0 ? "error" : null}
              placeholder="שם משתמש"
              type="text"
              name="userName"
              noValidate
              onChange={handleChange}
            />
            {formErrors.userName.length > 0 && (
              <span className="errorMessage">{formErrors.userName}</span>
            )}
          </div>
          <div className="email">
            <label htmlFor="email">מייל</label>
            <input
              className={formErrors.email.length > 0 ? "error" : null}
              placeholder="מייל"
              type="email"
              name="email"
              noValidate
              onChange={handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">סיסמא</label>
            <input
              className={formErrors.password.length > 0 ? "error" : null}
              placeholder="סיסמא"
              type="password"
              name="password"
              noValidate
              onChange={handleChange}
            />
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
          </div>
          <div className="createAccount">
            <button type="submit">צור/י חשבון</button>

          </div>
        </form>
      </div>
    </div>

  )
}

export default SignUp