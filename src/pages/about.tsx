import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./about.css";

const DURATION_MS = 2000;

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    startTimeRef.current = performance.now();
    let rafId: number;

    const tick = () => {
      const elapsed = performance.now() - (startTimeRef.current ?? 0);
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 2;
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target]);

  return value;
}

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
  </svg>
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
    <path d="M2 2l7.586 7.586" />
  </svg>
);

const DocumentsIcon = () => (
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
    <path d="M8 2v4" />
    <path d="M8 8h4" />
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

const stats = [
  { icon: BookIcon, target: 15, suffix: "+", label: "تصنيف" },
  { icon: PenIcon, target: 50, suffix: "+", label: "كاتب خبير" },
  { icon: DocumentsIcon, target: 500, suffix: "+", label: "مقالة منشورة" },
  { icon: PeopleIcon, target: 2, suffix: " مليون+", label: "قارئ شهرياً" },
];

const TargetIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const RefreshIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const LightningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const CommunityIcon = () => (
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

const LinkedInIconSmall = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    aria-hidden
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const XIconSmall = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    aria-hidden
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const values = [
  {
    icon: TargetIcon,
    title: "الجودة أولاً",
    desc: "محتوى مدروس ومكتوب بخيرة",
  },
  {
    icon: RefreshIcon,
    title: "دائماً محدث",
    desc: "أحدث الاتجاهات وأفضل الممارسات",
  },
  {
    icon: LightningIcon,
    title: "تركيز عملي",
    desc: "أمثلة واقعية يمكنك تطبيقها اليوم",
  },
  {
    icon: CommunityIcon,
    title: "المجتمع",
    desc: "تعلم مع آلاف المصورين",
  },
];

const team = [
  {
    name: "إبراهيم حسن",
    role: "مصور طبيعة",
    avatar: "https://i.pravatar.cc/200?img=11",
    linkedin: "#",
    x: "#",
  },
  {
    name: "محمد علي",
    role: "مصور بورتريه",
    avatar: "https://i.pravatar.cc/200?img=12",
    linkedin: "#",
    x: "#",
  },
  {
    name: "سالم أحمد",
    role: "مصور محترف",
    avatar: "https://i.pravatar.cc/200?img=13",
    linkedin: "#",
    x: "#",
  },
  {
    name: "جمال عبد الله",
    role: "مصور ومراجع تقني",
    avatar: "https://i.pravatar.cc/200?img=14",
    linkedin: "#",
    x: "#",
  },
  {
    name: "ليث محمود",
    role: "فنان بصري",
    avatar: "https://i.pravatar.cc/200?img=15",
    linkedin: "#",
    x: "#",
  },
  {
    name: "داود خالد",
    role: "مدرب تصوير",
    avatar: "https://i.pravatar.cc/200?img=16",
    linkedin: "#",
    x: "#",
  },
];

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" dir="rtl">
      <div className="about__hero">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl blob"
          aria-hidden
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl blob"
          aria-hidden
        />
        <div className="about__inner">
          <div className="about__badge">
            <span className="about__badge-dots">
              <span aria-hidden />
              <span aria-hidden />
            </span>
            من نحن
          </div>
          <h1 className="about__title">
            مهمتنا هي{" "}
            <span className="about__title-accent">الإعلام والإلهام</span>
          </h1>
          <p className="about__desc">
            مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين
            ونصائح عملية لتطوير مهاراتكم. نحن شغوفون بمشاركة المعرفة ومساعدة
            المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
          </p>
          <div ref={statsRef} className="about__stats">
            {stats.map((item) => (
              <StatCard
                key={item.label}
                icon={item.icon}
                target={item.target}
                suffix={item.suffix}
                label={item.label}
                start={statsInView}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="about__below">
        {/* Values section */}
        <div className="about__values">
          <h2 className="about__section-title">
            قيمنا <span className="about__section-title-sep">|</span>
          </h2>
          <p className="about__section-subtitle">
            المبادئ التي توجه كل ما نقوم بإنشائه
          </p>
          <div className="about__values-grid">
            {values.map((v) => (
              <div key={v.title} className="about__value-card">
                <div className="about__value-icon-wrap">
                  <v.icon />
                </div>
                <h3 className="about__value-title">{v.title}</h3>
                <p className="about__value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team divider */}
        <div className="about__team-divider">
          <span className="about__team-divider-line" />
          <span className="about__team-divider-dot" />
          <span className="about__team-divider-text">فريقنا.</span>
        </div>

        {/* Team section */}
        <div className="about__team">
          <h2 className="about__section-title">تعرف على كتابنا</h2>
          <p className="about__section-subtitle">
            فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع
            المجتمع
          </p>
          <div className="about__team-grid">
            {team.map((member) => (
              <div key={member.name} className="about__team-card">
                <img
                  src={member.avatar}
                  alt=""
                  className="about__team-avatar"
                  width={120}
                  height={120}
                />
                <p className="about__team-name">{member.name}</p>
                <p className="about__team-role">{member.role}</p>
                <div className="about__team-social">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIconSmall />
                  </a>
                  <a
                    href={member.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                  >
                    <XIconSmall />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="about__cta mt-11">
        <h2 className="about__cta-title">لديك أسئلة؟ دعنا نتحدث!</h2>
        <p className="about__cta-desc">
          نحب أن نسمع منك. سواء كان لديك سؤال حول محتوانا، أو تريد المساهمة، أو
          تريد فقط إلقاء التحية، لا تتردد في التواصل.
        </p>
        <div className="about__cta-buttons">
          <Link
            to="/posts"
            className="about__cta-btn about__cta-btn--secondary"
          >
            تصفح المقالات
          </Link>
          <a
            href="mailto:hello@example.com"
            className="about__cta-btn about__cta-btn--primary"
          >
            <EnvelopeIcon />
            تواصل معنا
          </a>
        </div>
      </div>
    </section>
  );
};

const EnvelopeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="20"
    height="20"
    aria-hidden
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const StatCard = ({
  icon: Icon,
  target,
  suffix,
  label,
  start,
}: {
  icon: React.ComponentType;
  target: number;
  suffix: string;
  label: string;
  start: boolean;
}) => {
  const value = useCountUp(target, start);
  return (
    <div className="about__card">
      <div className="about__card-icon">
        <Icon />
      </div>
      <p className="about__card-number">
        {value}
        {suffix}
      </p>
      <p className="about__card-label">{label}</p>
    </div>
  );
};

export default About;
