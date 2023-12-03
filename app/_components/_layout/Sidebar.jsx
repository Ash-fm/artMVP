import React from 'react';
import { Drawer, useMediaQuery, useTheme, Typography } from '@mui/material';

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMdScreenOrBelow = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      variant={isMdScreenOrBelow ? 'temporary' : 'persistent'}
      open={open}
      elevation={4}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        transition: "width 0.2s ease-in-out",
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <div className="toolbar" />
      <Typography variant='h3'>Sidebar</Typography>
    </Drawer>
  );
}
