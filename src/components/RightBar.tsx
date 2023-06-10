import { AiOutlinePlus } from "react-icons/ai";

export default function RightBar() {
  const data = [
    { id: 1, title: "#crypto", posts: 210 },
    { id: 2, title: "#theweeknd", posts: 200 },
    { id: 3, title: "#pizza", posts: 220 },
    { id: 4, title: "#music", posts: 310 },
  ];
  return (
    <div className="w-1/4 p-2 pr-0 hidden lg:flex justify-start items-start flex-col gap-4">
      {" "}
      <div className="w-full flex flex-col gap-4 border border-gray-400 p-2 rounded-lg">
        <p className="font-poppinsSemiBold">For you</p>
        {data.map(({ id, title, posts }) => (
          <div className="w-full flex justify-between items-center" key={id}>
            <div>
              <p>{title}</p>
              <p className="text-xs opacity-50">{posts} posts</p>
            </div>
            <div className="w-5 h-5 rounded-full border border-[#212121] text-xs grid place-items-center cursor-pointer">
              <AiOutlinePlus />
            </div>
          </div>
        ))}
        <div className="w-full flex justify-end items-center">
          <p className="opacity-50 cursor-pointer">See more</p>
        </div>
      </div>
    </div>
  );
}
