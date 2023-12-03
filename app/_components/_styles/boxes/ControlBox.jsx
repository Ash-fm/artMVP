import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ControlBox = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 42,
  width: 42,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: theme.spacing(1),
}));
