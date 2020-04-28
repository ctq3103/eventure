import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route } from 'react-router-dom';

import Header from "./components/Header/Header";
import Homepage from "./pages/Events/Homepage";
import BrowseEvents from "./pages/Events/BrowseEvents";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ef706f",
      main: "#eb4d4b",
      dark: "#a43534",
      contrastText: "#fff"
    },
    secondary: {
      light: "#868ae6",
      main: "#686de0",
      dark: "#484c9c",
      contrastText: "#fff"
    }
  }
});

export default function App() {
  return (
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/events" component={BrowseEvents} />
        </Switch>
      </ThemeProvider>
  );
}

