import LegalPageHeader from "../components/legal-page-header";

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Privacy = () => {
  return (
    <>
      <LegalPageHeader
        title="خصوصيتك تهمنا"
        breadcrumbLabel="سياسة الخصوصية"
        lastUpdated="15 يناير 2026"
        icon={<ShieldIcon />}
        subtitle="نحن ملتزمون بحماية معلوماتك الشخصية والشفافية بشأن ما نجمعه."
      />
      <section className="legal-page__content" dir="rtl">
        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">1</span>
            <h2 className="legal-page__section-title">مقدمة</h2>
          </div>
          <p>
            نرحب بكم في عدسة. نحن نحترم خصوصيتكم وملتزمون بحماية بياناتكم
            الشخصية. توضح سياسة الخصوصية هذه كيفية تعاملنا مع بياناتكم الشخصية
            وتطلعكم على حقوقكم فيما يتعلق بالخصوصية.
          </p>
        </div>

        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">2</span>
            <h2 className="legal-page__section-title">المعلومات التي نجمعها</h2>
          </div>
          <p>قد نجمع الأنواع التالية من المعلومات:</p>
          <ul className="legal-page__list--bullets">
            <li>
              <span>
                <span className="legal-page__list-label">بيانات الهوية:</span>{" "}
                الاسم الأول، اسم العائلة، اسم المستخدم، أو معرفات مشابهة.
              </span>
            </li>
            <li>
              <span>
                <span className="legal-page__list-label">بيانات الاتصال:</span>{" "}
                عنوان البريد الإلكتروني.
              </span>
            </li>
            <li>
              <span>
                <span className="legal-page__list-label">البيانات التقنية:</span>{" "}
                عنوان IP، نوع المتصفح، المنطقة الزمنية، ونظام التشغيل.
              </span>
            </li>
            <li>
              <span>
                <span className="legal-page__list-label">بيانات الاستخدام:</span>{" "}
                معلومات حول كيفية تفاعلك مع الموقع والخدمات.
              </span>
            </li>
          </ul>
        </div>

        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">3</span>
            <h2 className="legal-page__section-title">كيف نستخدم معلوماتك</h2>
          </div>
          <p>نستخدم المعلومات المجمعة للأغراض التالية:</p>
          <ul className="legal-page__list--bullets">
            <li>تقديم الخدمات وصيانتها.</li>
            <li>إبلاغك بالتغييرات على الخدمات.</li>
            <li>تقديم دعم العملاء.</li>
            <li>جمع تحليلات أو معلومات قيمة لتحسين الخدمة.</li>
            <li>مراقبة استخدام الخدمة.</li>
            <li>اكتشاف ومنع ومعالجة المشكلات التقنية.</li>
          </ul>
        </div>

        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">4</span>
            <h2 className="legal-page__section-title">ملفات تعريف الارتباط</h2>
          </div>
          <p>
            نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لمراقبة النشاط
            على موقعنا. يمكنك توجيه متصفحك لرفض جميع ملفات تعريف الارتباط أو
            الإشارة عند إرسال ملف تعريف ارتباط. ومع ذلك، قد لا تتمكن من استخدام
            بعض أجزاء الموقع إذا لم تقبل ملفات تعريف الارتباط.
          </p>
        </div>

        <div className="legal-page__section">
          <div className="legal-page__section-header">
            <span className="legal-page__section-num">5</span>
            <h2 className="legal-page__section-title">أمان البيانات</h2>
          </div>
          <p>
            تم وضع تدابير أمنية مناسبة لمنع فقدان بياناتك الشخصية أو استخدامها
            أو الوصول إليها بشكل غير مصرح به. نراجع ممارسات جمعنا وتخزيننا
            ومعالجتنا للمعلومات لتعزيز الحماية.
          </p>
        </div>
      </section>
    </>
  );
};

export default Privacy;
