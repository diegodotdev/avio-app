import { Routes, Route } from "react-router-dom";
import { Home, Post, User } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/users/:id" element={<User />} />
    </Routes>
  );
}
