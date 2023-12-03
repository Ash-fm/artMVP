import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ModalBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: theme.size.small,
    background: theme.palette.mode === "dark" ? theme.palette.neutral[800] : theme.palette.neutral[50],
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
    borderRadius: "10px"
  }));