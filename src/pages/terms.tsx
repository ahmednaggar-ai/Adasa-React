import LegalPageHeader from "../components/legal-page-header";

const WarningIcon = () => (
  <svg
    className="legal-page__notice-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 9v4m0 4h.01M10.29 3.86L2 18h20L13.71 3.86a2 2 0 0 0-3.42 0z" />
  </svg>
);

const XIcon = () => (
  <svg
    className="legal-page__list-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const Terms = () => {
  return (
    <>
      <LegalPageHeader
        title="شروط الخدمة"
        breadcrumbLabel="شروط الخدمة"
        lastUpdated="15 يناير 2026"
      />
      <section className="legal-page__content" dir="rtl">
        <div className="legal-page__notice">
          <WarningIcon />
          <div className="legal-page__notice-inner">
            <h2 className="legal-page__notice-title">إشعار مهم</h2>
            <p className="legal-page__notice-text">
              يرجى قراءة شروط الخدمة هذه بعناية قبل استخدام موقعنا. بالوصول أو
              استخدام عدسة، فإنك توافق على الالتزام بهذه الشروط.
            </p>
          </div>
        </div>

        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">1</span>
            <h2 className="legal-page__section-title">الموافقة على الشروط</h2>
          </div>
          <p>
            بالوصول أو استخدام عدسة، فإنك توافق على الالتزام بشروط الخدمة هذه
            وجميع القوانين واللوائح المعمول بها. إذا لم توافق على أي من هذه
            الشروط، فأنت ممنوع من استخدام هذا الموقع أو الوصول إليه.
          </p>
        </div>

        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">2</span>
            <h2 className="legal-page__section-title">رخصة الاستخدام</h2>
          </div>
          <p>
            يُمنح الإذن للوصول المؤقت إلى المواد على موقع عدسة للعرض الشخصي غير
            التجاري فقط. هذا منح ترخيص وليس نقل ملكية.
          </p>
          <ul className="legal-page__list">
            <li>
              <XIcon />
              <span>تعديل أو نسخ المواد</span>
            </li>
            <li>
              <XIcon />
              <span>استخدام المواد لأي غرض تجاري أو للعرض العام</span>
            </li>
            <li>
              <XIcon />
              <span>محاولة فك أو عكس هندسة أي برنامج على الموقع</span>
            </li>
            <li>
              <XIcon />
              <span>إزالة أي حقوق نشر أو علامات ملكية من المواد</span>
            </li>
            <li>
              <XIcon />
              <span>نقل المواد إلى شخص آخر أو نسخها على أي خادم آخر</span>
            </li>
          </ul>
        </div>

        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">3</span>
            <h2 className="legal-page__section-title">إخلاء المسؤولية</h2>
          </div>
          <p>
            المواد الموجودة على موقع عدسة مقدمة على أساس &quot;كما هي&quot;. عدسة لا
            يقدم أي ضمانات صريحة أو ضمنية، ويخلي مسؤوليته من جميع الضمانات
            الأخرى.
          </p>
        </div>

        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">4</span>
            <h2 className="legal-page__section-title">القيود</h2>
          </div>
          <p>
            لن تكون عدسة أو موردوها مسؤولين عن أي أضرار ناشئة عن استخدام أو عدم
            القدرة على استخدام المواد على موقع عدسة، بما في ذلك على سبيل المثال
            لا الحصر، فقدان البيانات أو الربح، أو بسبب انقطاع الأعمال.
          </p>
        </div>
      </section>
    </>
  );
};

export default Terms;
