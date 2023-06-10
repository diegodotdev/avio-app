import { client } from "../utils";
import { getPosts } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../types";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => client.fetch(getPosts()),
  });
  return (
    <div className="w-full lg:w-1/2 h-[78vh] lg:h-[88vh] lg:border-x lg:border-gray-300 overflow-y-scroll no-scrollbar lg:p-2 flex flex-col gap-2">
      {isLoading ? (
        <div className="w-full h-[88vh] grid place-items-center">
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        data?.map((post: Post) => (
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
        ))
      )}
    </div>
  );
}
