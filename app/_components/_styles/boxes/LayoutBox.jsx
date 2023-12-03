import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const LayoutBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  width: open && window.innerWidth >= theme.breakpoints.values.md ? `calc(100% - 240px)` : `100%`,
  height: `calc(100% - 56px)`,
  marginTop: "64px",
  paddingTop: "16px",
  transition: theme.transitions.create("width", {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  position: "fixed",
  right: "0",
  bottom: "0",
  overflowY: "scroll",
  backgroundColor: theme.palette.neutral[50],
  color: theme.palette.neutral[900],
}));
