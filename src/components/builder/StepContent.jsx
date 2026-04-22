import { colorOptions, fontOptions, layoutOptions, templateCatalog } from '../../data/config';
import { Field, InputField, SectionCard, SelectField, TextAreaField } from './fields';

function PersonalStep({ documentType, personalInfo, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full Name">
          <InputField value={personalInfo.fullName} onChange={(event) => onChange('fullName', event.target.value)} placeholder="Full name" />
        </Field>
        <Field label="Headline">
          <InputField value={personalInfo.role} onChange={(event) => onChange('role', event.target.value)} placeholder="Frontend Developer" />
        </Field>
        <Field label="Phone">
          <InputField value={personalInfo.phone} onChange={(event) => onChange('phone', event.target.value)} placeholder="Phone number" />
        </Field>
        <Field label="Email">
          <InputField value={personalInfo.email} onChange={(event) => onChange('email', event.target.value)} placeholder="Email address" />
        </Field>
        <Field label="City">
          <InputField value={personalInfo.city} onChange={(event) => onChange('city', event.target.value)} placeholder="Current city" />
        </Field>
        <Field label="Address">
          <InputField value={personalInfo.address} onChange={(event) => onChange('address', event.target.value)} placeholder="Full address" />
        </Field>
        <Field label="Website">
          <InputField value={personalInfo.website} onChange={(event) => onChange('website', event.target.value)} placeholder="Website or portfolio" />
        </Field>
        <Field label="LinkedIn">
          <InputField value={personalInfo.linkedin} onChange={(event) => onChange('linkedin', event.target.value)} placeholder="LinkedIn profile" />
        </Field>
        <Field label="Date of Birth">
          <InputField type="date" value={personalInfo.dateOfBirth} onChange={(event) => onChange('dateOfBirth', event.target.value)} />
        </Field>
        <Field label="Nationality">
          <InputField value={personalInfo.nationality} onChange={(event) => onChange('nationality', event.target.value)} placeholder="Nationality" />
        </Field>
        <Field label="Gender">
          <InputField value={personalInfo.gender} onChange={(event) => onChange('gender', event.target.value)} placeholder="Gender" />
        </Field>
        <Field label="Languages">
          <InputField value={personalInfo.languages} onChange={(event) => onChange('languages', event.target.value)} placeholder="English, Hindi" />
        </Field>
        {documentType === 'marriage-biodata' ? (
          <>
            <Field label="Religion">
              <InputField value={personalInfo.religion} onChange={(event) => onChange('religion', event.target.value)} placeholder="Religion" />
            </Field>
            <Field label="Marital Status">
              <InputField value={personalInfo.maritalStatus} onChange={(event) => onChange('maritalStatus', event.target.value)} placeholder="Single" />
            </Field>
          </>
        ) : null}
      </div>

      <Field label={documentType === 'marriage-biodata' ? 'About' : 'Summary'}>
        <TextAreaField value={personalInfo.summary} onChange={(event) => onChange('summary', event.target.value)} placeholder="Write a short intro" />
      </Field>
    </div>
  );
}

function RepeaterStep({ items, fields, title, description, onChange, onAdd, onRemove }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <SectionCard
          key={`${title}-${index}`}
          title={`${title} ${index + 1}`}
          description={description}
          actions={
            <button type="button" className="soft-button" onClick={() => onRemove(index)}>
              Remove
            </button>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <Field key={field.name} label={field.label} hint={field.hint}>
                {field.type === 'textarea' ? (
                  <TextAreaField value={item[field.name]} onChange={(event) => onChange(index, field.name, event.target.value)} placeholder={field.placeholder} />
                ) : (
                  <InputField value={item[field.name]} onChange={(event) => onChange(index, field.name, event.target.value)} placeholder={field.placeholder} />
                )}
              </Field>
            ))}
          </div>
        </SectionCard>
      ))}

      <button type="button" className="primary-button w-full" onClick={onAdd}>
        Add {title}
      </button>
    </div>
  );
}

