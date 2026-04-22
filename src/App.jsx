import { useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BuilderPanel } from './components/builder/BuilderPanel';
import { AdPanel } from './components/layout/AdPanel';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { PreviewPane } from './components/preview/PreviewPane';
import { downloadImage, downloadPdf, printPreview } from './services/exportService';
import { useBuilderStore } from './store/useBuilderStore';

function createFileName(fullName, documentType) {
  const safeName = (fullName || 'vappybuilder-document').trim().toLowerCase().replace(/\s+/g, '-');
  return `${safeName}-${documentType}`;
}

export default function App() {
  const previewRef = useRef(null);
  const builderSectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [busyAction, setBusyAction] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const { fullName, documentType } = useBuilderStore(
    useShallow((state) => ({
      fullName: state.formData.personalInfo.fullName,
      documentType: state.documentType,
    }))
  );

  async function runAction(actionName, action) {
    try {
      setBusyAction(actionName);
      setStatusMessage('');
      await action();
      setStatusMessage(actionName === 'print' ? 'Print dialog opened.' : `Your ${actionName.toUpperCase()} file is ready.`);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setBusyAction('');
    }
  }

  function scrollToBuilder() {
    builderSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const exportName = createFileName(fullName, documentType);

  return (
    <div className="min-h-screen">
      <Header onScrollToBuilder={scrollToBuilder} />

      <button
        type="button"
        onClick={scrollToBuilder}
        aria-label="Scroll to resume builder"
        className="fixed bottom-6 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white shadow-[0_18px_40px_rgba(59,130,246,0.35)] transition hover:bg-blue-500 lg:bottom-8 lg:right-8"
      >
        ↓
      </button>

      <main className="mx-auto max-w-[1560px] px-4 py-6 sm:px-6 lg:px-8">
        <section ref={builderSectionRef} className="grid scroll-mt-24 gap-6 xl:grid-cols-[minmax(360px,0.82fr)_minmax(0,1.18fr)] xl:items-start">
          <BuilderPanel activeStep={activeStep} setActiveStep={setActiveStep} />
          <PreviewPane
            previewRef={previewRef}
            busyAction={busyAction}
            statusMessage={statusMessage}
            onDownloadPdf={() => runAction('pdf', () => downloadPdf(previewRef.current, exportName))}
            onDownloadImage={() => runAction('image', () => downloadImage(previewRef.current, exportName))}
            onPrint={() => runAction('print', () => Promise.resolve(printPreview(previewRef.current, exportName)))}
          />
        </section>

        <section className="mt-6">
          <AdPanel />
        </section>
      </main>

      <Footer />
    </div>
  );
}