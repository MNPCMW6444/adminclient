import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";

const StartButton = styled(Button)(({ theme }) => ({
  color: theme.palette.success.main,
  borderColor: theme.palette.success.main,
  marginRight: theme.spacing(1),
}));

const StopButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
}));

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

  const startInstance = (id: string) => {
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

  const stopInstance = (id: string) => {
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
              <Typography variant="h6">
                Instance ID: {(instance as any).id}
              </Typography>
              <Typography variant="body1">
                Type: {(instance as any).type}
              </Typography>
              <Typography variant="body1">
                State: {(instance as any).state}
              </Typography>
            </ListItemText>
            <StartButton
              variant="outlined"
              onClick={() => startInstance((instance as any).id)}
            >
              Start
            </StartButton>
            <StopButton
              variant="outlined"
              onClick={() => stopInstance((instance as any).id)}
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
