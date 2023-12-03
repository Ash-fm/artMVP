import TextField from "@mui/material/TextField";

export default function SearchFilter({ setSearchValue, searchValue }) {
  return (
    <TextField
    sx={{ mt: "auto" }}
      fullWidth
      label={"Search"}
      value={searchValue || ""}
      id={"search"}
      size="small"
      placeholder={"Search"}
      onChange={(e) => setSearchValue(e.target.value)}
      InputLabelProps={{
        shrink: true,
        sx: {
          transition: "0.3s ease-in-out",
        },
      }}
    />
  );
}
