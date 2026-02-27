import { useRef, useLayoutEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";

/* Logo in public/images/ is served at /images/ — no import needed */
const brandLogo = "/images/logo-GdqARQRt.png";

const LensIcon = () => (
  <img src={brandLogo} alt="عدسة" className="navbar__brand-icon" />
);

const SearchIcon = () => (
  <svg
    className="navbar__search-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const navItems = [
  { path: "/", label: "الرئيسية", end: true },
  { path: "/posts", label: "المدونة", end: false },
  { path: "/about", label: "من نحن", end: false },
] as const;

const Navbar = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const activeIndex = navItems.findIndex(
    (item) =>
      location.pathname === item.path ||
      (item.path !== "/" && location.pathname.startsWith(item.path)),
  );
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const link = linkRefs.current[safeIndex];
    if (!container || !link) return;
    const cr = container.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    const borderLeft = 1;
    setPillStyle({
      left: lr.left - cr.left - borderLeft,
      width: lr.width,
    });
  }, [safeIndex, location.pathname]);

  useLayoutEffect(() => {
    const onResize = () => {
      const container = containerRef.current;
      const link = linkRefs.current[safeIndex];
      if (!container || !link) return;
      const cr = container.getBoundingClientRect();
      const lr = link.getBoundingClientRect();
      const borderLeft = 1;
      setPillStyle({
        left: lr.left - cr.left - borderLeft,
        width: lr.width,
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [safeIndex]);

  return (
    <nav className="navbar" dir="rtl">
      <Link to="/" className="navbar__brand">
        <LensIcon />
        <div className="navbar__brand-text">
          <span className="navbar__brand-title">عدسة</span>
          <span className="text-xs text-orange-400/80 hidden sm:block tracking-wide">
            عالم التصوير الفوتوغرافي
          </span>
        </div>
      </Link>
      <div ref={containerRef} className="navbar__nav-wrap">
        <div
          className="navbar__nav-pill"
          style={{
            left: pillStyle.left,
            width: pillStyle.width,
          }}
          aria-hidden
        />
        <ul className="navbar__nav">
          {navItems.map((item, i) => (
            <li key={item.path}>
              <NavLink
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                to={item.path}
                className={({ isActive }) =>
                  `navbar__link${isActive ? " navbar__link--active" : ""}`
                }
                end={item.end}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className="navbar__search" aria-label="بحث">
          <SearchIcon />
        </button>
        <Link to="/posts" className="navbar__cta">
          ابدأ القراءة
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
