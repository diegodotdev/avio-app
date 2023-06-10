import { useState, useEffect } from "react";
import { getUserPosts } from "../api";
import { useParams } from "react-router-dom";
import { client } from "../utils";
import { AiOutlineLoading } from "react-icons/ai";
import { Post } from "../types";
import { Link } from "react-router-dom";
import moment from "moment";

export default function User() {
  const [posts, setPosts] = useState<any>(null);
  const { id } = useParams();

  const fetchPosts = async (id: any) => {
    await client
      .fetch(getUserPosts(id))
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchPosts(id);
  }, []);
  return (
    <div className="w-full lg:w-1/2 h-[78vh] lg:h-[88vh] lg:border-x lg:border-gray-300 overflow-y-scroll no-scrollbar px-0 py-2 lg:p-2 flex flex-col gap-2">
      {!posts ? (
        <div className="w-full h-[88vh] grid place-items-center">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="w-full py-4 flex justify-between items-center gap-2 px-2">
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={posts[0]?.avatar}
                alt={posts[0]?.name}
              />
              <p>{posts[0]?.name}</p>
            </div>
            <p className="opacity-50">{posts?.length} Posts</p>
          </div>
          {posts?.map((post: Post) => (
            <Link className="w-full" to={`/posts/${post?._id}`} key={post?._id}>
              <div className="w-full border border-gray-300 rounded-lg p-2 flex flex-col gap-2">
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <img
                      src={post?.avatar}
                      alt={post?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p>{post?.name}</p>
                  </div>
                  <p className="text-xs opacity-50">
                    {moment(post?._createdAt).fromNow()}
                  </p>
                </div>
                <p>{post?.content}</p>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
