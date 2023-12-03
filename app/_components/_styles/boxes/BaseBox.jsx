import { Box } from "@material-ui/core";
import { styled } from "@mui/material/styles";

export const BaseBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(4),
    width: '100%',
    marginTop: theme.spacing(2),
  }));