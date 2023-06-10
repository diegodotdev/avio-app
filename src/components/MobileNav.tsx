import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useModalStore } from "../store/modalStore";
import { cn } from "../utils";

export default function MobileNav() {
  const { user, isSignedIn } = useUser();
  const { handleModalState } = useModalStore();

  return (
    <div className="w-full h-[10vh] flex lg:hidden justify-between items-center px-5 text-2xl">
      <Link
        className={cn("grid place-items-center", user ? "w-1/3" : "w-1/2")}
        to="/"
      >
        <AiOutlineHome />
      </Link>
      <button
        className={cn(
          "w-1/3 grid place-items-center",
          user ? "inline" : "hidden"
        )}
        onClick={handleModalState}
      >
        <AiOutlinePlusCircle />
      </button>
      {isSignedIn ? (
        <div className="w-1/3 grid place-items-center">
          <UserButton />
        </div>
      ) : (
        <SignInButton>
          <button
            className={cn("grid place-items-center", user ? "w-1/3" : "w-1/2")}
          >
            <AiOutlineUser />
          </button>
        </SignInButton>
      )}
    </div>
  );
}
