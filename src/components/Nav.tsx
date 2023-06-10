import { useState } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { client } from "../utils";

export default function Nav() {
  const { user, isSignedIn } = useUser();
  const [content, setContent] = useState("");

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.replace(/\s/g, "").length === 0) {
      return null;
    } else {
      const doc = {
        _type: "post",
        name: user?.firstName,
        avatar: user?.profileImageUrl,
        content,
        userId: user?.id,
      };
      await client.create(doc).then(() => {
        window.location.reload();
      });
    }
  };
  return (
    <div className="w-full h-[12vh] px-5 lg:px-[12vw] flex items-center lg:border-b lg:border-gray-300">
      <div className="w-1/4 flex justify-start items-center">
        <Link className="text-2xl font-bold" to="/">
          Avio
        </Link>
      </div>
      {isSignedIn ? (
        <form
          className="w-1/2 h-full border-x border-gray-300 hidden lg:flex items-center gap-2 px-2"
          onSubmit={createPost}
        >
          <input
            className="grow bg-transparent outline-none"
            type="text"
            placeholder="What is on your mind?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <button>
            <AiOutlinePlus />
          </button>
        </form>
      ) : (
        <div className="w-1/2 h-full border-x border-gray-300 hidden lg:grid place-items-center">
          <p>Sign in to post</p>
        </div>
      )}
      <div className="w-1/4 hidden lg:flex justify-end items-center">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <button className="px-4 py-2 bg-[#111111] text-gray-200 rounded-lg">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
