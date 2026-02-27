import { useState } from "react";
import { Link } from "react-router-dom";
import postsData from "../constants/posts.json";
import "./home.css";

type Post = (typeof postsData.posts)[number];
const posts: Post[] = postsData.posts;

const selectedPosts = posts.filter((p) => p.featured).slice(0, 3);
const latestPosts = posts.slice(0, 3);

const categoryCountMap: Record<string, number> = {};
posts.forEach((p) => {
  categoryCountMap[p.category] = (categoryCountMap[p.category] || 0) + 1;
});
const categoryCounts = Object.entries(categoryCountMap).map(
  ([name, count]) => ({ name, count }),
);

const PenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
  </svg>
);

const FolderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const PeopleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const DocumentIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const InfoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="20"
    height="20"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="16"
    height="16"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="20"
    height="20"
    aria-hidden
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const EnvelopeOutlineIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="48"
    height="48"
    aria-hidden
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const heroStats = [
  { icon: PenIcon, number: "6", label: "كاتب" },
  { icon: FolderIcon, number: "4", label: "تصنيفات" },
  { icon: PeopleIcon, number: "10 ألف+", label: "قارئ" },
  { icon: DocumentIcon, number: "50+", label: "مقالة" },
];

const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const MountainIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);
const PersonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);
const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
const BoxIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="m3.27 6.96 8.73 4.95 8.73-4.95M12 22.08V11" />
  </svg>
);

