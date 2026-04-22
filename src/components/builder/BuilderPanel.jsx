import { stepConfig, templateCatalog, builderTypes } from '../../data/config';
import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '../../store/useBuilderStore';
import { SectionOrderEditor } from './SectionOrderEditor';
import { StepContent } from './StepContent';

function formatSavedAt(value) {
  if (!value) {
    return 'Not saved yet';
  }

  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function BuilderPanel({ activeStep, setActiveStep }) {
  const {
    documentType,
    activeTemplate,
    settings,
    formData,
    sectionOrder,
    lastSavedAt,
    setDocumentType,
    setActiveTemplate,
    updateSettings,
    updatePersonalInfo,
    updateCollectionItem,
    addCollectionItem,
    removeCollectionItem,
    setSkillsFromText,
    updateSkill,
    addSkill,
    removeSkill,
    setPhoto,
    setSectionOrder,
    resetBuilder,
  } = useBuilderStore(
    useShallow((state) => ({
      documentType: state.documentType,
      activeTemplate: state.activeTemplate,
      settings: state.settings,
      formData: state.formData,
      sectionOrder: state.sectionOrder,
      lastSavedAt: state.lastSavedAt,
      setDocumentType: state.setDocumentType,
      setActiveTemplate: state.setActiveTemplate,
      updateSettings: state.updateSettings,
      updatePersonalInfo: state.updatePersonalInfo,
      updateCollectionItem: state.updateCollectionItem,
      addCollectionItem: state.addCollectionItem,
      removeCollectionItem: state.removeCollectionItem,
      setSkillsFromText: state.setSkillsFromText,
      updateSkill: state.updateSkill,
      addSkill: state.addSkill,
      removeSkill: state.removeSkill,
      setPhoto: state.setPhoto,
      setSectionOrder: state.setSectionOrder,
      resetBuilder: state.resetBuilder,
    }))
  );

  return (
    <div className="space-y-5">
      <section className="glass-panel p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Builder setup</h2>
            <p className="mt-1 text-sm text-slate-500">Pick a document type and template before filling the steps.</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Auto-saved at {formatSavedAt(lastSavedAt)}</span>
        </div>

        <div className="grid gap-3 xl:grid-cols-2">
          {builderTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setDocumentType(type.id)}
              className={`rounded-3xl border p-4 text-left transition ${
                documentType === type.id ? 'border-brand bg-brand/5' : 'border-slate-200 bg-white hover:border-brand/30'
              }`}
            >
              <p className="text-sm font-semibold text-slate-900">{type.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{type.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {templateCatalog.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setActiveTemplate(template.id)}
              className={`rounded-3xl border p-4 text-left transition ${
                activeTemplate === template.id ? 'border-brand bg-brand/5' : 'border-slate-200 bg-white hover:border-brand/30'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">{template.name}</p>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{template.category}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{template.tone}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="glass-panel p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {stepConfig.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                activeStep === index ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {index + 1}. {step.label}
            </button>
          ))}
        </div>

        <StepContent
          stepId={stepConfig[activeStep].id}
          documentType={documentType}
          formData={formData}
          settings={settings}
          activeTemplate={activeTemplate}
          updatePersonalInfo={updatePersonalInfo}
          updateCollectionItem={updateCollectionItem}
          addCollectionItem={addCollectionItem}
          removeCollectionItem={removeCollectionItem}
          setSkillsFromText={setSkillsFromText}
          updateSkill={updateSkill}
          addSkill={addSkill}
          removeSkill={removeSkill}
          setPhoto={setPhoto}
          setActiveTemplate={setActiveTemplate}
          updateSettings={updateSettings}
          resetBuilder={resetBuilder}
        />

        <div className="mt-5 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-4">
          <button type="button" className="soft-button" onClick={() => setActiveStep((current) => Math.max(current - 1, 0))}>
            Previous Step
          </button>
          <button type="button" className="primary-button" onClick={() => setActiveStep((current) => Math.min(current + 1, stepConfig.length - 1))}>
            Next Step
          </button>
        </div>
      </section>

      <SectionOrderEditor order={sectionOrder} onChange={setSectionOrder} />
    </div>
  );
}