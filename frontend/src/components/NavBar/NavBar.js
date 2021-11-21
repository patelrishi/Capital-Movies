import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import { ReactComponent as CapitalMovies } from "../../assets/svg/CapitalMoviesLogo.svg";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@material-ui/core";
import classNames from "classnames";
const useStyles = makeStyles((theme) => ({
  NavBarRoot: {
    background: "rgba(0,0,0,0.7)",
  },
  grow: {
    flexGrow: 1,
    "&>header": {
      color: "#e50914",
      background: "rgba(0,0,0,0.7)",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  scoutibleButtonGroup: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "&>button": {
      color: "#e50914",
    },
  },
  active: {
    background: "#FFFFFF",
  },
}));

export default function NavBar({ currentTab, setCurrentTab, user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    window.location.href = "/auth";
    handleMenuClose();
  };

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
      <MenuItem onClick={logout}>Logout</MenuItem>
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
      <CapitalMovies />
      <MenuItem onClick={() => setCurrentTab("popular")}>
        <p>Popular</p>
      </MenuItem>
      <MenuItem onClick={() => setCurrentTab("latest")}>
        <p>Latest</p>
      </MenuItem>
      <MenuItem onClick={() => setCurrentTab("favourites")}>
        <p>Favourites</p>
      </MenuItem>
      <MenuItem onClick={() => logout()}>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.NavBarRoot}>
          <Link onClick={() => (window.location.href = "/discover")}>
            <CapitalMovies />
          </Link>
          <ButtonGroup className={classes.scoutibleButtonGroup}>
            <Button
              className={classNames(currentTab === "popular" && classes.active)}
              variant="outlined"
              onClick={() => setCurrentTab("popular")}
            >
              Popular
            </Button>
            <Button
              className={classNames(currentTab === "latest" && classes.active)}
              onClick={() => setCurrentTab("latest")}
            >
              Latest
            </Button>
            {user?.watchList && (
              <Button
                className={classNames(
                  currentTab === "favourites" && classes.active
                )}
                onClick={() => setCurrentTab("favourites")}
              >
                Favourites
              </Button>
            )}
          </ButtonGroup>
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
