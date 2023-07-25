import { Tabs, Tab, Grid } from "@mui/material";
import { useState } from "react";
import AWS from "./apps/AWS";

const App = () => {
  const [page, setPage] = useState("");

  return (
    <Grid
      container
      direction="column"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Grid item>
        <Tabs
          value={page}
          onChange={(_, newValue) => setPage(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          style={{ flex: 1 }}
        >
          <Tab label="instances" value="instances" />
          <Tab label="failean-oc" value="failean-oc" />
        </Tabs>
      </Grid>
      {page === "instances" && <AWS />}
    </Grid>
  );
};

export default App;
