import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  styled,
} from "@mui/material";

interface Instance {
  id: string;
  type: string;
  state: string;
  name: string;
}

const StartButton = styled(Button)(({ theme }) => ({
  color: theme.palette.success.main,
  borderColor: theme.palette.success.main,
  marginRight: theme.spacing(1),
}));

const StopButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
}));

function AWS() {
  const [instances, setInstances] = useState<Instance[]>([]);

  const [subdomain, setSubdomain] = useState<string>();
  const [password, setPassword] = useState<string>();

  useEffect(() => {
    axios
      .get("http://localhost:6544/instances/all")
      .then((response) => {
        setInstances(response.data.instances);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const startInstance = (id: string) => {
    axios
      .post("http://localhost:6544/instances/startInstance", {
        instanceId: id,
      })
      .then((response) => {
        console.log(response.data);
        // Refresh instances
        axios
          .get("http://localhost:6544/instances/all")
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
      .post("http://localhost:6544/instances/stopInstance", {
        instanceId: id,
      })
      .then((response) => {
        console.log(response.data);
        // Refresh instances
        axios
          .get("http://localhost:6544/instances/all")
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
        {instances?.map((instance, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Typography variant="h6">Instance ID: {instance.id}</Typography>
              <Typography variant="h6">Name: {instance.name}</Typography>
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
        )) || "loading..."}
      </List>
      <TextField
        value={subdomain}
        onChange={(e) => setSubdomain(e.target.value)}
      />
      <TextField
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={async () => {
          try {
            axios.post("http://localhost:6544/instances/launch", {
              subdomain,
              password,
            });
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Launch dev
      </Button>
    </Container>
  );
}

export default AWS;
