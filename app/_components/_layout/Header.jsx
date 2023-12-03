import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Typography from "@mui/material/Typography";

import ToggleTheme from "../buttons/ToggleTheme";
import LoginButton from "@/app/_components/buttons/LoginButton";

export default function Header({open, handleDrawerToggle}) {

  return (
    <AppBar
      enableColorOnDark
      position="fixed"
      sx={{
        width: open ? `calc(100% - 240px)` : `100%`,
        transition: "width 0.2s ease-in-out",
      }}
    >
      <Toolbar>
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="Toggle Sidebar Button"
          sx={{
            transform: !open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <MenuOpenIcon />
        </IconButton>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1, pl: 3 }}>
          SNZM-Bootstrap
        </Typography>
        <ToggleTheme />
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
}
