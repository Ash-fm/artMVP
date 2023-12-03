import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Slide,
  Fade,
  Box,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function AddItemButton({ addItem, label = "Item" }) {
  const [item, setItem] = useState("");
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isXSScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleSubmit = async () => {
    if (!item || item === "" || item === null || item === undefined) {
      alert(`A ${label.toLowerCase()} must have a name.`);
      setSubmitting(false);
      return;
    }

    setSubmitting(true);
    try {
      await addItem(item);
      setItem("");
    } catch (error) {
      console.error(`Error adding ${label.toLowerCase()}:`, error);
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const handleAddItemClick = () => {
    setSubmitting(true);
    setOpen(true);
  };

  const handleCancel = () => {
    setSubmitting(true);
    setOpen(false);
  };

  const handleExited = () => {
    if (submitting) {
      setSubmitting(false);
    }
  };

  return (
    <form>
      <Slide
        mountOnEnter
        unmountOnExit
        timeout={300}
        direction="right"
        in={open && !submitting}
        onExited={handleExited}
      >
        <Box sx={{ height: "60px", pl: 2, pt: 1 }}>
          <Fade timeout={100} in={open && !submitting}>
            <Grid container sx={{ height: "60px" }} spacing={3}>
              <Grid xs={4.5} sm={5.5} md={3.5} lg={2.5} xl={2}>
              <TextField
                  fullWidth
                  label={`New ${label}`}
                  size="small"
                  value={item}
                  color="primary"
                  autoFocus
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit();
                    }
                    if (e.key === "Escape") {
                      e.preventDefault();
                      handleCancel();
                    }
                  }}
                />
              </Grid>
              <Grid xs={3} md={2}>
                <Button onClick={handleSubmit} fullWidth variant="contained">
                  <Typography variant="button">
                    {isXSScreen ? "✓" : "Add ✓"}
                  </Typography>
                </Button>
              </Grid>
              <Grid xs={3} md={2}>
                <Button fullWidth variant="outlined" onClick={handleCancel}>
                  <Typography variant="button">
                    {isXSScreen ? "✗" : "Cancel ✗"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Slide>

      <Slide
        mountOnEnter
        unmountOnExit
        timeout={300}
        direction="right"
        in={!open && !submitting}
        onExited={handleExited}
      >
        <Box sx={{ height: "60px", pl: 2, pt: 1 }}>
          <Fade timeout={100} in={!open && !submitting}>
            <Grid container sx={{ height: "60px" }} spacing={3}>
              <Grid xs={5.5} md={3.5} lg={2.5} xl={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddItemClick}
                >
                  <Typography variant="button">Add Item</Typography>
                </Button>
              </Grid>
              <Grid>
                {open && tag && (
                  <Typography variant="h6">Added Item : {item}</Typography>
                )}
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Slide>
    </form>
  );
}
