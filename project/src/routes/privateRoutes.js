import {
  Create,
  HomeOutlined,
  MenuOutlined,
  Google,
  Assignment,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import whiteLogo from "../assets/white-logo.jpg";
import { AuthGoogleContext } from "../contexts/authGoogle";

export const PrivateRoutes = () => {
  const { user, signOut } = useContext(AuthGoogleContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState();

  useEffect(() => {
    function isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
    if (isJsonString(user)) {
      setUserLoggedIn(JSON.parse(user));
    }
  }, [user]);

  if (!userLoggedIn) {
    return;
  }

  const navigationItems = [
    {
      text: "Home",
      href: () => navigate("/"),
      icon: <HomeOutlined />,
    },
    {
      text: "Create Question",
      href: () => navigate("/create-question"),
      icon: <Create />,
    },
    {
      text: "Create Test",
      href: () => navigate("/create-test"),
      icon: <Assignment />,
    },
    {
      text: "Sign out",
      href: () => {
        signOut();
        navigate("/");
      },
      icon: <Google />,
    },
  ];

  const ButtonAppBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MenuOutlined />
              </IconButton>
              <Box
                component="img"
                src={whiteLogo}
                sx={{ height: 70, cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography paddingRight={4}>
                {userLoggedIn.displayName}
              </Typography>
              <Avatar
                alt={userLoggedIn.displayName}
                src={userLoggedIn.photoURL}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          sx={{
            paddingTop: "64px",
          }}
        >
          {navigationItems.map((item) => {
            return (
              <ListItem disablePadding key={item.text}>
                <ListItemButton
                  onClick={() => {
                    item.href();
                    setMenuOpen(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </Drawer>
      </Box>
    );
  };

  return (
    <>
      <ButtonAppBar />
      <Outlet />
    </>
  );
};
