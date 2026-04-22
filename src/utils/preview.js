import { sectionLabels } from '../data/config';

export function formatLabel(value) {
  if (!value) {
    return 'Untitled';
  }

  return value;
}

export function getTheme(settings, activeTemplate) {
  const accent = settings.accentColor || '#3B82F6';

  return {
    accent,
    accentSoft: `${accent}20`,
    text: '#172033',
    muted: '#64748B',
    border: '#D9E5FB',
    paper: '#FFFFFF',
    panel: activeTemplate === 'creative' ? 'linear-gradient(135deg, #fdf2ff 0%, #eff6ff 100%)' : '#FFFFFF',
    fontFamily: settings.fontFamily,
    layout: settings.layout,
  };
}

export function getDocumentTitle(documentType) {
  const titles = {
    resume: 'Resume',
    cv: 'Curriculum Vitae',
    'job-biodata': 'Job Biodata',
    'marriage-biodata': 'Marriage Biodata',
  };

  return titles[documentType] || 'Profile Document';
}

export function getDetailPairs(personalInfo, documentType) {
  const commonPairs = [
    ['Phone', personalInfo.phone],
    ['Email', personalInfo.email],
    ['City', personalInfo.city],
    ['Address', personalInfo.address],
    ['Languages', personalInfo.languages],
  ];

  if (documentType === 'marriage-biodata') {
    return [
      ['Date of Birth', personalInfo.dateOfBirth],
      ['Gender', personalInfo.gender],
      ['Religion', personalInfo.religion],
      ['Marital Status', personalInfo.maritalStatus],
      ['Nationality', personalInfo.nationality],
      ...commonPairs,
    ].filter(([, value]) => value);
  }

  return [
    ['Website', personalInfo.website],
    ['LinkedIn', personalInfo.linkedin],
    ['Date of Birth', personalInfo.dateOfBirth],
    ['Nationality', personalInfo.nationality],
    ...commonPairs,
  ].filter(([, value]) => value);
}

export function getOrderedSections(formData, sectionOrder) {
  const sections = {
    education: {
      key: 'education',
      title: sectionLabels.education,
      items: formData.education.filter((item) => item.degree || item.school || item.year),
    },
    experience: {
      key: 'experience',
      title: sectionLabels.experience,
      items: formData.experience.filter((item) => item.role || item.company || item.duration),
    },
    skills: {
      key: 'skills',
      title: sectionLabels.skills,
      items: formData.skills.filter(Boolean),
    },
    projects: {
      key: 'projects',
      title: sectionLabels.projects,
      items: formData.projects.filter((item) => item.name || item.stack || item.details),
    },
    customSections: {
      key: 'customSections',
      title: sectionLabels.customSections,
      items: formData.customSections.filter((item) => item.title || item.content),
    },
  };

  return sectionOrder.map((key) => sections[key]).filter((section) => section && section.items.length > 0);
}

export function getExportMarkup(previewNode) {
  return {
    html: previewNode?.outerHTML || '',
    styles: `
      body { margin: 0; background: #f3f7ff; }
      img { max-width: 100%; display: block; }
      a { color: inherit; text-decoration: none; }
    `,
  };
}