import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";

const SCROLL_THRESHOLD = 20;

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

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" />
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Only these routes are "in navbar"; others (e.g. /privacy, /terms) have no active item */
  const activeIndex = navItems.findIndex((item) => {
    if (location.pathname === item.path) return true;
    if (item.path === "/") return false;
    return location.pathname.startsWith(item.path + "/");
  });
  const isNavPage = activeIndex >= 0;

  useLayoutEffect(() => {
    if (!isNavPage) {
      setPillStyle({ left: 0, width: 0 });
      return;
    }
    const container = containerRef.current;
    const link = linkRefs.current[activeIndex];
    if (!container || !link) return;
    const cr = container.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    const borderLeft = 1;
    setPillStyle({
      left: lr.left - cr.left - borderLeft,
      width: lr.width,
    });
  }, [activeIndex, isNavPage, location.pathname]);

  useLayoutEffect(() => {
    const onResize = () => {
      if (!isNavPage) return;
      const container = containerRef.current;
      const link = linkRefs.current[activeIndex];
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
  }, [activeIndex, isNavPage]);

  return (
    <nav
      className={`navbar${isScrolled ? " navbar--scrolled" : ""}${menuOpen ? " navbar--menu-open" : ""}`}
      dir="rtl"
    >
      <Link to="/" className="navbar__brand">
        <LensIcon />
        <div className="navbar__brand-text">
          <span className="navbar__brand-title">عدسة</span>
          <span className="navbar__brand-tagline navbar__brand-tagline--desktop">
            عالم التصوير الفوتوغرافي
          </span>
        </div>
      </Link>

      <div className="navbar__center navbar__desktop-only">
        <div ref={containerRef} className="navbar__nav-wrap">
          <div
            className="navbar__nav-pill"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: isNavPage ? 1 : 0,
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
                  className={`navbar__link${activeIndex === i ? " navbar__link--active" : ""}`}
                  end={item.end}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar__actions navbar__desktop-only">
        <button type="button" className="navbar__search" aria-label="بحث">
          <SearchIcon />
        </button>
        <Link to="/posts" className="navbar__cta">
          ابدأ القراءة
        </Link>
      </div>

      <button
        type="button"
        className="navbar__menu-btn"
        onClick={() => setMenuOpen((o) => !o)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        className="navbar__backdrop"
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <div className="navbar__drawer">
        <ul className="navbar__drawer-nav">
          {navItems.map((item, i) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={`navbar__drawer-link${activeIndex === i ? " navbar__drawer-link--active" : ""}`}
                end={item.end}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navbar__drawer-actions">
          <button type="button" className="navbar__search navbar__search--drawer" aria-label="بحث">
            <SearchIcon />
            <span>بحث</span>
          </button>
          <Link to="/posts" className="navbar__cta navbar__cta--drawer" onClick={() => setMenuOpen(false)}>
            ابدأ القراءة
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