const categoryIcons: Record<string, React.ComponentType> = {
  تقنيات: SettingsIcon,
  "مناظر طبيعية": MountainIcon,
  بورتريه: PersonIcon,
  إضاءة: SunIcon,
  معدات: BoxIcon,
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) setNewsletterEmail("");
  };

  return (
    <>
      <section className="home-hero" dir="rtl">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl blob"
          aria-hidden
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl blob"
          aria-hidden
        />
        <div className="home-hero__inner">
          <div className="home-hero__badge">
            <span className="home-hero__badge-dots">
              <span aria-hidden />
              <span aria-hidden />
            </span>
            مرحباً بك في عدسة
          </div>
          <h1 className="home-hero__title">
            اكتشف <span className="home-hero__title-accent">فن</span>
            <br />
            التصوير الفوتوغرافي
          </h1>
          <p className="home-hero__desc">
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
          </p>
          <div className="home-hero__ctas">
            <Link
              to="/posts"
              className="home-hero__btn home-hero__btn--primary"
            >
              استكشف المقالات ←
            </Link>
            <Link
              to="/about"
              className="home-hero__btn home-hero__btn--secondary"
            >
              <InfoIcon />
              اعرف المزيد
            </Link>
          </div>
          <div className="home-hero__stats">
            {heroStats.map((item) => (
              <div key={item.label} className="home-hero__stat-card">
                <div className="home-hero__stat-icon">
                  <item.icon />
                </div>
                <p className="home-hero__stat-number">{item.number}</p>
                <p className="home-hero__stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" dir="rtl">
        <div className="home-section__inner">
          {/* Selected Articles */}
          <header className="home-articles__header">
            <div>
              <h2 className="home-articles__title">مقالات مختارة</h2>
              <p className="home-articles__subtitle">محتوى حصري وأدوات مفيدة</p>
            </div>
            <Link to="/posts" className="home-articles__view-all">
              عرض الكل
            </Link>
          </header>
          <div className="home-articles__list my-14">
            {selectedPosts.map((post) => (
              <article key={post.id} className="home-article-card">
                <div className="home-article-card__image-wrap">
                  <img
                    src={post.image}
                    alt=""
                    className="home-article-card__image"
                    width={400}
                    height={240}
                  />
                </div>
                <div className="home-article-card__content">
                  <span className="home-article-card__category">
                    {post.category}
                  </span>
                  <h3 className="home-article-card__title">{post.title}</h3>
                  <p className="home-article-card__excerpt">{post.excerpt}</p>
                  <div className="home-article-card__meta">
                    <img
                      src={post.author.avatar}
                      alt=""
                      className="home-article-card__avatar"
                      width={32}
                      height={32}
                    />
                    <span className="home-article-card__author">
                      بواسطة {post.author.name}
                    </span>
                    <span className="home-article-card__date">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <Link to={`/posts/${post.slug}`} className="home-article-card__link">
                    اقرأ المزيد ←
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Explore by Topic */}
          <div className="home-categories my-14">
            <div className="home-categories__badge">
              <span className="home-categories__badge-dots">
                <span aria-hidden />
                <span aria-hidden />
              </span>
              التصنيفات
            </div>
            <h2 className="home-categories__title">استكشف حسب الموضوع</h2>
            <p className="home-categories__subtitle">
              اعثر على محتوى مصمم حسب اهتماماتك
            </p>
            <div className="home-categories__grid">
              {categoryCounts.map(({ name, count }) => {
                const Icon = categoryIcons[name] || FolderIcon;
                return (
                  <Link
                    key={name}
                    to={`/posts?category=${encodeURIComponent(name)}`}
                    className="home-category-card"
                  >
                    <div className="home-category-card__icon">
                      <Icon />
                    </div>
                    <span className="home-category-card__name">{name}</span>
                    <span className="home-category-card__count">
                      {count} مقالة
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Latest Articles - first 3 in array */}
          <div className="home-latest my-14">
            <header className="home-latest__header">
              <div>
                <div className="home-latest__badge">
                  <span className="home-latest__badge-dots">
                    <span aria-hidden />
                    <span aria-hidden />
                  </span>
                  الأحدث
                </div>
                <h2 className="home-latest__title">أحدث المقالات</h2>
                <p className="home-latest__subtitle">
                  محتوى جديد طازج من المطبعة
                </p>
              </div>
              <Link to="/posts" className="home-latest__view-all">
                عرض جميع المقالات ←
              </Link>
            </header>
            <div className="home-latest__grid">
              {latestPosts.map((post) => (
                <article key={post.id} className="home-latest-card">
                  <div className="home-latest-card__image-wrap">
                    <img
                      src={post.image}
                      alt=""
                      className="home-latest-card__image"
                      width={400}
                      height={240}
                    />
                    <span className="home-latest-card__category">
                      {post.category}
                    </span>
                  </div>
                  <div className="home-latest-card__body">
                    <div className="home-latest-card__meta">
                      <span className="home-latest-card__read-time">
                        <ClockIcon />
                        {post.readTime}
                      </span>
                      <span className="home-latest-card__date">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h3 className="home-latest-card__title">{post.title}</h3>
                    <p className="home-latest-card__excerpt">{post.excerpt}</p>
                    <div className="home-latest-card__author">
                      <img
                        src={post.author.avatar}
                        alt=""
                        className="home-latest-card__avatar"
                        width={40}
                        height={40}
                      />
                      <div>
                        <span className="home-latest-card__author-name">
                          {post.author.name}
                        </span>
                        <span className="home-latest-card__author-role">
                          {post.author.role}
                        </span>
                      </div>
                      <Link
                        to={`/posts/${post.slug}`}
                        className="home-latest-card__arrow"
                        aria-label="اقرأ المزيد"
                      >
                        <ArrowLeftIcon />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="home-newsletter p-8">
            <div className="home-newsletter__icon">
              <EnvelopeOutlineIcon />
            </div>
            <h2 className="home-newsletter__title">
              اشترك في نشرتنا الإخبارية
            </h2>
            <p className="home-newsletter__desc">
              احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك
              الإلكتروني
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="home-newsletter__form"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                className="home-newsletter__input"
                aria-label="البريد الإلكتروني"
              />
              <button type="submit" className="home-newsletter__btn">
                اشترك الآن
              </button>
            </form>
            <div className="home-newsletter__footer">
              <div className="home-newsletter__avatars">
                {latestPosts.slice(0, 3).map((p) => (
                  <img
                    key={p.id}
                    src={p.author.avatar}
                    alt=""
                    className="home-newsletter__avatar"
                    width={32}
                    height={32}
                  />
                ))}
              </div>
              <span className="home-newsletter__join">
                انضم لـ + 10,000 مصور
              </span>
              <span className="home-newsletter__privacy">
                بدون إزعاج · إلغاء الاشتراك في أي وقت
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
