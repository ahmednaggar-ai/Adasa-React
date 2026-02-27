import { Link, useParams, useNavigate } from "react-router-dom";
import postsData from "../constants/posts.json";
import "./post-detail.css";

type Post = (typeof postsData.posts)[number];
const allPosts: Post[] = postsData.posts;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function renderContent(content: string) {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="post-detail__content-h2">
          {trimmed.slice(3)}
        </h2>
      );
    }
    return (
      <p key={i} className="post-detail__content-p">
        {trimmed}
      </p>
    );
  });
}

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? allPosts.find((p) => p.slug === slug) : null;

  if (!post) {
    return (
      <div className="post-detail post-detail--not-found" dir="rtl">
        <div className="post-detail__wrap">
          <p className="post-detail__not-found-title">المقال غير موجود</p>
          <p className="post-detail__not-found-desc">
            ربما تمت إزالته أو الرابط غير صحيح.
          </p>
          <Link to="/posts" className="post-detail__back-btn">
            <ArrowRightIcon />
            العودة إلى المدونة
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="post-detail" dir="rtl">
      <div className="post-detail__wrap">
        <Link to="/posts" className="post-detail__back">
          <ArrowRightIcon />
          العودة إلى المدونة
        </Link>

        <header className="post-detail__header">
          <span className="post-detail__category">{post.category}</span>
          <h1 className="post-detail__title">{post.title}</h1>
          <p className="post-detail__excerpt">{post.excerpt}</p>
          <div className="post-detail__meta">
            <span className="post-detail__read-time">
              <ClockIcon />
              {post.readTime}
            </span>
            <span className="post-detail__date">{formatDate(post.date)}</span>
          </div>
          <div className="post-detail__author">
            <img
              src={post.author.avatar}
              alt=""
              className="post-detail__avatar"
              width={48}
              height={48}
            />
            <div>
              <span className="post-detail__author-name">{post.author.name}</span>
              <span className="post-detail__author-role">{post.author.role}</span>
            </div>
          </div>
        </header>

        <div className="post-detail__image-wrap">
          <img
            src={post.image}
            alt=""
            className="post-detail__image"
            width={900}
            height={500}
          />
        </div>

        <div className="post-detail__content">
          {renderContent(post.content)}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-detail__tags">
            <span className="post-detail__tags-label">الوسوم:</span>
            <ul className="post-detail__tags-list">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <span className="post-detail__tag">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="post-detail__footer">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="post-detail__back-btn post-detail__back-btn--secondary"
          >
            <ArrowRightIcon />
            رجوع
          </button>
          <Link to="/posts" className="post-detail__back-btn">
            عرض جميع المقالات
          </Link>
        </footer>
      </div>
    </article>
  );
};

export default PostDetail;
