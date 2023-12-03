"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useIsUser } from "@/app/_hooks/supabase/useIsUser";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

import LoginModal from "@/app/_components/modals/LoginModal";

const HeaderButton = styled(Button)`
  margin-right: 8px;
  color: white;
  border: 1px solid white;
  &:hover {
    background-color: white;
    color: black;
  }
`;

export default function LoginButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { isUser, setSignOut } = useIsUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSignOut();
    router.refresh();
  };

  if (isUser) {
    return (
      <>
        <HeaderButton onClick={handleSignOut}>Sign Out</HeaderButton>
      </>
    );
  } else {
    return (
      <>
        <HeaderButton onClick={() => handleOpen()}>Sign In</HeaderButton>
        <LoginModal open={open} handleClose={handleClose} />
      </>
    );
  }
}
