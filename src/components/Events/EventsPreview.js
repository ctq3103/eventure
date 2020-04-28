import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import EventItem from './EventItem'


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1
    },
    typography: {
        marginBottom: '20px',
        marginTop: '40px'     
    }
  }));

function EventsPreview({category, events}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={1}></Grid>

                <Grid item xs={10} >
                    <Typography className={classes.typography} variant="h4" color="primary">
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
                
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    )
}

export default EventsPreview;