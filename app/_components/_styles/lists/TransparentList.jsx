import { styled } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export const TransparentListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: "transparent",
  overflow: "hidden",
}));

export const TransparentList = styled(List)(({ theme }) => ({
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  zIndex: 1,
  overflow: "hidden",
}));
