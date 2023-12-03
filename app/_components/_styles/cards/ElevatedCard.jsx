import styled from "@mui/material/styles/styled";
import { BaseCard } from "./BaseCard";

export const ElevatedCard = styled(BaseCard)(({ theme }) => ({
    boxShadow: theme.shadows[5],
  }));
  