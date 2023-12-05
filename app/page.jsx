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
      </Grid>
      <Grid item xs={4}>
        <Typography>
          Currently making art inspired by (and derived from!) crypto technology.
          Art changes, so do we - Join the list for early access
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
    </Grid>
  );
}




// "On-chain Art is Better Off-chain"

// "Crypto Art is Better Off-chain"

// "Digital Art Doesn't Need to be On-chain"

// "Digital Art is Better Off-chain"

// currently making art inspired by (and derived from!) crypto technology.
// Art changes so do we - follow <TwitterLogo /> for new stuff

// Life is better off screen. Life imitates art. Were taking art offscreen

// putting art back where it belongs

// dont kill what you hate (NFTs) Save what you love (physical art)

// buckmister fuller - dont try to kill old bad models - render them obsolete with better models