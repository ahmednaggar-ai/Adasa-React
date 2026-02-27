import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ScrollToTop from "../components/scroll-to-top";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <main className="main-with-fixed-nav">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
