import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CharitySvg from "../components/SVG Components/CharitySvg";
import EducationSvg from "../components/SVG Components/EducationSvg";
import EntertainmentSvg from "../components/SVG Components/EntertainmentSvg";
import FitnessSvg from "../components/SVG Components/FitnessSvg";
import HobbySvg from "../components/SVG Components/HobbySvg";
import BusinessSvg from "../components/SVG Components/BusinessSvg";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer"
  },
  svgProp: {
    width: "100%",
    height: "auto",
    transition: "all .5s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)"
    }
  }
}));



export default function Homepage({history}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={1} />

        <Grid
          xs={12}
          sm={10}
          item
          container
          spacing={7}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} className={classes.paper} onClick={() => history.push("/charity")}>
              <CharitySvg className={classes.svgProp} />
              <Typography variant="h6">Charity & Causes</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} className={classes.paper} onClick={() => history.push("/business")}>
              <BusinessSvg className={classes.svgProp} />
              <Typography variant="h6">Business & Professional</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} className={classes.paper} onClick={() => history.push("/education")}>
              <EducationSvg className={classes.svgProp} />
              <Typography variant="h6">Education</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} className={classes.paper}onClick={() => history.push("/entertainment")}>
              <EntertainmentSvg className={classes.svgProp} />
              <Typography variant="h6">Entertainment</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} className={classes.paper} onClick={() => history.push("/health")}>
              <FitnessSvg className={classes.svgProp} />
              <Typography variant="h6">Health & Wellness</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={0} className={classes.paper} onClick={() => history.push("/hobbies")}>
              <HobbySvg className={classes.svgProp} />
              <Typography variant="h6">Hobbies & Special Interests</Typography>
            </Paper>
          </Grid>
          
        </Grid>
        <Grid item sm={1} />
      </Grid>
    </div>
  );
}
