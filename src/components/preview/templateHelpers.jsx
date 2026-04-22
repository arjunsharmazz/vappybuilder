import { getDetailPairs, getDocumentTitle, getOrderedSections } from '../../utils/preview';

export function createPreviewModel(documentType, formData, sectionOrder, settings, theme) {
  return {
    title: getDocumentTitle(documentType),
    personalInfo: formData.personalInfo,
    sections: getOrderedSections(formData, sectionOrder),
    detailPairs: getDetailPairs(formData.personalInfo, documentType),
    photo: formData.photo,
    settings,
    theme,
  };
}

export function renderSectionTitle(title, theme) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: 'inline-flex',
          paddingBottom: 6,
          borderBottom: `2px solid ${theme.accent}`,
          color: theme.text,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
    </div>
  );
}

export function renderSectionContent(section, theme) {
  if (section.key === 'skills') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {section.items.map((skill) => (
          <span
            key={skill}
            style={{
              borderRadius: 999,
              padding: '8px 14px',
              background: theme.accentSoft,
              color: theme.text,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }

  if (section.key === 'customSections') {
    return (
      <div style={{ display: 'grid', gap: 14 }}>
        {section.items.map((item, index) => (
          <div key={`${item.title}-${index}`}>
            <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{item.title || 'Custom Section'}</div>
            <div style={{ marginTop: 6, color: theme.muted, fontSize: 13, lineHeight: 1.7 }}>{item.content}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      {section.items.map((item, index) => (
        <div key={`${section.key}-${index}`} style={{ display: 'grid', gap: 6 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 }}>
            <strong style={{ color: theme.text, fontSize: 15 }}>
              {item.degree || item.role || item.name || item.school || 'Untitled'}
            </strong>
            <span style={{ color: theme.muted, fontSize: 12 }}>{item.year || item.duration || item.stack || ''}</span>
          </div>
          <div style={{ color: theme.muted, fontSize: 13 }}>
            {item.school || item.company || item.link || item.city || ''}
            {item.score ? ` • ${item.score}` : ''}
          </div>
          <div style={{ color: theme.muted, fontSize: 13, lineHeight: 1.7 }}>{item.details || ''}</div>
        </div>
      ))}
    </div>
  );
}

export function renderDetailPairs(detailPairs, theme, columns = 2) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 12,
      }}
    >
      {detailPairs.map(([label, value]) => (
        <div key={label} style={{ borderRadius: 18, border: `1px solid ${theme.border}`, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: theme.muted }}>{label}</div>
          <div style={{ marginTop: 4, color: theme.text, fontSize: 13, fontWeight: 600 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}