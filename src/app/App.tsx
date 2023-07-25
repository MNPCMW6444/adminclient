import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function App() {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    axios
      .get("/api/all")
      .then((response) => {
        setInstances(response.data.allInstances);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const startInstance = (id) => {
    axios
      .post("/api/startInstance", { instanceId: id })
      .then((response) => {
        console.log(response.data);
        // Refresh instances
        axios
          .get("/api/all")
          .then((response) => {
            setInstances(response.data.allInstances);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const stopInstance = (id) => {
    axios
      .post("/api/stopInstance", { instanceId: id })
      .then((response) => {
        console.log(response.data);
        // Refresh instances
        axios
          .get("/api/all")
          .then((response) => {
            setInstances(response.data.allInstances);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        EC2 Instances
      </Typography>
      <List>
        {instances.map((instance, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Typography variant="h6">Instance ID: {instance.id}</Typography>
              <Typography variant="body1">Type: {instance.type}</Typography>
              <Typography variant="body1">State: {instance.state}</Typography>
            </ListItemText>
            <StartButton
              variant="outlined"
              onClick={() => startInstance(instance.id)}
            >
              Start
            </StartButton>
            <StopButton
              variant="outlined"
              onClick={() => stopInstance(instance.id)}
            >
              Stop
            </StopButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
