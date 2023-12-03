import styled from "@mui/material/styles/styled";
import { BaseCard } from "./BaseCard";

export const CompactCard = styled(BaseCard)(({ theme }) => ({
    padding: theme.spacing(1),
  }));
  