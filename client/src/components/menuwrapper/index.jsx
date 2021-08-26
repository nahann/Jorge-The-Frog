import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../utils/api";

export function MenuComponent({ guilds }) {
  console.log(guilds)
  return (
    <div>
    <img></img>
      {guilds.map((guild) => (
        <div>
          <li>{guild.name}</li>
          <Link to={`/dashboard/${guild.id}`}>
            <Button colorScheme="teal" variant="link">
              View Dashboard
            </Button>
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}
