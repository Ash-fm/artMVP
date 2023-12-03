"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Typography,
  CircularProgress,
  Container,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useDynamic from "@/app/_hooks/supabase/useDynamic";

export default function TagPage() {
  const pathname = usePathname();
  const tableName = pathname.replace("/route/", "");
  const { items, isLoading, error, addItem, deleteItem, updateItem, updateOrder } =
    useDynamic(decodeURIComponent(tableName));

  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  // if (error) {
  //   return <Typography variant="body2">Error: {error}</Typography>;
  // }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Box
            display="flex"
            flex-direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1, mb: 2 }}
          >
            <Typography variant="h2">
              H2 Insisde a box with a span of 12
            </Typography>

            <Link href="/route" passHref>
              <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                <Typography variant="button">Back</Typography>
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Typography variant="">
            {items.length ? "Array of Items" : "No content found for this route."}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
