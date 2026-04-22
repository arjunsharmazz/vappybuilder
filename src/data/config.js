export const builderTypes = [
  { id: 'resume', label: 'Resume Builder', description: 'Best for jobs and internships.' },
  { id: 'cv', label: 'CV Builder', description: 'Great for academic and detailed profiles.' },
  { id: 'job-biodata', label: 'Job Biodata Builder', description: 'Simple profile format for quick applications.' },
  { id: 'marriage-biodata', label: 'Marriage Biodata Builder', description: 'Traditional layout for family introductions.' },
];

export const templateCatalog = [
  { id: 'minimal', name: 'Minimal', category: 'Minimal', tone: 'Black and white clarity' },
  { id: 'modern', name: 'Modern Blue', category: 'Modern', tone: 'Soft blue professional look' },
  { id: 'creative', name: 'Creative', category: 'Creative', tone: 'Colorful and expressive' },
  { id: 'traditional', name: 'Traditional', category: 'Traditional', tone: 'Classic biodata presentation' },
];

export const fontOptions = [
  { value: 'Outfit, system-ui, sans-serif', label: 'Outfit' },
  { value: 'Merriweather, Georgia, serif', label: 'Merriweather' },
  { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
];

export const colorOptions = [
  { value: '#3B82F6', label: 'Soft Blue' },
  { value: '#111827', label: 'Black' },
  { value: '#0F766E', label: 'Teal' },
  { value: '#DB2777', label: 'Pink' },
];

export const layoutOptions = [
  { value: 'split', label: 'Split Layout' },
  { value: 'stacked', label: 'Stacked Layout' },
  { value: 'compact', label: 'Compact Layout' },
];

export const stepConfig = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'photo', label: 'Photo Upload' },
  { id: 'custom', label: 'Custom Sections' },
  { id: 'design', label: 'Customize' },
];

export const sectionLabels = {
  education: 'Education',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  customSections: 'Custom Sections',
};

export const defaultSectionOrder = ['education', 'experience', 'skills', 'projects', 'customSections'];

export function createEducation() {
  return { degree: '', school: '', city: '', year: '', score: '' };
}

export function createExperience() {
  return { role: '', company: '', duration: '', details: '' };
}

export function createProject() {
  return { name: '', stack: '', link: '', details: '' };
}

export function createCustomSection() {
  return { title: '', content: '' };
}

export function createInitialFormData(documentType = 'resume') {
  const profileTitles = {
    resume: 'Frontend Developer',
    cv: 'Research Scholar',
    'job-biodata': 'Job Applicant Profile',
    'marriage-biodata': 'Marriage Biodata',
  };

  const summaryText = {
    resume: 'Friendly and organized creator who enjoys building clean digital experiences.',
    cv: 'Focused learner with strong academic interest and a record of responsible project work.',
    'job-biodata': 'Dependable and quick to learn, with practical skills and a positive attitude.',
    'marriage-biodata': 'Kind, respectful, family-oriented, and interested in a meaningful life partnership.',
  };

  return {
    personalInfo: {
      fullName: 'Aarav Sharma',
      role: profileTitles[documentType],
      email: 'aarav@example.com',
      phone: '+91 98765 43210',
      city: 'New Delhi',
      address: 'Dwarka, New Delhi',
      website: 'www.vappybuilder.com',
      linkedin: 'linkedin.com/in/aarav',
      summary: summaryText[documentType],
      dateOfBirth: '1998-08-12',
      gender: 'Male',
      nationality: 'Indian',
      maritalStatus: documentType === 'marriage-biodata' ? 'Single' : '',
      religion: documentType === 'marriage-biodata' ? 'Hindu' : '',
      languages: 'English, Hindi',
    },
    education: [
      { degree: 'B.Tech in Computer Science', school: 'Delhi Technical University', city: 'Delhi', year: '2020', score: '8.4 CGPA' },
    ],
    experience: [
      { role: 'UI Developer Intern', company: 'Blue Orbit Labs', duration: '2023 - Present', details: 'Built responsive pages and kept interfaces simple for first-time users.' },
    ],
    skills: ['React', 'Communication', 'Tailwind CSS', 'Teamwork'],
    projects: [
      { name: 'School Event Portal', stack: 'React, Node.js', link: 'https://example.com', details: 'Designed a child-friendly dashboard for registrations and schedules.' },
    ],
    customSections: [{ title: 'Achievements', content: 'Won first prize in a college design sprint and helped organize community workshops.' }],
    photo: '',
  };
}