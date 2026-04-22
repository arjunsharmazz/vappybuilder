import { createPreviewModel, renderSectionContent, renderSectionTitle } from '../templateHelpers';

export function CreativeTemplate({ documentType, formData, sectionOrder, settings, theme }) {
  const model = createPreviewModel(documentType, formData, sectionOrder, settings, theme);

  return (
    <article
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
        color: theme.text,
        fontFamily: settings.fontFamily,
        width: '100%',
        maxWidth: 840,
        margin: '0 auto',
        borderRadius: 34,
        padding: 28,
        boxShadow: '0 28px 60px rgba(124, 58, 237, 0.10)',
      }}
    >
      <header
        style={{
          borderRadius: 30,
          padding: 26,
          background: `linear-gradient(135deg, ${theme.accent} 0%, #f472b6 100%)`,
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.84 }}>{model.title}</div>
            <div style={{ marginTop: 10, fontSize: 34, fontWeight: 700 }}>{model.personalInfo.fullName}</div>
            <div style={{ marginTop: 8, fontSize: 16 }}>{model.personalInfo.role}</div>
          </div>
          {model.photo ? <img src={model.photo} alt="Profile" style={{ width: 104, height: 104, borderRadius: '50%', border: '4px solid rgba(255,255,255,0.45)', objectFit: 'cover' }} /> : null}
        </div>
        <div style={{ marginTop: 16, maxWidth: 680, fontSize: 14, lineHeight: 1.8 }}>{model.personalInfo.summary}</div>
      </header>

      <section style={{ marginTop: 22, display: 'grid', gridTemplateColumns: settings.layout === 'compact' ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
        {model.detailPairs.map(([label, value]) => (
          <div key={label} style={{ borderRadius: 24, background: '#fff', border: `1px solid ${theme.border}`, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: theme.muted }}>{label}</div>
            <div style={{ marginTop: 6, fontSize: 14, fontWeight: 700 }}>{value}</div>
          </div>
        ))}
      </section>

      <main style={{ marginTop: 22, display: 'grid', gap: 18 }}>
        {model.sections.map((section) => (
          <section key={section.key} style={{ borderRadius: 28, background: '#fff', border: `1px solid ${theme.border}`, padding: 22 }}>
            {renderSectionTitle(section.title, theme)}
            {renderSectionContent(section, theme)}
          </section>
        ))}
      </main>
    </article>
  );
}