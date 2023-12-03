"use client";

import React, {useState} from "react";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Box from "@mui/material/Box";

import ContentContainer from "@/app/_components/_layout/ContentContainer";
import Header from "@/app/_components/_layout/Header";
import Sidebar from "@/app/_components/_layout/Sidebar";

import useThemeStore from "@/app/_hooks/store/useThemeStore";
import useStore from "@/app/_hooks/store/useStore";
import { Typography } from "@mui/material";


export default function RootLayout({ children}) {
  const mode = useStore(useThemeStore, (state) => state.mode);
  const [open, setOpen] = useState(false);
  function handleDrawerToggle() {
    setOpen(!open);
  }

  if (mode === undefined) {
    return (
      <html lang="en">
      <ThemeRegistry>
        <body>
          <Box display="flex" width="100%" height="100%" justifyContent="center" alignItems="center">
            <Typography variant="h2">Loading State...</Typography>
          </Box>
        </body>
      </ThemeRegistry>
    </html>
    )
  }

  return (
    <html lang="en">
      <ThemeRegistry mode={mode}>
        <body>
          <Box display="flex" width="100%" height="">
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Sidebar open={open} onClose={handleDrawerToggle}/>
          </Box>
          <ContentContainer open={open} children={children} />
        </body>
      </ThemeRegistry>
    </html>
  );
}
