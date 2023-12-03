import styled from "@mui/material/styles/styled"; 
import { BaseCard } from "./BaseCard";

export const CenteredCard = styled(BaseCard)(({ theme }) => ({
  alignContent: "center",
  display: "flex",
  flexDirection: "column",
}));
