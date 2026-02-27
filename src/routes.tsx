import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Home from "./pages/home";
import Posts from "./pages/posts";
import PostDetail from "./pages/post-detail";
import About from "./pages/about";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path=":slug" element={<PostDetail />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
