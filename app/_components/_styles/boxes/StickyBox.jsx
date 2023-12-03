import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const StickyBox = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 5,
  backgroundColor: theme.palette.neutral[50],
  paddingTop: theme.spacing(5),
}));
