import { createPreviewModel, renderDetailPairs, renderSectionContent, renderSectionTitle } from '../templateHelpers';

export function ModernTemplate({ documentType, formData, sectionOrder, settings, theme }) {
  const model = createPreviewModel(documentType, formData, sectionOrder, settings, theme);
  const splitLayout = settings.layout === 'split';

  return (
    <article
      style={{
        background: '#fff',
        color: theme.text,
        fontFamily: settings.fontFamily,
        width: '100%',
        maxWidth: 860,
        margin: '0 auto',
        borderRadius: 30,
        overflow: 'hidden',
        boxShadow: '0 30px 70px rgba(59, 130, 246, 0.14)',
      }}
    >
      <header style={{ background: `linear-gradient(135deg, ${theme.accent} 0%, #93c5fd 100%)`, color: '#fff', padding: 32 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{model.personalInfo.fullName}</div>
            <div style={{ marginTop: 8, fontSize: 16, opacity: 0.95 }}>{model.personalInfo.role}</div>
          </div>
          {model.photo ? (
            <img src={model.photo} alt="Profile" style={{ width: 110, height: 110, borderRadius: 32, border: '4px solid rgba(255,255,255,0.6)', objectFit: 'cover' }} />
          ) : null}
        </div>
        <div style={{ marginTop: 18, fontSize: 14, lineHeight: 1.8, maxWidth: 680 }}>{model.personalInfo.summary}</div>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: splitLayout ? '280px minmax(0, 1fr)' : '1fr',
          gap: 0,
        }}
      >
        <aside style={{ background: '#eff6ff', padding: 28, borderRight: splitLayout ? `1px solid ${theme.border}` : 'none' }}>
          <div style={{ marginBottom: 20 }}>{renderSectionTitle('Profile Details', theme)}</div>
          {renderDetailPairs(model.detailPairs, theme, 1)}
        </aside>

        <main style={{ padding: 28, display: 'grid', gap: 22 }}>
          {model.sections.map((section) => (
            <section key={section.key}>
              {renderSectionTitle(section.title, theme)}
              {renderSectionContent(section, theme)}
            </section>
          ))}
        </main>
      </div>
    </article>
  );
}