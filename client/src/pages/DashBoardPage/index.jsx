import React from "react";
import { DashboardForm } from "../../components";
import { Nav, Navbar, Container } from "react-bootstrap";
import {
  getGuildConfig,
  getUserDetails,
  updateGuildPrefix,
} from "../../utils/api";

export function DashBoardPage({ history, match }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [config, setConfig] = React.useState({});

  React.useEffect(() => {
    getUserDetails()
      .then(({ data }) => {
        setUser(data.discordtag);
        return getGuildConfig(match.params.id);
      })
      .then(({ data }) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        history.push("/");
        setLoading(false);
      });
  }, []);

  async function updatePrefixParent(prefix) {
    try {
      const update = await updateGuildPrefix(match.params.id, prefix);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    !loading && (
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
        <header className="App-form">
          <h1>{config.guildName}</h1>
          <DashboardForm
            user={user}
            config={config}
            updatePrefix={updatePrefixParent}
          />
        </header>
      </div>
    )
  );
}
