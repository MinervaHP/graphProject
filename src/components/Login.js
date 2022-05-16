import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    userName: null,
    password: null,
    formErrors: {
      userName: "",
      password: ""
    }
  })
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

  const handleSubmit = e => {
    e.preventDefault();

    if (formValid(state)) {
      console.log(`
        --SUBMITTING--
        User Name: ${state.userName}
        Password: ${state.password}
      `);
      UserService.Login(state.userName, state.password).then((response) => {
        if (response.status == 200) {

          navigate('/');
        }
      },
        (error) => { setShow(true) });
      document.getElementById("reset-form").reset();
    }
    else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  const { formErrors } = state;

  const handleChange = e => {

    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...state.formErrors };

    switch (name) {
      case "userName":
        formErrors.userName =
          userNameRegex.test(value)
            ? ""
            : "שם משתמש שגוי";
        break;

      case "password":
        formErrors.password =
          passwordRegex.test(value) ? ""
            : "הסיסמא שגויה";
        break;
      default:
        break;
    }

    setState({ ...state, [name]: value, formErrors }, () => console.log(state));
  };
  return (
    <div>
      <Alert show={show}  variant="danger" onClose={() => setShow(false)} dismissible>
        שם משתמש או סיסמא שגויים
      </Alert>
      <form id="reset-form" className="login-wrapper" onSubmit={handleSubmit} noValidate>

        <label className='logInP'  >שם משתמש <BiUserCircle /></label>
        <input type="text" placeholder='שם משתמש'
          className={formErrors.userName.length > 0 ? "error" : null}
          name="userName"
          noValidate
          onChange={handleChange} />

        <span style={{ color: "red" }} className="errorMessage">{formErrors.userName}</span>

        <label className='logInP'>סיסמא <RiLockPasswordLine /></label>
        <input type="password" placeholder='סיסמא'
          className={formErrors.userName.length > 0 ? "error" : null}
          name="password"
          noValidate
          onChange={handleChange} />
        <span style={{ color: "red" }} className="errorMessage">{formErrors.password}</span>

        <div>

          <button className='mybtn' type="submit">כניסה</button>
        </div>
      </form>
    </div>
  )
}

export default Login