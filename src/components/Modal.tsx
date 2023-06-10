import { useState } from "react";
import { useModalStore } from "../store/modalStore";
import { AiOutlinePlus } from "react-icons/ai";
import { cn } from "../utils";
import { client } from "../utils";
import { useUser } from "@clerk/clerk-react";

export default function Modal() {
  const { modalState, handleModalState } = useModalStore();
  const [content, setContent] = useState("");
  const { user } = useUser();

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
    <div
      className={cn(
        modalState
          ? "fixed top-0 right-0 w-full h-screen z-100 bg-gray-200 lg:hidden px-4"
          : "hidden lg:hidden"
      )}
    >
      <div className="w-full h-[12vh] flex justify-end items-center">
        <button onClick={handleModalState}>
          <AiOutlinePlus className="rotate-45" />
        </button>
      </div>
      <form
        onSubmit={createPost}
        className="w-full h-[88vh] flex justify-center items-center flex-col gap-4"
      >
        <textarea
          className="w-full h-[25vh] border border-gray-300 rounded-lg p-2 bg-transparent outline-none resize-none"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button
          className="w-full bg-black rounded-lg text-gray-300 py-2"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}
