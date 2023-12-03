"use client";

import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

export default function Route() {
  return (
    <>
      <Grid xs={12}>
        <Typography variant="h1">
          This is a H1 inside a grid with a span of 12
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h2">
          This is a H2 inside a grid with a span of 12
        </Typography>
      </Grid>
    </>
  );
}
