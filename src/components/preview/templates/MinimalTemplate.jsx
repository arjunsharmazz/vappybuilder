import { createPreviewModel, renderDetailPairs, renderSectionContent, renderSectionTitle } from '../templateHelpers';

export function MinimalTemplate({ documentType, formData, sectionOrder, settings, theme }) {
  const model = createPreviewModel(documentType, formData, sectionOrder, settings, theme);

  return (
    <article
      style={{
        background: '#fff',
        color: '#111827',
        fontFamily: settings.fontFamily,
        width: '100%',
        maxWidth: 820,
        margin: '0 auto',
        padding: 36,
        borderRadius: 28,
        boxShadow: '0 24px 60px rgba(15, 23, 42, 0.10)',
      }}
    >
      <header style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 22, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: 34, fontWeight: 700 }}>{model.personalInfo.fullName}</div>
            <div style={{ marginTop: 8, color: '#4b5563', fontSize: 15 }}>{model.personalInfo.role}</div>
            <div style={{ marginTop: 14, color: '#475569', lineHeight: 1.8, fontSize: 14 }}>{model.personalInfo.summary}</div>
          </div>
          {model.photo ? <img src={model.photo} alt="Profile" style={{ width: 110, height: 110, borderRadius: 28, objectFit: 'cover' }} /> : null}
        </div>
      </header>

      <section style={{ marginBottom: 24 }}>{renderDetailPairs(model.detailPairs, theme)}</section>

      <div style={{ display: 'grid', gap: 22 }}>
        {model.sections.map((section) => (
          <section key={section.key}>
            {renderSectionTitle(section.title, theme)}
            {renderSectionContent(section, theme)}
          </section>
        ))}
      </div>

      <footer style={{ marginTop: 30, color: '#64748b', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{model.title}</footer>
    </article>
  );
}