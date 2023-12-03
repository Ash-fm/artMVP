import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ModalBox } from "../_styles/boxes/ModalBox";

export default function ConfirmationModal({ 
  open, 
  handleClose, 
  item, 
  action 
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleAction = () => {
    action(item.id);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalBox>
        <Typography
          id="modal-title"
          variant="h4"
          component="h2"
          align="center"
        >
          Are you sure you want to perform this action?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAction}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
}
