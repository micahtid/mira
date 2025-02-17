"use client";

import ConfirmationModal from "@/components/dashboard/ConfirmationModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
        <ConfirmationModal />
    </div>
  );
};

export default ModalProvider;