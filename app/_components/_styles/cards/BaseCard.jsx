import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BaseCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    borderColor: theme.palette.neutral[500],
    boxShadow: 3,
    variant: "outlined",
  }));