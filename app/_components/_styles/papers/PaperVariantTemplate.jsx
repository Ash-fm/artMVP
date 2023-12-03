// Just an example to show how you could create other styled paper variants.
import { styled } from "@mui/material/styles";
import { BasePaper } from "./BasePaper";

export const PaperVariantTemplate = styled(BasePaper)(({ theme }) => ({
  paddingTop: "0px",
  height: `calc(100vh - 180px)`,
  overflow: "auto",
}));
