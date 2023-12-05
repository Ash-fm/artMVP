"use client";

import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function HomePage() {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ height: "calc(100vh - 140px)" }}
    >
      <Grid item xs={8}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "100px",
            lineHeight: "100px",
            fontWeight: 700,
          }}
        >
          On-chain Art is Better Off-chain
        </Typography>
        <Link href="/sketchpage" passHref>
          <Button
            variant="outlined"
            sx={{ borderRadius: 5, padding: "1rem", borderColor: "black" }}
            component="a"
          >
            See The Works
          </Button>
        </Link>
      </Grid>
      <Grid item xs={4}>
        <Typography>
          We are building an art platform inspired by (and derived from!) crypto technology -
           Join the list for early access
        </Typography>

      </Grid>
    </Grid>
  );
}