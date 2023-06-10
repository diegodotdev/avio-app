import { Link, useParams } from "react-router-dom";
import { client } from "../utils";
import { getPost, getComments } from "../api";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import { Post as PostType } from "../types";
import moment from "moment";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);
  const [comment, setComment] = useState("");
  const { user, isSignedIn } = useUser();

  const createComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.replace(/\s/g, "").length === 0) {
      return null;
    } else {
      const doc = {
        _type: "comment",
        name: user?.firstName,
        avatar: user?.profileImageUrl,
        comment,
        postId: id,
        userId: user?.id,
      };
      await client.create(doc).then(() => {
        window.location.reload();
      });
    }
  };
  const fetchPost = async (id: any) => {
    await client
      .fetch(getPost(id))
      .then((data) => {
        setPost(data);
      })
      .catch((error) => console.error(error));
  };
  const fetchComments = async (id: any) => {
    await client
      .fetch(getComments(id))
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchPost(id);
  }, []);
  useEffect(() => {
    fetchComments(id);
  }, []);
  return (
    <div className="w-full lg:w-1/2 h-[78vh] lg:h-[88vh] lg:border-x lg:border-gray-300 overflow-y-scroll no-scrollbar px-0 py-2 lg:p-2 flex flex-col gap-2">
      {!post ? (
        <div className="w-full h-[88vh] grid place-items-center">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <>
          {post?.map((post: PostType) => (
            <div className="w-full" key={post?._id}>
              <div className="w-full border border-gray-300 rounded-lg p-2 flex flex-col gap-2">
                <div className="w-full flex justify-between items-center">
                  <Link
                    to={`/users/${post?.userId}`}
                    className="flex items-center gap-1"
                  >
                    <img
                      src={post?.avatar}
                      alt={post?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p>{post?.name}</p>
                  </Link>
                  <p className="text-xs opacity-50">
                    {moment(post?._createdAt).fromNow()}
                  </p>
                </div>
                <p>{post?.content}</p>
              </div>
            </div>
          ))}
          {isSignedIn && (
            <form
              className="w-full p-2 border border-gray-300 rounded-lg flex items-center gap-2"
              onSubmit={createComment}
            >
              <input
                type="text"
                className="grow bg-transparent outline-none"
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button>
                <AiOutlinePlus />
              </button>
            </form>
          )}
          {comments?.length > 0 && <p>Comments</p>}
          {comments?.map((comment: any) => (
            <div className="w-full" key={comment?._id}>
              <div className="w-full border border-gray-300 rounded-lg p-2 flex flex-col gap-2">
                <div className="w-full flex justify-between items-center">
                  <Link
                    to={`/users/${comment?.userId}`}
                    className="flex items-center gap-1"
                  >
                    <img
                      src={comment?.avatar}
                      alt={comment?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p>{comment?.name}</p>
                  </Link>
                  <p className="text-xs opacity-50">
                    {moment(comment?._createdAt).fromNow()}
                  </p>
                </div>
                <p>{comment?.comment}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
