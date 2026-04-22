import { createPreviewModel, renderSectionContent, renderSectionTitle } from '../templateHelpers';

export function TraditionalTemplate({ documentType, formData, sectionOrder, settings, theme }) {
  const model = createPreviewModel(documentType, formData, sectionOrder, settings, theme);

  return (
    <article
      style={{
        background: '#fffdf9',
        color: '#2b2b2b',
        fontFamily: settings.fontFamily,
        width: '100%',
        maxWidth: 840,
        margin: '0 auto',
        padding: 32,
        border: `1px solid ${theme.border}`,
        borderRadius: 24,
        boxShadow: '0 22px 50px rgba(148, 163, 184, 0.14)',
      }}
    >
      <header style={{ textAlign: 'center', borderBottom: `2px solid ${theme.accent}`, paddingBottom: 18, marginBottom: 22 }}>
        <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: 32, fontWeight: 700 }}>{model.personalInfo.fullName}</div>
        <div style={{ marginTop: 8, fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.muted }}>{model.title}</div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: model.photo ? '150px minmax(0, 1fr)' : '1fr', gap: 20, alignItems: 'start' }}>
        {model.photo ? <img src={model.photo} alt="Profile" style={{ width: 150, height: 180, objectFit: 'cover', borderRadius: 18, border: `1px solid ${theme.border}` }} /> : null}
        <div style={{ display: 'grid', gap: 10 }}>
          {model.detailPairs.map(([label, value]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 12, borderBottom: '1px dashed #d6d3d1', paddingBottom: 8 }}>
              <div style={{ fontWeight: 700, color: '#57534e' }}>{label}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 22, color: '#57534e', lineHeight: 1.8, fontSize: 14 }}>{model.personalInfo.summary}</section>

      <main style={{ marginTop: 24, display: 'grid', gap: 22 }}>
        {model.sections.map((section) => (
          <section key={section.key}>
            {renderSectionTitle(section.title, theme)}
            {renderSectionContent(section, theme)}
          </section>
        ))}
      </main>
    </article>
  );
}