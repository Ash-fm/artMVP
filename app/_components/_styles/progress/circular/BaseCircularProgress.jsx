import { styled } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";

export const BaseCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: "-12px",
  marginLeft: "-12px",
  opacity: 0, // initially hidden
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeOut,
  }),
  '&.appear': {
    opacity: 1,
  },
}));
