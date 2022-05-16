
import './App.css';
import GraphView from './components/GraphView';
import Footer from './components/Footer';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Nav, Navbar } from 'react-bootstrap';
import logo from './images/logo.jpg'
import { useState } from 'react';
function App() {
  const [user, setUser] = useState();
  return (

    <div className="App">

      <Navbar bg="dark" variant='dark'>

        <Navbar.Brand href="/"><img src={logo} style={{ height: "60px", width: "30%" }}></img> <p style={{ marginLeft: "300px", display: "inline-block" }}> בואו ללמוד כיצד פועלים אלגוריתמי הגרפים</p>    </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className='justify-content-end'>
            <Nav.Link style={{ fontSize: "large" }} href='/log-in'>התחבר</Nav.Link>
            <Nav.Link style={{ fontSize: "large" }} href='/sign-up'>הרשם</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
      <BrowserRouter>

        <Routes>
          <Route path="/log-in" element={<Login />} />
          <Route path='/' element={<GraphView />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>


  );
}


export default App;
