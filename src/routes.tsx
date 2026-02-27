import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Home from "./pages/home";
import Posts from "./pages/posts";
import About from "./pages/about";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
