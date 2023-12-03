import { TextField, Typography } from "@mui/material";
import { StickyBox } from "@/app/_components/_styles/boxes/StickyBox";
import { AssignmentsPaper } from "@/app/_components/_styles/papers/AssignmentsPaper";

export default function InputEditor({
  item,
  isEditing,
  setIsEditing,
  onUpdate,
  isXSScreen,
  title = "Edit Item",
  multiline = false,
  placeholder = "Enter value",
}) {
  const [updatedValue, setUpdatedValue] = useState(item.value || "");

  const handleChange = (value) => {
    setUpdatedValue(value);
  };

  const handleFocus = (e, id) => {
    setUpdatedValue(e.target.value);
    setIsEditing(id);
  };

  const handleBlur = async (e, id) => {
    e.preventDefault();
    if (updatedValue === item.value) {
      setIsEditing(null);
      return;
    }
    await onUpdate(id, updatedValue);
    setIsEditing(null);
  };

  return (
    <TextField
      inputProps={{ maxLength: 100 }}
      fullWidth
      multiline={multiline}
      label={item.id === isEditing ? "Editing Value" : "Value"}
      id={item.label}
      value={item.id === isEditing ? updatedValue : item.value || ""}
      size="small"
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      onFocus={(e) => handleFocus(e, item.id)}
      onBlur={(e) => handleBlur(e, item.id, item.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !multiline) {
          e.preventDefault();
          e.target.blur();
        }
      }}
      InputLabelProps={{
        shrink: true,
        sx: {
          transition: "0.3s ease-in-out",
        },
      }}
    />
  );
}
