import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import postsData from "../constants/posts.json";
import "./posts.css";

type Post = (typeof postsData.posts)[number];
const allPosts: Post[] = postsData.posts;

const CATEGORIES = [
  "جميع المقالات",
  "إضاءة",
  "بورتريه",
  "مناظر طبيعية",
  "تقنيات",
  "معدات",
];

const POSTS_PER_PAGE = 6;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? "";

  const [category, setCategory] = useState(() => {
    if (!categoryFromUrl) return "جميع المقالات";
    const decoded = decodeURIComponent(categoryFromUrl);
    return CATEGORIES.includes(decoded) ? decoded : "جميع المقالات";
  });
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!categoryFromUrl) {
      setCategory("جميع المقالات");
      return;
    }
    const decoded = decodeURIComponent(categoryFromUrl);
    if (CATEGORIES.includes(decoded)) setCategory(decoded);
  }, [categoryFromUrl]);

  const filteredPosts = useMemo(() => {
    let list = allPosts;
    if (category !== "جميع المقالات") {
      list = list.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [category, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const paginatedPosts = useMemo(
    () =>
      filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
      ),
    [filteredPosts, currentPage]
  );

  const setCategoryAndSync = (value: string) => {
    setCategory(value);
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (value === "جميع المقالات") next.delete("category");
    else next.set("category", value);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="posts-page" dir="rtl">
      <section className="posts-hero">
        <div
          className="posts-hero__blob posts-hero__blob--1"
          aria-hidden
        />
        <div
          className="posts-hero__blob posts-hero__blob--2"
          aria-hidden
        />
        <div className="posts-hero__inner">
          <div className="posts-hero__badge">
            <span className="posts-hero__badge-dots">
              <span aria-hidden />
              <span aria-hidden />
            </span>
            مدونتنا
          </div>
          <h1 className="posts-hero__title">استكشف مقالاتنا</h1>
          <p className="posts-hero__subtitle">
            اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
          </p>

          <div className="posts-filters">
            <div className="posts-filters__pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryAndSync(cat)}
                  className={`posts-pill ${category === cat ? "posts-pill--active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="posts-filters__search-wrap">
              <SearchIcon />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="ابحث في المقالات."
                className="posts-filters__search"
                aria-label="ابحث في المقالات"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="posts-content">
        <div className="posts-toolbar">
          <div className="posts-toolbar__layout">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              className={`posts-layout-btn ${layout === "grid" ? "posts-layout-btn--active" : ""}`}
              aria-label="عرض شبكي"
            >
              <GridIcon />
            </button>
            <button
              type="button"
              onClick={() => setLayout("list")}
              className={`posts-layout-btn ${layout === "list" ? "posts-layout-btn--active" : ""}`}
              aria-label="عرض قائمة"
            >
              <ListIcon />
            </button>
          </div>
          <p className="posts-toolbar__count">
            عرض {filteredPosts.length} مقالة{filteredPosts.length !== 1 ? "ات" : ""}
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="posts-empty">
            <p className="posts-empty__title">لا توجد مقالات تطابق بحثك</p>
            <p className="posts-empty__desc">
              جرّب تغيير التصنيف أو مسح كلمة البحث لعرض جميع المقالات.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("جميع المقالات");
                setSearch("");
                setPage(1);
                setSearchParams({}, { replace: true });
              }}
              className="posts-empty__btn"
            >
              عرض جميع المقالات
            </button>
          </div>
        ) : (
          <>
            <div className={`posts-grid posts-grid--${layout}`}>
              {paginatedPosts.map((post) => (
                <article key={post.id} className="posts-card">
                  <div className="posts-card__image-wrap">
                    <img
                      src={post.image}
                      alt=""
                      className="posts-card__image"
                      width={400}
                      height={240}
                    />
                    <span className="posts-card__category">{post.category}</span>
                  </div>
                  <div className="posts-card__body">
                    <div className="posts-card__meta">
                      <span className="posts-card__read-time">
                        <ClockIcon />
                        {post.readTime}
                      </span>
                      <span className="posts-card__date">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="posts-card__title">{post.title}</h2>
                    <p className="posts-card__excerpt">{post.excerpt}</p>
                    <div className="posts-card__author">
                      <img
                        src={post.author.avatar}
                        alt=""
                        className="posts-card__avatar"
                        width={40}
                        height={40}
                      />
                      <div>
                        <span className="posts-card__author-name">{post.author.name}</span>
                        <span className="posts-card__author-role">{post.author.role}</span>
                      </div>
                  <Link
                    to={`/posts/${post.slug}`}
                    className="posts-card__arrow"
                    aria-label="اقرأ المزيد"
                  >
                    <ArrowLeftIcon />
                  </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
          <nav className="posts-pagination" aria-label="تنقل الصفحات">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="posts-pagination__arrow"
              aria-label="الصفحة السابقة"
            >
              <ChevronRightIcon />
            </button>
            <div className="posts-pagination__numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`posts-pagination__num ${currentPage === n ? "posts-pagination__num--active" : ""}`}
                  aria-label={`صفحة ${n}`}
                  aria-current={currentPage === n ? "page" : undefined}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="posts-pagination__arrow"
              aria-label="الصفحة التالية"
            >
              <ChevronLeftIcon />
            </button>
          </nav>
            )}

            <p className="posts-pagination__status">
              صفحة {currentPage} من {totalPages}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
