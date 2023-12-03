import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const BasePaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(5),
  backgroundColor: theme.palette.neutral[50],
  backgroundImage: "none",
  opacity: 0, // initially hidden
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeOut,
  }),
  '&.appear': {
    opacity: 1,
  },
}));
