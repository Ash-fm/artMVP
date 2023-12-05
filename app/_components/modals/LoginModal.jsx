"use client";

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// Update your styled component according to your design requirements
import { ModalBox } from "@/app/_components/_styles/boxes/ModalBox";

export default function EarlyAccessModal(props) {
  const { open, handleClose } = props;

  const [email, setEmail] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Assuming early access is handled like a regular sign up without a password
  const handleEarlyAccessSignup = async () => {
    await supabase.auth.signUp({
      email,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    // You may want to provide user feedback here before refreshing or navigating
    router.refresh();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="early-access-modal-title"
      aria-describedby="early-access-modal-description"
    >
      <ModalBox>
        <Typography id="early-access-modal-title" variant="h6" component="h2">
          Get Early Access
        </Typography>
        <Typography id="early-access-modal-description" sx={{ mt: 2 }}>
          Enter your email below to join our early access list:
          <input
            name="email"
            type="email"
            placeholder="Your email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Button onClick={handleEarlyAccessSignup}>Join Now</Button>
        </Typography>
      </ModalBox>
    </Modal>
  );
}
