import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import EventItem from './EventItem'


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1
    },
    typography: {
        marginBottom: '1em',
        marginTop: '1em'     
    }
  }));

function EventsPreview({category, events}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center">

                <Grid item xs={10} >
                    <Typography className={classes.typography} variant="h5" color="primary">
                        {category}
                    </Typography>
                    <Grid container item spacing={3} justify="center" alignItems="center">      
                    {events
                        .filter((item, idx) => idx < 4)
                        .map(({id, ...props}) => (
                        <Grid container justify="center" alignItems="center" item xs={12} sm={6} md={3} >
                            <EventItem key={id} {...props}/>
                        </Grid>
                    ))}          
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default EventsPreview;