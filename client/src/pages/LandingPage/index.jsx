import Typing from "react-typing-animation";
import logo from "../../images/ShibaAV.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import React from "react";
import { getUserDetails } from "../../utils/api";

export function LandingPage() {
  const [user, setUser] = React.useState(`Login`);
  getUserDetails()
    .then(({ data }) => {
      setUser(data.discordtag);
    })
    .catch((e) => console.error(e.message));
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Jorge</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/commands">Commands</Nav.Link>
            <Nav.Link href="/menu">Menu</Nav.Link>
            <Nav.Link href="http://localhost:3001/api/auth/discord/">
              {user}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <header className="App-header">
        <img src={logo} alt="" />
        <Typing>Jorge</Typing>
      </header>
    </div>
  );
}
