import React from "react";
import {NavLink, withRouter} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CreateIcon from "@material-ui/icons/Create";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreIcon from "@material-ui/icons/MoreVert";
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },

  title: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    textDecoration: 'none',
    cursor: 'pointer'
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

function Header({history}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [authenticated, setAuthenticated] = React.useState(true);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignIn = () => {
    setAuthenticated(true)
  }

  const handleSignOut = () => {
    setAuthenticated(false)
    history.push("/");
    handleMenuClose();
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <Divider />
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <CreateIcon />
        </IconButton>
        <p>Create Event</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={11} color="primary">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
        <p>Likes</p>
      </MenuItem>
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>    
    </Menu>
  );

  return (
    <div style={{ marginBottom: '5em' }} className={classes.grow}>
      <AppBar color="transparent" position="static">
        <Toolbar>
            <Typography
              color="primary"
              className={classes.title}
              variant="h4"
              noWrap
              component={NavLink} to="/"
            >
              Eventure
            </Typography>

          <div className={classes.grow} />

          <Button color="inherit" component={NavLink} to="/events">Browse Events</Button>

          <div className={classes.sectionDesktop}>          
            {authenticated 
              ? <>
              <Button color="secondary" component={NavLink} to="/createEvent">Create Event</Button>
              <Tooltip title="Likes">
                <IconButton color="inherit" component={NavLink} to="/likes">
                  <Badge badgeContent={7} color="primary">
                    <FavoriteBorderIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                  <AccountCircle />
                </IconButton>
              </>
            : <Button color="primary" onClick={handleSignIn}>Sign In</Button> }

          </div>

           
          <div className={classes.sectionMobile}>
            {authenticated  
              ? <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              : <Button color="primary" onClick={handleSignIn}>Sign In</Button>}
          </div>
                   
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default withRouter(Header);