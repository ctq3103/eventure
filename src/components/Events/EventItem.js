import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 340
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

function EventItem({title, date, venue, imageUrl}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={title}
      />

      <CardContent>
        <Typography variant="button" align="left" color="primary" component="p">
          {date}
        </Typography>
        <Typography variant="h6" align="left" color="textPrimary" component="p">
          {title}
        </Typography>
      </CardContent>

      <CardActions align="right" disableSpacing>
        <Tooltip title="Add to favorites">
          <IconButton aria-label="add to favorites" outlined>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="See details">
          <IconButton aria-label="share">
            <LaunchIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default EventItem;
