import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";

export const TagsIndexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(4), 
  width: '100%',
  marginTop: theme.spacing(2), 
}));

