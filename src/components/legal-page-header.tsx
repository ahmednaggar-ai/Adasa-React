import { Link } from "react-router-dom";
import "./legal-page.css";

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

type LegalPageHeaderProps = {
  title: string;
  lastUpdated: string;
  breadcrumbLabel: string;
  icon?: React.ReactNode;
  subtitle?: string;
};

const LegalPageHeader = ({
  title,
  lastUpdated,
  breadcrumbLabel,
  icon = <DocumentIcon />,
  subtitle,
}: LegalPageHeaderProps) => {
  return (
    <div className="legal-page" dir="rtl">
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl blob"
        aria-hidden
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl blob"
        aria-hidden
      />
      <div className="legal-page__hero p-14">
        <nav className="legal-page__breadcrumb" aria-label="breadcrumb">
          <Link to="/">الرئيسية</Link>
          <span className="legal-page__breadcrumb-sep" aria-hidden>
            &lt;
          </span>
          <span className="legal-page__breadcrumb-current">
            {breadcrumbLabel}
          </span>
        </nav>
        <div className="legal-page__icon-wrap">{icon}</div>
        <h1 className="legal-page__title">{title}</h1>
        {subtitle && (
          <p className="legal-page__subtitle">{subtitle}</p>
        )}
        <p className="legal-page__date">آخر تحديث: {lastUpdated}</p>
      </div>
    </div>
  );
};

export default LegalPageHeader;
