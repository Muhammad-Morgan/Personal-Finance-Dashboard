"use client";
import { Loader, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const LogoutButton = ({
  deleteSession,
}: {
  deleteSession: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    setIsLoading(true);
    await delay(500);
    await deleteSession();
    toast.success("Logged out");
    setIsLoading(false);
    return redirect("/");
  };
  return (
    <Button
      className="cursor-pointer"
      variant="secondary"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="hidden xl:inline text-sm font-light">Loading</span>
          <Loader />
        </>
      ) : (
        <>
          <span className="hidden xl:inline text-sm font-light">Sign out</span>
          <LogOutIcon />
        </>
      )}
    </Button>
  );
};

export default LogoutButton;
