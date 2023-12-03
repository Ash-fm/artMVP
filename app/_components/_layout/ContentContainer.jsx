import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { LayoutBox } from "@/app/_components/_styles/boxes/LayoutBox";

export default function ContentContainer(props) {
  return (
    <LayoutBox open={props.open}>
      <Grid container spacing={3} 
      sx={{
        marginTop: "16px",
        marginLeft: "16px",
        width: "calc(100% - 32px)",
      }}>
        {props.children}
      </Grid>
    </LayoutBox>
  );
}