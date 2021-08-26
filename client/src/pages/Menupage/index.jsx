import React from "react";
import { getGuilds, getUserDetails } from "../../utils/api";
import { MenuComponent } from "../../components";
import { Nav, Navbar, Container } from "react-bootstrap";

export function MenuPage({ history }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [guilds, setGuilds] = React.useState([]);

  React.useEffect(() => {
    getUserDetails()
      .then(({ data }) => {
        setUser(data.discordtag);
        setLoading(false);
        return getGuilds();
      })
      .then(({ data }) => {
        console.log(data);
        setGuilds(data);
      })
      .catch((err) => {
        history.push("/");
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    !loading && (
      <div>
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
          <MenuComponent guilds={guilds}></MenuComponent>
        </header>
      </div>
    )
  );
}
