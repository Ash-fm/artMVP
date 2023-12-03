import { useState } from "react";
import ConfirmationModal from "/app/_components/modals/ConfirmationModal";
import IconButton from '@mui/material/IconButton';

export default function ActionButton({ 
  item, 
  action, 
  conditionToShowModal, 
  IconComponent 
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (conditionToShowModal(item)) {
      setOpen(true);
    } else {
      action(item.id);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="action">
        <IconComponent />
      </IconButton>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        item={item}
        action={action}
      />
    </>
  );
}
