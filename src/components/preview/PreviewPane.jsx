import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '../../store/useBuilderStore';
import { getTheme } from '../../utils/preview';
import { TemplateRenderer } from './TemplateRenderer';

export function PreviewPane({ previewRef, onDownloadPdf, onDownloadImage, onPrint, busyAction, statusMessage }) {
  const { documentType, activeTemplate, settings, formData, sectionOrder } = useBuilderStore(
    useShallow((state) => ({
      documentType: state.documentType,
      activeTemplate: state.activeTemplate,
      settings: state.settings,
      formData: state.formData,
      sectionOrder: state.sectionOrder,
    }))
  );

  const theme = getTheme(settings, activeTemplate);

  return (
    <section className="glass-panel h-full p-5 xl:sticky xl:top-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Live Preview</h2>
          <p className="mt-1 text-sm text-slate-500">Your document updates instantly as you type, and now has a larger workspace on screen.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="soft-button" onClick={onDownloadImage} disabled={busyAction !== ''}>
            {busyAction === 'image' ? 'Creating PNG...' : 'Download PNG'}
          </button>
          <button type="button" className="soft-button" onClick={onPrint} disabled={busyAction !== ''}>
            Print
          </button>
          <button type="button" className="primary-button" onClick={onDownloadPdf} disabled={busyAction !== ''}>
            {busyAction === 'pdf' ? 'Creating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {statusMessage ? <div className="mb-4 rounded-2xl bg-brand/10 px-4 py-3 text-sm text-brand">{statusMessage}</div> : null}

      <div className="min-h-[620px] max-h-[calc(100vh-140px)] overflow-auto rounded-[30px] bg-slate-100 p-2 sm:p-4 xl:min-h-[760px] xl:p-5">
        <div ref={previewRef}>
          <TemplateRenderer
            activeTemplate={activeTemplate}
            documentType={documentType}
            formData={formData}
            sectionOrder={sectionOrder}
            settings={settings}
            theme={theme}
          />
        </div>
      </div>
    </section>
  );
}