function SkillsStep({ skills, onSkillChange, onAdd, onRemove, onBulkUpdate }) {
  return (
    <div className="space-y-4">
      <SectionCard title="Quick skill paste" description="Paste comma-separated or line-by-line skills if that is easier.">
        <Field label="Skills text">
          <TextAreaField value={skills.join(', ')} onChange={(event) => onBulkUpdate(event.target.value)} placeholder="React, Communication, MS Word" />
        </Field>
      </SectionCard>

      <SectionCard title="Editable skill list" description="Fine-tune the visible skills one by one.">
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={`skill-${index}`} className="flex gap-3">
              <InputField value={skill} onChange={(event) => onSkillChange(index, event.target.value)} placeholder="Skill name" />
              <button type="button" className="soft-button shrink-0" onClick={() => onRemove(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="button" className="primary-button mt-4 w-full" onClick={onAdd}>
          Add Skill
        </button>
      </SectionCard>
    </div>
  );
}

function PhotoStep({ photo, onPhotoChange, onClear }) {
  function handleFile(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onPhotoChange(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <SectionCard title="Profile photo" description="Upload a clear profile photo to show on templates that support pictures.">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-3xl border border-dashed border-slate-200 bg-slate-50">
          {photo ? <img src={photo} alt="Profile preview" className="h-full w-full object-cover" /> : <span className="px-4 text-center text-sm text-slate-400">Photo preview</span>}
        </div>
        <div className="flex-1 space-y-3">
          <input type="file" accept="image/*" className="field-shell" onChange={handleFile} />
          <div className="flex gap-3">
            <button type="button" className="soft-button" onClick={onClear}>
              Remove Photo
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function DesignStep({ activeTemplate, settings, onTemplateChange, onSettingsChange, onReset }) {
  return (
    <div className="space-y-4">
      <SectionCard title="Template style" description="Switch the look instantly without losing your content.">
        <div className="grid gap-3 md:grid-cols-2">
          {templateCatalog.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onTemplateChange(template.id)}
              className={`rounded-3xl border p-4 text-left transition ${
                activeTemplate === template.id ? 'border-brand bg-brand/5' : 'border-slate-200 bg-white hover:border-brand/30'
              }`}
            >
              <p className="text-sm font-semibold text-slate-900">{template.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{template.category}</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">{template.tone}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Colors, font, and layout" description="Simple options for quick personalization.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Accent Color">
            <SelectField value={settings.accentColor} onChange={(event) => onSettingsChange({ accentColor: event.target.value })} options={colorOptions} />
          </Field>
          <Field label="Custom Accent">
            <InputField type="color" value={settings.accentColor} onChange={(event) => onSettingsChange({ accentColor: event.target.value })} />
          </Field>
          <Field label="Font Family">
            <SelectField value={settings.fontFamily} onChange={(event) => onSettingsChange({ fontFamily: event.target.value })} options={fontOptions} />
          </Field>
          <Field label="Layout">
            <SelectField value={settings.layout} onChange={(event) => onSettingsChange({ layout: event.target.value })} options={layoutOptions} />
          </Field>
        </div>

        <button type="button" className="soft-button mt-4 w-full" onClick={onReset}>
          Reset Content to Starter Example
        </button>
      </SectionCard>
    </div>
  );
}

export function StepContent({
  stepId,
  documentType,
  formData,
  settings,
  activeTemplate,
  updatePersonalInfo,
  updateCollectionItem,
  addCollectionItem,
  removeCollectionItem,
  setSkillsFromText,
  updateSkill,
  addSkill,
  removeSkill,
  setPhoto,
  setActiveTemplate,
  updateSettings,
  resetBuilder,
}) {
  switch (stepId) {
    case 'personal':
      return <PersonalStep documentType={documentType} personalInfo={formData.personalInfo} onChange={updatePersonalInfo} />;
    case 'education':
      return (
        <RepeaterStep
          title="Education"
          description="Add schools, colleges, and certificates."
          items={formData.education}
          onChange={(index, field, value) => updateCollectionItem('education', index, field, value)}
          onAdd={() => addCollectionItem('education')}
          onRemove={(index) => removeCollectionItem('education', index)}
          fields={[
            { name: 'degree', label: 'Degree / Course', placeholder: 'B.Tech in Computer Science' },
            { name: 'school', label: 'School / College', placeholder: 'University name' },
            { name: 'city', label: 'City', placeholder: 'City' },
            { name: 'year', label: 'Year', placeholder: '2024' },
            { name: 'score', label: 'Score', placeholder: '8.4 CGPA' },
          ]}
        />
      );
    case 'experience':
      return (
        <RepeaterStep
          title="Experience"
          description="Share jobs, internships, volunteering, or business work."
          items={formData.experience}
          onChange={(index, field, value) => updateCollectionItem('experience', index, field, value)}
          onAdd={() => addCollectionItem('experience')}
          onRemove={(index) => removeCollectionItem('experience', index)}
          fields={[
            { name: 'role', label: 'Role', placeholder: 'UI Developer Intern' },
            { name: 'company', label: 'Company / Organization', placeholder: 'Company name' },
            { name: 'duration', label: 'Duration', placeholder: '2023 - Present' },
            { name: 'details', label: 'Details', placeholder: 'Explain your work simply', type: 'textarea' },
          ]}
        />
      );
    case 'skills':
      return (
        <SkillsStep
          skills={formData.skills}
          onBulkUpdate={setSkillsFromText}
          onSkillChange={updateSkill}
          onAdd={addSkill}
          onRemove={removeSkill}
        />
      );
    case 'projects':
      return (
        <RepeaterStep
          title="Project"
          description="Add work samples, school projects, or portfolio items."
          items={formData.projects}
          onChange={(index, field, value) => updateCollectionItem('projects', index, field, value)}
          onAdd={() => addCollectionItem('projects')}
          onRemove={(index) => removeCollectionItem('projects', index)}
          fields={[
            { name: 'name', label: 'Project Name', placeholder: 'Project title' },
            { name: 'stack', label: 'Stack / Tools', placeholder: 'React, Node.js' },
            { name: 'link', label: 'Link', placeholder: 'https://project-link.com' },
            { name: 'details', label: 'Details', placeholder: 'What did you build?', type: 'textarea' },
          ]}
        />
      );
    case 'photo':
      return <PhotoStep photo={formData.photo} onPhotoChange={setPhoto} onClear={() => setPhoto('')} />;
    case 'custom':
      return (
        <RepeaterStep
          title="Custom Section"
          description="Useful for achievements, hobbies, family details, or certifications."
          items={formData.customSections}
          onChange={(index, field, value) => updateCollectionItem('customSections', index, field, value)}
          onAdd={() => addCollectionItem('customSections')}
          onRemove={(index) => removeCollectionItem('customSections', index)}
          fields={[
            { name: 'title', label: 'Section Title', placeholder: 'Achievements' },
            { name: 'content', label: 'Content', placeholder: 'Write the section content', type: 'textarea' },
          ]}
        />
      );
    case 'design':
      return (
        <DesignStep
          activeTemplate={activeTemplate}
          settings={settings}
          onTemplateChange={setActiveTemplate}
          onSettingsChange={updateSettings}
          onReset={resetBuilder}
        />
      );
    default:
      return null;
  }
}